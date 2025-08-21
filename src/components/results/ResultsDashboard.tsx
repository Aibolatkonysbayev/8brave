import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SkillBreakdownChart from './SkillBreakdownChart';
import SkillLevelBadge from '../common/SkillLevelBadge';
import { AssessmentResults } from '../../types/schema';
import { formatAssessmentScore, formatDomainName } from '../../utils/formatters';

interface ResultsDashboardProps {
  results: AssessmentResults;
  onDownloadPDF: () => void;
  onViewLearningPath: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  results,
  onDownloadPDF,
  onViewLearningPath,
}) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Results
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {formatAssessmentScore(results.score)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Assessment completed for {formatDomainName(results.domain)}
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Overall Score Card */}
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" gutterBottom>
                  Overall Performance
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadForOfflineOutlinedIcon />}
                  onClick={onDownloadPDF}
                >
                  Download PDF Report
                </Button>
                <Button variant="contained" onClick={onViewLearningPath}>
                  View Learning Path
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
          <SkillBreakdownChart results={results} />
          
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Skill Levels
              </Typography>
              <Stack spacing={2}>
                {Object.entries(results.skillBreakdown).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        {value.score}%
                      </Typography>
                      <SkillLevelBadge level={value.level} />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Detailed Analysis */}
        <Stack spacing={2}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUpIcon color="success" />
                <Typography variant="h6">Strengths</Typography>
                <Chip label={results.strengths.length} size="small" color="success" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {results.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingDownIcon color="warning" />
                <Typography variant="h6">Areas for Improvement</Typography>
                <Chip label={results.weaknesses.length} size="small" color="warning" />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {results.weaknesses.map((weakness, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <TrendingDownIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={weakness} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <WorkOutlineIcon color="info" />
                <Typography variant="h6">Work Environment Preferences</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {results.workEnvironmentPreferences.map((preference, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WorkOutlineIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary={preference} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ResultsDashboard;