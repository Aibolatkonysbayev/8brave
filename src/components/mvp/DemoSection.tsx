import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Card, CardContent, Container, Stack, Stepper, Step, StepLabel } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';
import { ProfessionalDomain } from '../../types/enums';
import { mockQuery } from '../../data/skillsAssessmentMockData';

const DemoCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#FFFFFF',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.12)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
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

const DemoButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  borderRadius: 12,
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#333333',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
  },
}));

interface DemoSectionProps {
  onStartDemo: () => void;
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

const DemoSection: React.FC<DemoSectionProps> = ({ onStartDemo }) => {
  const [activeStep, setActiveStep] = useState(0);
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

  const demoSteps = [
    {
      label: 'Select Domain',
      description: 'Choose from 6 specialized oil & gas engineering domains',
      icon: <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      label: 'Take Assessment',
      description: 'Role-based tests across engineering domains with 1,500+ validated questions',
      icon: <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      label: 'View Results',
      description: 'Deep analytics + competency maps + career pathing',
      icon: <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      label: 'Learning Lab',
      description: 'Videos, simulators, books tailored to user\'s gaps',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
    }
  ];

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ py: 12, bgcolor: 'background.default' }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={10}>
          {/* Header */}
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 800 }}>
                Experience the Platform
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 6, fontWeight: 400, lineHeight: 1.6 }}>
                See how 8 Brave transforms skills assessment and development for oil & gas professionals
              </Typography>
              <DemoButton
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={onStartDemo}
              >
                Start Live Demo
              </DemoButton>
            </Box>
          </AnimatedSection>

          {/* Demo Flow Visualization */}
          <AnimatedSection>
            <DemoCard>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
                  Platform Workflow
                </Typography>
                
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
                  {demoSteps.map((step, index) => (
                    <Step key={step.label} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Box sx={{ textAlign: 'center', minHeight: 140 }}>
                  <Box sx={{ mb: 3 }}>
                    {demoSteps[activeStep].icon}
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {demoSteps[activeStep].label}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
                    {demoSteps[activeStep].description}
                  </Typography>
                </Box>
              </CardContent>
            </DemoCard>
          </AnimatedSection>

          {/* Key Features Preview */}
          <AnimatedSection>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 4,
              }}
            >
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" color="primary.main" fontWeight="bold" gutterBottom>
                    6
                  </Typography>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Engineering Domains
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    I&C, Electrical, Process, Piping & Mechanical, Civil, Project Management
                  </Typography>
                </CardContent>
              </FeatureCard>

              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" color="primary.main" fontWeight="bold" gutterBottom>
                    1,500+
                  </Typography>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Validated Questions
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Across all domains, continuously validated by SMEs
                  </Typography>
                </CardContent>
              </FeatureCard>

              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" color="primary.main" fontWeight="bold" gutterBottom>
                    AI
                  </Typography>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Powered Insights
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Adaptive testing & predictive analytics via Armeta AI
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Box>
          </AnimatedSection>
        </Stack>
      </Container>
    </Box>
  );
};

export default DemoSection;