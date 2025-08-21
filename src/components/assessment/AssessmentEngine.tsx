import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert, Button, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentQuestion from './AssessmentQuestion';
import { Domain, AssessmentResults } from '../../types/schema';
import { mockQuery } from '../../data/skillsAssessmentMockData';
import { ProficiencyLevel } from '../../types/enums';

interface AssessmentEngineProps {
  selectedDomain: Domain;
  onAssessmentComplete: (results: AssessmentResults) => void;
  onReturnHome?: () => void;
}

const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  selectedDomain,
  onAssessmentComplete,
  onReturnHome,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes for 50 questions

  // Generate questions based on available content (building toward 1,500+ with SME validation)
  const questions = Array.from({ length: 50 }, (_, index) => ({
    ...mockQuery.assessmentQuestions[index % mockQuery.assessmentQuestions.length],
    id: `q${index + 1}`,
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAssessment = () => {
    // Calculate results
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);

    // Clamp scores to 0-100 range
    const clamp = (value: number) => Math.max(0, Math.min(100, value));
    
    const results: AssessmentResults = {
      userId: 'user123',
      assessmentId: 'assessment456',
      domain: selectedDomain.name,
      totalQuestions: questions.length,
      correctAnswers,
      score,
      completedAt: new Date().toISOString(),
      skillBreakdown: {
        hardSkills: { score: clamp(score + 4), level: ProficiencyLevel.ADVANCED },
        softSkills: { score: clamp(score - 4), level: ProficiencyLevel.INTERMEDIATE },
        technicalCompetency: { score: clamp(score + 7), level: ProficiencyLevel.ADVANCED },
        leadership: { score: clamp(score - 10), level: ProficiencyLevel.INTERMEDIATE },
        safety: { score: clamp(score + 14), level: ProficiencyLevel.EXPERT },
      },
      strengths: ['Safety Protocols', 'Technical Problem Solving', 'Process Optimization'],
      weaknesses: ['Team Leadership', 'Project Planning', 'Communication Skills'],
      workEnvironmentPreferences: [
        'Collaborative team environment',
        'Hands-on technical work',
        'Continuous learning opportunities',
      ],
    };

    onAssessmentComplete(results);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      {/* Header with Return Home Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box />
        <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
          {selectedDomain.name} Assessment
        </Typography>
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

      {/* Timer Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        Time Remaining: {formatTime(timeRemaining)} | Question {currentQuestionIndex + 1} of {questions.length}
      </Alert>

      <AssessmentQuestion
        question={currentQuestion}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={true}
        canGoPrevious={currentQuestionIndex > 0}
      />
    </Box>
  );
};

export default AssessmentEngine;