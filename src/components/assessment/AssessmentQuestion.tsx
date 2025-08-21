import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  Stack,
} from '@mui/material';
import { AssessmentQuestion as Question } from '../../types/schema';

interface AssessmentQuestionProps {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = parseInt(event.target.value);
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary">
                Question {currentQuestionNumber} of {totalQuestions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}% Complete
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>

          <Typography variant="h5" component="h2" sx={{ mb: 4, lineHeight: 1.4 }}>
            {question.question}
          </Typography>

          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                sx={{
                  mb: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: selectedAnswer === index ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'grey.50',
                  },
                }}
              />
            ))}
          </RadioGroup>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={onPrevious}
              disabled={!canGoPrevious}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
              disabled={!canGoNext || selectedAnswer === null}
            >
              {currentQuestionNumber === totalQuestions ? 'Submit Assessment' : 'Next'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssessmentQuestion;