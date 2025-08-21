import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { DatabaseSimulator } from '../../types/database';
import { formatDuration } from '../../utils/formatters';

interface SimulatorCardProps {
  simulator: DatabaseSimulator;
  onLaunch: (simulatorId: string) => void;
  isRecommended?: boolean;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
  simulator,
  onLaunch,
  isRecommended = false,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual_lab':
        return '🧪';
      case 'process_simulator':
        return '⚙️';
      case 'equipment_simulator':
        return '🔧';
      case 'safety_training':
        return '🦺';
      default:
        return '💻';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isRecommended ? 2 : 1,
        borderColor: isRecommended ? 'primary.main' : 'grey.300',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {isRecommended && (
        <Chip
          label="Recommended"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        />
      )}

      <CardMedia
        sx={{
          height: 200,
          background: 'linear-gradient(135deg, #1B365D 0%, #2E4F73 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            fontSize: 64,
            opacity: 0.3,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {getTypeIcon(simulator.type)}
        </Box>
        <VideogameAssetOutlinedIcon
          sx={{
            fontSize: 48,
            color: 'white',
            zIndex: 1,
          }}
        />
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {simulator.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {simulator.description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={simulator.difficulty}
              color={getDifficultyColor(simulator.difficulty)}
              size="small"
            />
            <Chip
              label={simulator.type.replace('_', ' ')}
              variant="outlined"
              size="small"
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatDuration(simulator.estimatedTime)}
              </Typography>
            </Stack>
            <Rating value={4.5} readOnly size="small" precision={0.5} />
          </Stack>

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Learning Objectives:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {simulator.learningObjectives.slice(0, 2).map((objective, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  {objective}
                </Typography>
              ))}
            </Box>
          </Box>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          startIcon={<PlayArrowIcon />}
          onClick={() => onLaunch(simulator.id)}
          sx={{ mt: 2 }}
        >
          Launch Simulator
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimulatorCard;