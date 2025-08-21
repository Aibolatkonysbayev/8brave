import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Container, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: 20,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#FFFFFF',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.12)',
  },
}));

const ProblemCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF4444 0%, #FF6666 100%)',
  color: '#FFFFFF',
  borderRadius: 20,
  border: 'none',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 15px 40px rgba(255,68,68,0.3)',
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

const ValueProposition: React.FC = () => {
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

  const problems = [
    {
      title: 'Skills Gap Crisis',
      description: 'Oil & gas industry faces massive skill gaps as senior experts retire',
      impact: '$100M+ annual losses due to skill gaps & errors'
    },
    {
      title: 'No Objective Assessment',
      description: 'Hiring & promotion rely on interviews & years of experience',
      impact: 'Unsafe operations, delays, cost overruns'
    },
    {
      title: 'Fragmented Training',
      description: 'Training is fragmented, outdated, and disconnected from real project challenges',
      impact: 'No "HackerRank equivalent" exists in engineering'
    }
  ];

  const solutions = [
    {
      icon: <PrecisionManufacturingOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      title: 'AI-Powered Assessment',
      description: 'Comprehensive assessments tailored to each oil & gas domain',
      benefits: ['Domain-specific evaluation', 'Real-time scoring', 'Bias-free assessment']
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      title: 'Personalized Learning',
      description: 'Custom learning pathways with simulators and virtual labs',
      benefits: ['Targeted skill development', 'Interactive simulations', 'Progress tracking']
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      title: 'Rapid Deployment',
      description: 'Cloud-based platform ready for immediate enterprise deployment',
      benefits: ['Quick implementation', 'Scalable architecture', 'Enterprise security']
    },
    {
      icon: <TrendingUpOutlinedIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      title: 'ROI Optimization',
      description: 'Measurable improvement in workforce competency and productivity',
      benefits: ['Cost reduction', 'Improved safety', 'Higher efficiency']
    }
  ];

  return (
    <Box sx={{ py: 12, bgcolor: 'background.default' }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={12}>
          {/* Problem Statement */}
          <AnimatedSection>
            <Box>
              <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 800 }}>
                The $100M+ Problem
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 4,
                }}
              >
                {problems.map((problem, index) => (
                  <ProblemCard key={index}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {problem.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                        {problem.description}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          borderRadius: '16px',
                          display: 'inline-block',
                          px: 2,
                          py: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {problem.impact}
                      </Box>
                    </CardContent>
                  </ProblemCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Solution */}
          <AnimatedSection>
            <Box>
              <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
                Our Solution: 8 Brave Platform
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 6,
                }}
              >
                {solutions.map((solution, index) => (
                  <ValueCard key={index}>
                    <CardContent sx={{ p: 5, textAlign: 'center', height: '100%' }}>
                      <Box sx={{ mb: 4 }}>
                        {solution.icon}
                      </Box>
                      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ textAlign: 'center', mb: 3 }}>
                        {solution.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center', lineHeight: 1.6 }}>
                        {solution.description}
                      </Typography>
                      <Stack spacing={2}>
                        {solution.benefits.map((benefit, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                mr: 2,
                              }}
                            />
                            <Typography variant="body2" fontWeight={500}>{benefit}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </ValueCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Market Opportunity */}
          <AnimatedSection>
            <Card sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              borderRadius: 24,
              border: 'none'
            }}>
              <CardContent sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                  $10B Global Market Opportunity
                </Typography>
                <Typography variant="h5" sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}>
                  Technical assessment & training market with $2B SAM in oil & gas, petrochemicals, energy, construction
                </Typography>
                <Stack direction="row" spacing={6} justifyContent="center" flexWrap="wrap">
                  <Box>
                    <Typography variant="h3" fontWeight="bold">$10B</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>Global TAM</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">$2B</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>SAM (Oil & Gas)</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">500+10</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>SOM (Engineers + Companies)</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Stack>
      </Container>
    </Box>
  );
};

export default ValueProposition;