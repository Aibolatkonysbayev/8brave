import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Container, Stack, Avatar, Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/material/styles';

const TeamCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#FFFFFF',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.12)',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
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

const TeamSection: React.FC = () => {
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

  const teamMembers = [
    {
      name: 'Aibolat Konysbayev',
      role: 'Founder & CEO',
      avatar: '/images/team/aibolat.jpg',
      bio: '14 years in Oil & Gas, founder of Advanced People (300+ engineers trained)',
      expertise: ['Oil & Gas Operations', 'Engineering Training', 'Product Management', 'Agile Certified'],
      linkedin: '#'
    }
  ];

  const advisors = [
    {
      name: 'SME Network',
      role: 'Domain Experts',
      company: '15+ years experience across global capital projects',
      avatar: '/images/partners/sme-network.png'
    },
    {
      name: 'Armeta AI',
      role: 'Technology Partner',
      company: 'AI-powered assessment & analytics integration',
      avatar: '/images/partners/armeta.png'
    }
  ];

  const companyStats = [
    { label: 'Founded', value: '2024' },
    { label: 'Team Size', value: '1+' },
    { label: 'Funding Stage', value: 'Pre-Seed' },
    { label: 'Partnerships', value: '2' }
  ];

  return (
    <Box sx={{ py: 12, bgcolor: 'grey.50' }} ref={sectionRef}>
      <Container maxWidth="lg">
        <Stack spacing={12}>
          {/* Team Introduction */}
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 800 }}>
                Founder & Strategic Partners
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400, lineHeight: 1.6 }}>
                Combining deep industry expertise with strategic partnerships to revolutionize skills assessment
              </Typography>
            </Box>
          </AnimatedSection>

          {/* Company Stats */}
          <AnimatedSection>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 4,
              }}
            >
              {companyStats.map((stat, index) => (
                <StatCard key={index}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h2" color="primary.main" fontWeight="bold" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </StatCard>
              ))}
            </Box>
          </AnimatedSection>

          {/* Core Team */}
          <AnimatedSection>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
                Founder
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr', lg: '1fr' },
                  gap: 4,
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                {teamMembers.map((member, index) => (
                  <TeamCard key={index}>
                    <CardContent sx={{ p: 5, textAlign: 'center' }}>
                      <Avatar
                        src={member.avatar}
                        sx={{ width: 100, height: 100, mx: 'auto', mb: 3 }}
                      />
                      <Typography variant="h4" gutterBottom fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="h6" color="primary.main" gutterBottom fontWeight="medium" sx={{ mb: 3 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                        {member.bio}
                      </Typography>
                      <Stack spacing={2}>
                        {member.expertise.map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="medium"
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              borderColor: 'rgba(0,0,0,0.2)'
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </TeamCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Advisory Board */}
          <AnimatedSection>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
                Strategic Partnerships
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 6,
                }}
              >
                {advisors.map((advisor, index) => (
                  <TeamCard key={index}>
                    <CardContent sx={{ p: 5, textAlign: 'center' }}>
                      <Avatar
                        src={advisor.avatar}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 3 }}
                      />
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {advisor.name}
                      </Typography>
                      <Typography variant="h6" color="primary.main" gutterBottom fontWeight="medium">
                        {advisor.role}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {advisor.company}
                      </Typography>
                    </CardContent>
                  </TeamCard>
                ))}
              </Box>
            </Box>
          </AnimatedSection>

          {/* Company Mission */}
          <AnimatedSection>
            <Card sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              borderRadius: 24,
              border: 'none'
            }}>
              <CardContent sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                  Our Vision
                </Typography>
                <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9, fontWeight: 400, lineHeight: 1.6 }}>
                  Short-term: MVP validated in oil & gas. Mid-term: Become standard for skills benchmarking in energy projects. 
                  Long-term: "The global HackerRank for Engineers" → proof of competence across industries.
                </Typography>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Stack>
      </Container>
    </Box>
  );
};

export default TeamSection;