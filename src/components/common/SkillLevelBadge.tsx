import React from 'react';
import { Chip } from '@mui/material';
import { ProficiencyLevel } from '../../types/enums';
import { formatProficiencyLevel } from '../../utils/formatters';

interface SkillLevelBadgeProps {
  level: ProficiencyLevel;
}

const SkillLevelBadge: React.FC<SkillLevelBadgeProps> = ({ level }) => {
  const getColor = (level: ProficiencyLevel) => {
    switch (level) {
      case ProficiencyLevel.BEGINNER:
        return 'error';
      case ProficiencyLevel.INTERMEDIATE:
        return 'warning';
      case ProficiencyLevel.ADVANCED:
        return 'info';
      case ProficiencyLevel.EXPERT:
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={formatProficiencyLevel(level)}
      color={getColor(level)}
      size="small"
      variant="filled"
    />
  );
};

export default SkillLevelBadge;