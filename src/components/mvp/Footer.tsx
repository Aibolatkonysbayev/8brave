import React from 'react';
import { Box, Typography, Container, Stack, Link, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/material/styles';

const FooterLink = styled(Link)(({ theme }) => ({
  opacity: 0.8,
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 1,
    transform: 'translateY(-2px)',
  }
}));

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 6,
            }}
          >
            {/* Company Info */}
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                8 Brave
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, lineHeight: 1.6, maxWidth: 250 }}>
                The HackerRank for Oil & Gas Engineers - AI-powered skill assessment + learning ecosystem.
              </Typography>
              <Stack direction="row" spacing={2}>
                <LinkedInIcon sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 }, fontSize: 28 }} />
                <EmailIcon sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 }, fontSize: 28 }} />
              </Stack>
            </Box>

            {/* Product */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Product
              </Typography>
              <Stack spacing={2}>
                <FooterLink href="#" color="inherit">
                  Skills Assessment
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Learning Pathways
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Virtual Simulators
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Analytics Dashboard
                </FooterLink>
              </Stack>
            </Box>

            {/* Company */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Company
              </Typography>
              <Stack spacing={2}>
                <FooterLink href="#" color="inherit">
                  About Us
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Join Pilot
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Partnerships
                </FooterLink>
                <FooterLink href="#" color="inherit">
                  Investors
                </FooterLink>
              </Stack>
            </Box>

            {/* Contact */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Contact
              </Typography>
              <Stack spacing={2}>
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  hello@8brave.com
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Pre-Seed Stage
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Building MVP
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

          {/* Bottom Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
              © 2024 8 Brave. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={4}>
              <FooterLink href="#" color="inherit">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" color="inherit">
                Terms of Service
              </FooterLink>
              <FooterLink href="#" color="inherit">
                Cookie Policy
              </FooterLink>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;