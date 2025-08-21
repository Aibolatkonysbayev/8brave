import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DomainSelectionCard from './DomainSelectionCard';
import { Domain } from '../../types/schema';
import { mockQuery } from '../../data/skillsAssessmentMockData';

interface DomainSelectionProps {
  onDomainSelected: (domain: Domain) => void;
  onReturnHome?: () => void;
}

const DomainSelection: React.FC<DomainSelectionProps> = ({ onDomainSelected, onReturnHome }) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
  };

  const handleStartAssessment = () => {
    if (selectedDomain) {
      onDomainSelected(selectedDomain);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box />
          <Typography variant="h3" component="h1">
            Select Your Domain
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
        <Typography variant="body1" color="text.secondary">
          Choose your engineering domain for role-based assessment (MVP - 6 domains)
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {mockQuery.domains.map((domain) => (
          <DomainSelectionCard
            key={domain.id}
            domain={domain}
            selected={selectedDomain?.id === domain.id}
            onSelect={handleDomainSelect}
          />
        ))}
      </Box>

      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          disabled={!selectedDomain}
          onClick={handleStartAssessment}
          sx={{ minWidth: 200 }}
        >
          Start Assessment
        </Button>
      </Stack>
    </Box>
  );
};

export default DomainSelection;