import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Container, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/material/styles';

const MetricCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: 20,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#FFFFFF',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.12)',
  },
}));

const AnimatedSection = styled(Box)(({ theme }) => ({
  opacity: 1,
  transform: 'translateY(0)',
  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.animate': {
    transform: 'translateY(0)',
  },
}));

const BusinessMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Temporarily disabled intersection observer to debug
    /*
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
    */
  }, []);

  const metrics = [
    {
      icon: <Groups2OutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      value: '1,500+',
      label: 'Validated Questions',
      growth: 'Across 6 domains'
    },
    {
      icon: <WorkIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      value: '300+',
      label: 'Engineers Trained',
      growth: 'Via Advanced People'
    },
    {
      icon: <TrendingUpOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      value: '10+',
      label: 'SME Network',
      growth: '15+ years experience'
    },
    {
      icon: <EmojiObjectsOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      value: '6',
      label: 'Engineering Domains',
      growth: 'I&C, Electrical, Process, Piping, Civil, PM'
    }
  ];

  const chartData = [
    { month: 'Q1 2025', users: 0, assessments: 0, pilots: 0 },
    { month: 'Q2 2025', users: 100, assessments: 50, pilots: 2 },
    { month: 'Q3 2025', users: 250, assessments: 150, pilots: 5 },
    { month: 'Q4 2025', users: 500, assessments: 300, pilots: 10 },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: 'grey.50' }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={10}>
          {/* Header */}
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 800 }}>
                MVP Traction & Validation
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
                Building foundation with validated content and strategic partnerships for pre-seed validation
              </Typography>
            </Box>
          </AnimatedSection>

          {/* Key Metrics */}
          <AnimatedSection>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 4,
              }}
            >
              {metrics.map((metric, index) => (
                <MetricCard key={index}>
                  <CardContent>
                    <Box sx={{ mb: 3 }}>{metric.icon}</Box>
                    <Typography variant="h2" component="div" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
                      {metric.label}
                    </Typography>
                    <Typography variant="body2" color="success.main" fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
                      {metric.growth}
                    </Typography>
                  </CardContent>
                </MetricCard>
              ))}
            </Box>
          </AnimatedSection>

          {/* Growth Chart */}
          <AnimatedSection>
            <Card sx={{ borderRadius: 24, border: '1px solid rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                  Pre-Seed Validation Plan
                </Typography>
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
                  <BarChart
                    dataset={chartData}
                    series={[
                      { dataKey: 'users', label: 'Target Users', color: '#000000' },
                      { dataKey: 'assessments', label: 'Assessments', color: '#666666' },
                      { dataKey: 'pilots', label: 'Company Pilots', color: '#00C851' },
                    ]}
                    xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
                    width={800}
                    height={400}
                  />
                </Box>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Stack>
      </Container>
    </Box>
  );
};

export default BusinessMetrics;