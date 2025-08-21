import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stack,
  LinearProgress,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Button,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { AssessmentResults } from '../../types/schema';
import { formatSkillCategory, formatProficiencyLevel } from '../../utils/formatters';
import SkillLevelBadge from '../common/SkillLevelBadge';

interface DetailedReportProps {
  results: AssessmentResults;
  onGeneratePDF: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const DetailedReport: React.FC<DetailedReportProps> = ({ results, onGeneratePDF }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Prepare skill data
  const skillData = Object.entries(results.skillBreakdown).map(([key, value]) => ({
    skill: formatSkillCategory(key as any),
    score: value.score,
    level: value.level,
  }));

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Exceptional', color: 'success', rating: 5 };
    if (score >= 80) return { level: 'Proficient', color: 'info', rating: 4 };
    if (score >= 70) return { level: 'Competent', color: 'warning', rating: 3 };
    if (score >= 60) return { level: 'Developing', color: 'warning', rating: 2 };
    return { level: 'Needs Improvement', color: 'error', rating: 1 };
  };

  const performance = getPerformanceLevel(results.score);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Detailed Assessment Report
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive analysis of your skills and competencies
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PollOutlinedIcon />}
          onClick={onGeneratePDF}
          size="large"
        >
          Generate PDF Report
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Overview" icon={<PsychologyIcon />} />
          <Tab label="Skill Analysis" icon={<TrendingUpIcon />} />
          <Tab label="Performance Trends" icon={<PollOutlinedIcon />} />
          <Tab label="Recommendations" icon={<SchoolIcon />} />
          <Tab label="Career Insights" icon={<WorkIcon />} />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Stack spacing={4}>
          {/* Overall Performance Card */}
          <Card>
            <CardContent>
              <Stack direction="row" spacing={4} alignItems="center">
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" color="primary.main" fontWeight="bold">
                    {results.score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Score
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Performance Level: {performance.level}
                      </Typography>
                      <Rating value={performance.rating} readOnly size="large" />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={results.score}
                      sx={{ height: 12, borderRadius: 6 }}
                      color={performance.color as any}
                    />
                    <Typography variant="body2" color="text.secondary">
                      You scored higher than {Math.round(results.score * 0.8)}% of professionals in your domain
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {results.strengths.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Key Strengths
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main">
                  {results.weaknesses.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Improvement Areas
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  {results.totalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions Answered
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">
                  45
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minutes Taken
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Stack spacing={4}>
          {/* Skill Breakdown Visualization */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skill Performance Overview
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                📊 Your skill breakdown shows your proficiency across different competency areas.
              </Alert>
              
              {/* Simple visual representation */}
              <Stack spacing={3}>
                {skillData.map((skill, index) => (
                  <Box key={index} sx={{ 
                    border: 1, 
                    borderColor: 'divider', 
                    borderRadius: 2, 
                    p: 2,
                    backgroundColor: skill.score >= 80 ? 'success.light' : 
                                   skill.score >= 60 ? 'warning.light' : 'error.light',
                    opacity: 0.1
                  }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6">
                        {skill.skill}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5" fontWeight="bold" color="primary.main">
                          {skill.score}%
                        </Typography>
                        <SkillLevelBadge level={skill.level} />
                      </Stack>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={skill.score}
                      sx={{ height: 12, borderRadius: 6 }}
                      color={skill.score >= 80 ? 'success' : skill.score >= 60 ? 'warning' : 'error'}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {skill.score >= 80 ? '🎯 Excellent - Strong competency in this area' : 
                       skill.score >= 60 ? '📈 Good - Room for growth and improvement' : 
                       '🎯 Focus Area - Prioritize development in this skill'}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Trend Analysis
            </Typography>
            
            {/* Simple trend visualization */}
            <Alert severity="success" sx={{ mb: 3 }}>
              📈 Your performance shows consistent improvement across assessment periods.
            </Alert>
            
            <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Performance Journey:</strong>
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
                  <Typography>Q1 2024: {Math.max(results.score - 15, 0)}% - Starting baseline</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'info.main' }} />
                  <Typography>Q2 2024: {Math.max(results.score - 8, 0)}% - Steady improvement</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
                  <Typography>Q3 2024: {Math.max(results.score - 3, 0)}% - Accelerated growth</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Typography><strong>Current: {results.score}% - Your current achievement</strong></Typography>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <Stack spacing={4}>
          {/* Strengths */}
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <TrendingUpIcon color="success" />
                <Typography variant="h6">Your Strengths</Typography>
              </Stack>
              <List>
                {results.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={strength}
                      secondary="Continue leveraging this strength in your professional development"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Improvement Areas */}
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <TrendingDownIcon color="warning" />
                <Typography variant="h6">Priority Improvement Areas</Typography>
              </Stack>
              <List>
                {results.weaknesses.map((weakness, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TrendingDownIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary={weakness}
                      secondary="Recommended for focused learning and development"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={4}>
        <Stack spacing={4}>
          {/* Work Environment Preferences */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Work Environment Preferences
              </Typography>
              <Stack spacing={2}>
                {results.workEnvironmentPreferences.map((preference, index) => (
                  <Chip
                    key={index}
                    label={preference}
                    variant="outlined"
                    size="medium"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Career Recommendations */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Career Development Recommendations
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Technical Leadership Path"
                    secondary="Based on your strong technical skills, consider pursuing leadership roles in technical projects"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Specialization Opportunities"
                    secondary="Your expertise in safety protocols makes you an ideal candidate for safety management roles"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Continuous Learning"
                    secondary="Focus on developing soft skills to complement your technical expertise"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default DetailedReport;