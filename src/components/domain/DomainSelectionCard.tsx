import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import { Domain } from '../../types/schema';

interface DomainSelectionCardProps {
  domain: Domain;
  selected: boolean;
  onSelect: (domain: Domain) => void;
}

const DomainSelectionCard: React.FC<DomainSelectionCardProps> = ({
  domain,
  selected,
  onSelect,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'grey.300',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.light',
          transform: 'translateY(-2px)',
          boxShadow: 2,
        },
      }}
    >
      <CardActionArea onClick={() => onSelect(domain)}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EngineeringOutlinedIcon
              sx={{
                fontSize: 32,
                color: selected ? 'primary.main' : 'grey.600',
                mr: 2,
              }}
            />
            <Typography variant="h6" component="h3" color="text.primary">
              {domain.name}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {domain.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DomainSelectionCard;