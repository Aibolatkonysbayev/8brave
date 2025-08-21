import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Stack,
  Box,
  Chip,
} from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import { DatabaseLearningModule } from '../../types/database';
import { formatDuration, formatModuleStatus } from '../../utils/formatters';
import { ModuleStatus } from '../../types/enums';

interface LearningModuleCardProps {
  module: DatabaseLearningModule;
  onStartModule: (moduleId: string) => void;
  status?: ModuleStatus;
}

const LearningModuleCard: React.FC<LearningModuleCardProps> = ({
  module,
  onStartModule,
  status = ModuleStatus.NOT_STARTED,
}) => {
  const getStatusColor = (status: ModuleStatus) => {
    switch (status) {
      case ModuleStatus.COMPLETED:
        return 'success';
      case ModuleStatus.IN_PROGRESS:
        return 'warning';
      case ModuleStatus.NOT_STARTED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getProgress = (status: ModuleStatus) => {
    switch (status) {
      case ModuleStatus.COMPLETED:
        return 100;
      case ModuleStatus.IN_PROGRESS:
        return 45; // Mock progress
      case ModuleStatus.NOT_STARTED:
        return 0;
      default:
        return 0;
    }
  };

  const getButtonText = (status: ModuleStatus) => {
    switch (status) {
      case ModuleStatus.COMPLETED:
        return 'Review';
      case ModuleStatus.IN_PROGRESS:
        return 'Continue';
      case ModuleStatus.NOT_STARTED:
        return 'Start';
      default:
        return 'Start';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Typography variant="h6" component="h3">
                {module.title}
              </Typography>
              <Chip
                label={formatModuleStatus(status)}
                color={getStatusColor(status)}
                size="small"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {module.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Progress: {getProgress(status)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={getProgress(status)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PlayCircleFilledOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {module.videoCount} videos
              </Typography>
            </Stack>
            {module.hasVirtualLab && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LaptopMacOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Virtual Lab
                </Typography>
              </Stack>
            )}
            <Typography variant="body2" color="text.secondary">
              {formatDuration(module.duration)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onStartModule(module.id)}
        >
          {getButtonText(status)}
        </Button>
      </Box>
    </Card>
  );
};

export default LearningModuleCard;