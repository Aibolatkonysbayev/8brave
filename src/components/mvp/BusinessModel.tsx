import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Container, Stack, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PricingCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>(({ theme, featured }) => ({
  height: '100%',
  position: 'relative',
  border: featured ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.08)',
  transform: featured ? 'scale(1.05)' : 'scale(1)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: 24,
  background: '#FFFFFF',
  '&:hover': {
    transform: featured ? 'scale(1.08)' : 'scale(1.03)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: featured ? `2px solid ${theme.palette.primary.main}` : '1px solid rgba(0,0,0,0.12)',
  },
}));

const RevenueCard = styled(Card)(({ theme }) => ({
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

const BusinessModel: React.FC = () => {
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

  const pricingPlans = [
    {
      name: 'Pre-Seed Focus',
      icon: <PersonIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      price: 'Growth',
      period: '& Pilots',
      description: 'Building MVP and validating with first 500 users',
      features: [
        'Free access for pilot users',
        'Comprehensive skills assessment',
        'Detailed performance reports',
        'Personalized learning pathways',
        'Feedback collection'
      ],
      cta: 'Join Pilot',
      featured: false
    },
    {
      name: 'Future B2C',
      icon: <BusinessIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      price: '$20-50',
      period: 'per month',
      description: 'Professional subscription for individual engineers',
      features: [
        'Unlimited assessments',
        'Advanced analytics dashboard',
        'Custom learning pathways',
        'Virtual lab access',
        'Career development tools',
        'Mobile app access',
        'Priority support'
      ],
      cta: 'Coming Soon',
      featured: true
    },
    {
      name: 'Future B2B',
      icon: <SchoolIcon sx={{ fontSize: 56, color: 'primary.main' }} />,
      price: '$5k-50k',
      period: 'per year',
      description: 'Enterprise solution for competency analytics & LMS',
      features: [
        'Company-wide assessments',
        'Team competency analytics',
        'LMS integration',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'Training & support'
      ],
      cta: 'Contact Sales',
      featured: false
    }
  ];

  const revenueStreams = [
    {
      title: 'B2C Subscriptions',
      description: 'Individual engineer subscriptions',
      percentage: '40%',
      color: 'primary.main'
    },
    {
      title: 'B2B Enterprise',
      description: 'Company-wide competency analytics',
      percentage: '35%',
      color: 'primary.main'
    },
    {
      title: 'Certification',
      description: 'Partnerships and premium features',
      percentage: '15%',
      color: 'primary.main'
    },
    {
      title: 'Training Content',
      description: 'Premium modules and simulators',
      percentage: '10%',
      color: 'primary.main'
    }
  ];

  return (
    <Box sx={{ py: 12 }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={12}>
          {/* Business Model Overview */}
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 800 }}>
                Scalable Business Model
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
                Multiple revenue streams with high customer lifetime value and strong unit economics
              </Typography>
            </Box>
          </AnimatedSection>

          {/* Revenue Streams */}
          <AnimatedSection>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
                Revenue Streams
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  gap: 4,
                }}
              >
                {revenueStreams.map((stream, index) => (
                  <RevenueCard key={index}>
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Typography variant="h2" sx={{ color: stream.color, fontWeight: 'bold', mb: 2 }}>
                        {stream.percentage}
                      </Typography>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {stream.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {stream.description}
                      </Typography>
                    </CardContent>
                  </RevenueCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Pricing Plans */}
          <AnimatedSection>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 8, fontWeight: 700 }}>
                Pricing Strategy
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
                  gap: 6,
                  alignItems: 'stretch',
                }}
              >
                {pricingPlans.map((plan, index) => (
                  <PricingCard key={index} featured={plan.featured}>
                    {plan.featured && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 5, textAlign: 'center', height: '100%' }}>
                      <Box sx={{ mb: 4 }}>
                        {plan.icon}
                      </Box>
                      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                        {plan.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                        {plan.description}
                      </Typography>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h2" component="span" fontWeight="bold" color="primary.main">
                          {plan.price}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                          {plan.period}
                        </Typography>
                      </Box>
                      <Stack spacing={2} sx={{ mb: 5 }}>
                        {plan.features.map((feature, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon sx={{ color: 'success.main', mr: 2, fontSize: 20 }} />
                            <Typography variant="body2" fontWeight={500}>{feature}</Typography>
                          </Box>
                        ))}
                      </Stack>
                      <Button
                        variant={plan.featured ? 'contained' : 'outlined'}
                        fullWidth
                        size="large"
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          py: 1.5,
                        }}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </PricingCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Financial Projections */}
          <AnimatedSection>
            <Card sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              borderRadius: 24,
              border: 'none'
            }}>
              <CardContent sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
                  Pre-Seed Funding Allocation
                </Typography>
                <Stack direction="row" spacing={8} justifyContent="center" flexWrap="wrap" sx={{ mt: 6 }}>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">50%</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>Product & Tech</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">25%</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>Content Development</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">15%</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>GTM & Pilots</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold">10%</Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>Operations</Typography>
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

export default BusinessModel;