import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme/theme';
import Header from './components/layout/Header';
import MVPLanding from './components/mvp/MVPLanding';
import DomainSelection from './components/domain/DomainSelection';
import AssessmentEngine from './components/assessment/AssessmentEngine';
import EnhancedResultsDashboard from './components/results/EnhancedResultsDashboard';
import EnhancedLearningPathway from './components/learning/EnhancedLearningPathway';
import { Domain, AssessmentResults } from './types/schema';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

enum AppState {
  MVP_LANDING = 'mvp_landing',
  DOMAIN_SELECTION = 'domain_selection',
  ASSESSMENT = 'assessment',
  RESULTS = 'results',
  LEARNING = 'learning',
  DEMO_MODE = 'demo_mode',
}

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.MVP_LANDING);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleGetStarted = () => {
    setCurrentState(AppState.DOMAIN_SELECTION);
  };

  const handleDomainSelected = (domain: Domain) => {
    setSelectedDomain(domain);
    setCurrentState(AppState.ASSESSMENT);
  };

  const handleAssessmentComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    setCurrentState(AppState.RESULTS);
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF report...');
    // Implementation for PDF download
  };

  const handleViewLearningPath = () => {
    setCurrentState(AppState.LEARNING);
  };

  const handleReset = () => {
    setCurrentState(AppState.MVP_LANDING);
    setSelectedDomain(null);
    setAssessmentResults(null);
    setIsDemoMode(false);
  };

  const handleDemoMode = () => {
    setIsDemoMode(true);
    // Create mock assessment results for demo
    const mockResults: AssessmentResults = {
      userId: 'demo-user',
      assessmentId: 'demo-assessment',
      domain: 'I&C' as any,
      totalQuestions: 50,
      correctAnswers: 39,
      score: 78,
      completedAt: new Date().toISOString(),
      skillBreakdown: {
        hardSkills: { score: 82, level: 'advanced' as any },
        softSkills: { score: 74, level: 'intermediate' as any },
        technicalCompetency: { score: 85, level: 'advanced' as any },
        leadership: { score: 68, level: 'intermediate' as any },
        safety: { score: 92, level: 'expert' as any }
      },
      strengths: ['Safety Protocols', 'Technical Problem Solving', 'Process Optimization'],
      weaknesses: ['Team Leadership', 'Project Planning', 'Communication Skills'],
      workEnvironmentPreferences: ['Collaborative team environment', 'Hands-on technical work', 'Continuous learning opportunities']
    };
    setAssessmentResults(mockResults);
    setCurrentState(AppState.RESULTS);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case AppState.MVP_LANDING:
        return <MVPLanding onGetStarted={handleGetStarted} />;
      case AppState.DOMAIN_SELECTION:
        return <DomainSelection onDomainSelected={handleDomainSelected} onReturnHome={handleReset} />;
      case AppState.ASSESSMENT:
        return selectedDomain ? (
          <AssessmentEngine
            selectedDomain={selectedDomain}
            onAssessmentComplete={handleAssessmentComplete}
            onReturnHome={handleReset}
          />
        ) : null;
      case AppState.RESULTS:
        return assessmentResults ? (
          <EnhancedResultsDashboard
            results={assessmentResults}
            onDownloadPDF={handleDownloadPDF}
            onViewLearningPath={handleViewLearningPath}
            onReturnHome={handleReset}
          />
        ) : null;
      case AppState.LEARNING:
        return assessmentResults ? (
          <EnhancedLearningPathway results={assessmentResults} onReturnHome={handleReset} />
        ) : null;
      default:
        return <MVPLanding onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: '60px' }}>
          <Header onReset={currentState !== AppState.MVP_LANDING ? handleReset : undefined} />
          {renderCurrentState()}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;