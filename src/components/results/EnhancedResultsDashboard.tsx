import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { AssessmentResults } from '../../types/schema';
import { formatAssessmentScore, formatDomainName } from '../../utils/formatters';
import SkillBreakdownChart from './SkillBreakdownChart';
import DetailedReport from './DetailedReport';

interface EnhancedResultsDashboardProps {
  results: AssessmentResults;
  onDownloadPDF: () => void;
  onViewLearningPath: () => void;
  onReturnHome?: () => void;
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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const EnhancedResultsDashboard: React.FC<EnhancedResultsDashboardProps> = ({
  results,
  onDownloadPDF,
  onViewLearningPath,
  onReturnHome,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showPDFDialog, setShowPDFDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleGeneratePDF = () => {
    setShowPDFDialog(true);
    // Simulate PDF generation
    setTimeout(() => {
      setShowPDFDialog(false);
      onDownloadPDF();
    }, 2000);
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: 'Exceptional Performance!', color: 'success' };
    if (score >= 80) return { message: 'Strong Performance', color: 'info' };
    if (score >= 70) return { message: 'Good Performance', color: 'warning' };
    if (score >= 60) return { message: 'Satisfactory Performance', color: 'warning' };
    return { message: 'Needs Improvement', color: 'error' };
  };

  const performance = getPerformanceMessage(results.score);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PollOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              8 Brave Assessment Results
            </Typography>
          </Box>
          {onReturnHome && (
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={onReturnHome}
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
            >
              Home
            </Button>
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Powered by Armeta AI • Founded by Aibolat Konysbayev
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {formatAssessmentScore(results.score)}
        </Typography>
        <Alert severity={performance.color as any} sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
          {performance.message} - Assessment completed for {formatDomainName(results.domain)}
        </Alert>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadForOfflineOutlinedIcon />}
          onClick={handleGeneratePDF}
          size="large"
        >
          Download Detailed Report
        </Button>
        <Button
          variant="contained"
          startIcon={<SchoolOutlinedIcon />}
          onClick={onViewLearningPath}
          size="large"
        >
          Start Learning Journey
        </Button>
      </Stack>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Overview" />
          <Tab label="Detailed Analysis" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Stack spacing={4}>
          {/* Overall Score Card */}
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Overall Performance Summary
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Domain: {formatDomainName(results.domain)} • Completed: {new Date(results.completedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="info.main" sx={{ mt: 1, fontWeight: 500 }}>
                    📊 Your score vs industry average (based on 300+ Advanced People network)
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" color="primary.main" fontWeight="bold">
                    {results.score}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall Score
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Skill Breakdown Chart */}
          <SkillBreakdownChart results={results} />

          {/* Quick Insights */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="success.main" gutterBottom>
                  🎯 Top Strengths ({results.strengths.length})
                </Typography>
                <Stack spacing={1}>
                  {results.strengths.slice(0, 3).map((strength, index) => (
                    <Typography key={index} variant="body2">
                      • {strength}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  📈 Growth Areas ({results.weaknesses.length})
                </Typography>
                <Stack spacing={1}>
                  {results.weaknesses.slice(0, 3).map((weakness, index) => (
                    <Typography key={index} variant="body2">
                      • {weakness}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Next Steps */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Recommended Next Steps
              </Typography>
              <Stack spacing={2}>
                <Typography variant="body1">
                  1. <strong>Download your detailed report</strong> for comprehensive analysis and career insights
                </Typography>
                <Typography variant="body1">
                  2. <strong>Start your personalized learning journey</strong> with recommended simulators and video modules
                </Typography>
                <Typography variant="body1">
                  3. <strong>Focus on improvement areas:</strong> {results.weaknesses.slice(0, 2).join(' and ')}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <DetailedReport results={results} onGeneratePDF={handleGeneratePDF} />
      </TabPanel>

      {/* PDF Generation Dialog */}
      <Dialog open={showPDFDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Generating Your Detailed Report</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <PollOutlinedIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              Creating your comprehensive assessment report...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This includes detailed skill analysis, career recommendations, and personalized learning pathways.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPDFDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnhancedResultsDashboard;