import React from 'react';
import { Box } from '@mui/material';
import LandingHero from '../layout/LandingHero';
import ValueProposition from './ValueProposition';
import DemoSection from './DemoSection';
import BusinessMetrics from './BusinessMetrics';
import BusinessModel from './BusinessModel';
import TeamSection from './TeamSection';
import Footer from './Footer';

interface MVPLandingProps {
  onGetStarted: () => void;
}

const MVPLanding: React.FC<MVPLandingProps> = ({ onGetStarted }) => {
  return (
    <Box>
      <LandingHero onGetStarted={onGetStarted} />
      <ValueProposition />
      <DemoSection onStartDemo={onGetStarted} />
      <BusinessMetrics />
      <BusinessModel />
      <TeamSection />
      <Footer />
    </Box>
  );
};

export default MVPLanding;