import React, { useState } from 'react';
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
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LearningModuleCard from './LearningModuleCard';
import { AssessmentResults } from '../../types/schema';
import { mockQuery } from '../../data/skillsAssessmentMockData';
import { SkillCategory } from '../../types/enums';

interface LearningPathwayProps {
  results: AssessmentResults;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`learning-tabpanel-${index}`}
      aria-labelledby={`learning-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const LearningPathway: React.FC<LearningPathwayProps> = ({ results }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'all'>('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleStartModule = (moduleId: string) => {
    console.log('Starting module:', moduleId);
    // Implementation for starting a module
  };

  const filteredModules = mockQuery.learningModules.filter((module) => {
    if (filterCategory === 'all') return true;
    return module.category === filterCategory;
  });

  const recommendedModules = mockQuery.learningModules.filter((module) =>
    results.weaknesses.some((weakness) =>
      module.title.toLowerCase().includes(weakness.toLowerCase().split(' ')[0])
    )
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SchoolOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Learning Pathway
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Personalized training recommendations based on your assessment results
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Recommended" />
          <Tab label="All Modules" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Typography variant="h5" gutterBottom>
          Recommended for You
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Based on your assessment results, these modules will help improve your weaker areas
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
          {recommendedModules.map((module) => (
            <LearningModuleCard
              key={module.id}
              module={module}
              onStartModule={handleStartModule}
            />
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5">All Training Modules</Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={filterCategory}
              label="Filter by Category"
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
          {filteredModules.map((module) => (
            <LearningModuleCard
              key={module.id}
              module={module}
              onStartModule={handleStartModule}
            />
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default LearningPathway;