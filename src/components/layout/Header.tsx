import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  color: theme.palette.text.primary,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '1.5rem',
  letterSpacing: '-0.02em',
  background: 'linear-gradient(135deg, #000000 0%, #666666 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const HomeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  borderRadius: 8,
  padding: '8px 16px',
  fontWeight: 600,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#333333',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
  }
}));

interface HeaderProps {
  onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Logo variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            8 Brave
          </Logo>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.8, 
                fontWeight: 500,
                display: { xs: 'none', md: 'block' }
              }}
            >
              The HackerRank for Oil & Gas Engineers
            </Typography>
            
            {onReset && (
              <HomeButton 
                onClick={onReset} 
                startIcon={<HomeIcon />}
                size="small"
              >
                Home
              </HomeButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;