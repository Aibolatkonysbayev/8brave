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
  LinearProgress,
} from '@mui/material';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QuizIcon from '@mui/icons-material/Quiz';
import { DatabaseVideoModule } from '../../types/database';
import { formatDuration } from '../../utils/formatters';

interface VideoModuleCardProps {
  video: DatabaseVideoModule;
  onPlay: (videoId: string) => void;
  progress?: number;
  isRecommended?: boolean;
}

const VideoModuleCard: React.FC<VideoModuleCardProps> = ({
  video,
  onPlay,
  progress = 0,
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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isRecommended ? 2 : 1,
        borderColor: isRecommended ? 'secondary.main' : 'grey.300',
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
          color="secondary"
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
          height: 180,
          background: 'linear-gradient(135deg, #E65100 0%, #FF8A50 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <SmartDisplayOutlinedIcon
          sx={{
            fontSize: 48,
            color: 'white',
          }}
        />
        {progress > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                },
              }}
            />
          </Box>
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {video.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {video.description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={video.difficulty}
              color={getDifficultyColor(video.difficulty)}
              size="small"
            />
            {video.quiz && (
              <Chip
                icon={<QuizIcon />}
                label="Has Quiz"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatDuration(video.duration)}
              </Typography>
            </Stack>
            {progress > 0 && (
              <Typography variant="body2" color="primary">
                {Math.round(progress)}% complete
              </Typography>
            )}
          </Stack>

          {video.subtitles && video.subtitles.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Available subtitles:
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {video.subtitles.map((lang) => (
                  <Chip
                    key={lang}
                    label={lang.toUpperCase()}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>

        <Button
          variant="contained"
          fullWidth
          startIcon={<PlayArrowIcon />}
          onClick={() => onPlay(video.id)}
          sx={{ mt: 2 }}
          color={progress > 0 ? 'secondary' : 'primary'}
        >
          {progress > 0 ? 'Continue Watching' : 'Start Video'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoModuleCard;