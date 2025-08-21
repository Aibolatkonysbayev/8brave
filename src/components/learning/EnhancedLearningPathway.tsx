import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Autocomplete,
  TextField,
  Chip,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplay';
import HomeIcon from '@mui/icons-material/Home';
import LearningModuleCard from './LearningModuleCard';
import SimulatorCard from './SimulatorCard';
import VideoModuleCard from './VideoModuleCard';
import { AssessmentResults } from '../../types/schema';
import { SkillCategory } from '../../types/enums';
import { databaseService } from '../../services/database';
import { DatabaseLearningModule, DatabaseSimulator, DatabaseVideoModule } from '../../types/database';
import { ModuleStatus } from '../../types/enums';

interface EnhancedLearningPathwayProps {
  results: AssessmentResults;
  onReturnHome?: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const EnhancedLearningPathway: React.FC<EnhancedLearningPathwayProps> = ({ results, onReturnHome }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [learningContent, setLearningContent] = useState<{
    modules: DatabaseLearningModule[];
    simulators: DatabaseSimulator[];
    videos: DatabaseVideoModule[];
  }>({
    modules: [],
    simulators: [],
    videos: [],
  });

  useEffect(() => {
    loadLearningContent();
  }, [results.domain, results.weaknesses]);

  const loadLearningContent = async () => {
    try {
      setLoading(true);
      const content = await databaseService.getLearningContent(results.domain, results.weaknesses);
      setLearningContent({
        modules: content.modules,
        simulators: content.simulators,
        videos: content.videos,
      });
    } catch (error) {
      console.error('Error loading learning content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleStartModule = (moduleId: string) => {
    console.log('Starting module:', moduleId);
    // Show information about the module
    alert(`Module: ${moduleId}\n\nThis is a demo version. In production, this would start an interactive learning module with:\n- Structured content\n- Progress tracking\n- Assessments\n- Certificates upon completion`);
  };

  const handleLaunchSimulator = (simulatorId: string) => {
    console.log('Launching simulator:', simulatorId);
    // Show information about the simulator
    alert(`Simulator: ${simulatorId}\n\nThis is a demo version. In production, this would launch an interactive simulator with:\n- Real-time process control\n- Emergency scenario training\n- Performance analytics\n- Progress tracking`);
  };

  const handlePlayVideo = (videoId: string) => {
    console.log('Playing video:', videoId);
    // Show information about the video
    alert(`Video: ${videoId}\n\nThis is a demo version. In production, this would play an educational video with:\n- High-quality content\n- Interactive quizzes\n- Progress tracking\n- Multi-language subtitles`);
  };

  const filterContent = <T extends { category: SkillCategory; title?: string; name?: string }>(
    items: T[]
  ): T[] => {
    return items.filter((item) => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch = !searchTerm || 
        (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.name?.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  };

  const getRecommendedContent = <T extends { category: SkillCategory; tags: string[] }>(
    items: T[]
  ): T[] => {
    return items.filter((item) =>
      results.weaknesses.some((weakness) =>
        item.tags.some((tag) => 
          weakness.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(weakness.toLowerCase().split(' ')[0])
        )
      )
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SchoolOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              8 Brave Learning Pathway
            </Typography>
          </Box>
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
          Personalized training recommendations with simulators and video modules based on your assessment results
        </Typography>
      </Box>

      {/* Search and Filter Controls */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Autocomplete
          sx={{ minWidth: 300 }}
          options={[]}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search learning content"
              variant="outlined"
              size="small"
            />
          )}
          onInputChange={(event, newValue) => setSearchTerm(newValue)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel size="small">Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            label="Filter by Category"
            size="small"
            onChange={(e) => setFilterCategory(e.target.value as SkillCategory | 'all')}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value={SkillCategory.TECHNICAL_COMPETENCY}>Technical</MenuItem>
            <MenuItem value={SkillCategory.LEADERSHIP}>Leadership</MenuItem>
            <MenuItem value={SkillCategory.SAFETY}>Safety</MenuItem>
            <MenuItem value={SkillCategory.SOFT_SKILLS}>Soft Skills</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Recommended" />
          <Tab label="All Modules" />
          <Tab label="Simulators" icon={<VideogameAssetOutlinedIcon />} />
          <Tab label="Video Library" icon={<SmartDisplayOutlinedIcon />} />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Based on your assessment results, these learning resources will help improve your weaker areas: {results.weaknesses.join(', ')}
        </Alert>
        
        <Stack spacing={4}>
          {/* Recommended Modules */}
          {getRecommendedContent(learningContent.modules).length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Recommended Training Modules
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {getRecommendedContent(learningContent.modules).map((module) => (
                  <LearningModuleCard
                    key={module.id}
                    module={module}
                    onStartModule={handleStartModule}
                    status={ModuleStatus.NOT_STARTED}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Recommended Simulators */}
          {getRecommendedContent(learningContent.simulators).length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Recommended Simulators
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {getRecommendedContent(learningContent.simulators).map((simulator) => (
                  <SimulatorCard
                    key={simulator.id}
                    simulator={simulator}
                    onLaunch={handleLaunchSimulator}
                    isRecommended
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Recommended Videos */}
          {getRecommendedContent(learningContent.videos).length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Recommended Video Modules
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {getRecommendedContent(learningContent.videos).map((video) => (
                  <VideoModuleCard
                    key={video.id}
                    video={video}
                    onPlay={handlePlayVideo}
                    isRecommended
                  />
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h5" gutterBottom>
          All Training Modules
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filterContent(learningContent.modules).map((module) => (
            <LearningModuleCard
              key={module.id}
              module={module}
              onStartModule={handleStartModule}
              status={ModuleStatus.NOT_STARTED}
            />
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Typography variant="h5" gutterBottom>
          Interactive Simulators
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Hands-on learning with virtual labs and process simulators
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filterContent(learningContent.simulators).map((simulator) => (
            <SimulatorCard
              key={simulator.id}
              simulator={simulator}
              onLaunch={handleLaunchSimulator}
            />
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <Typography variant="h5" gutterBottom>
          Video Learning Library
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Comprehensive video modules with quizzes and interactive content
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filterContent(learningContent.videos).map((video) => (
            <VideoModuleCard
              key={video.id}
              video={video}
              onPlay={handlePlayVideo}
              progress={Math.random() * 100} // Mock progress
            />
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default EnhancedLearningPathway;