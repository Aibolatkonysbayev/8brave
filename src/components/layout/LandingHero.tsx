import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#FFFFFF',
  color: theme.palette.text.primary,
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '60px', // Account for fixed header
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.02)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: 24,
  padding: theme.spacing(4),
  textAlign: 'center',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-12px)',
    background: 'rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
  },
}));

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  background: 'linear-gradient(135deg, #000000 0%, #666666 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 1,
  transform: 'translateY(0)',
  animation: 'fadeInUp 1s ease-out',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const AnimatedSubtitle = styled(Typography)(({ theme }) => ({
  opacity: 1,
  transform: 'translateY(0)',
  animation: 'fadeInUp 1s ease-out 0.3s',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  opacity: 1,
  transform: 'translateY(0)',
  animation: 'fadeInUp 1s ease-out 0.6s',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
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

const AnimatedFeatureCard = styled(FeatureCard)(({ theme, delay }: { theme?: any; delay: number }) => ({
  opacity: 1,
  transform: 'translateY(0)',
  animation: `fadeInUp 0.8s ease-out ${delay}s`,
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(40px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted }) => {
  return (
    <HeroSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Box>
            <AnimatedTitle
              variant="h1"
              gutterBottom
              sx={{ mb: 4 }}
            >
              8 Brave
            </AnimatedTitle>
            <AnimatedSubtitle variant="h4" sx={{ mb: 6, maxWidth: 700, mx: 'auto', fontWeight: 400, color: 'text.secondary' }}>
              The HackerRank for Oil & Gas Engineers
            </AnimatedSubtitle>
            <AnimatedButton
              variant="contained"
              size="large"
              onClick={onGetStarted}
            >
              Get Started
            </AnimatedButton>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              width: '100%',
              maxWidth: 1000,
            }}
          >
            <AnimatedFeatureCard delay={0.9}>
              <FactCheckOutlinedIcon sx={{ fontSize: 56, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                6 Engineering Domains
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                I&C, Electrical, Process, Piping & Mechanical, Civil, Project Management
              </Typography>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard delay={1.1}>
              <PollOutlinedIcon sx={{ fontSize: 56, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                AI-Powered Assessment
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                1,500+ validated questions with deep analytics and competency mapping
              </Typography>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard delay={1.3}>
              <SchoolOutlinedIcon sx={{ fontSize: 56, mb: 3, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                Integrated Learning Labs
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Videos, simulators, and virtual labs tailored to skill gaps
              </Typography>
            </AnimatedFeatureCard>
          </Box>
        </Stack>
      </Container>
    </HeroSection>
  );
};

export default LandingHero;