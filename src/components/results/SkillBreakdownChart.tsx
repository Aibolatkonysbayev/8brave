import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { AssessmentResults } from '../../types/schema';
import { formatSkillCategory } from '../../utils/formatters';

interface SkillBreakdownChartProps {
  results: AssessmentResults;
}

const SkillBreakdownChart: React.FC<SkillBreakdownChartProps> = ({ results }) => {
  const chartData = Object.entries(results.skillBreakdown).map(([key, value], index) => ({
    id: index,
    value: value.score,
    label: formatSkillCategory(key as any),
  }));

  const colors = ['#1B365D', '#E65100', '#2E7D32', '#F57C00', '#0288D1'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          Skill Breakdown
        </Typography>
        <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
          <PieChart
            series={[
              {
                data: chartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            colors={colors}
            width={400}
            height={400}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillBreakdownChart;