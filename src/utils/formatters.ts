import { ProfessionalDomain, SkillCategory, ProficiencyLevel, ModuleStatus } from '../types/enums';

export const formatDomainName = (domain: ProfessionalDomain): string => {
  const domainNames: Record<ProfessionalDomain, string> = {
    [ProfessionalDomain.INSTRUMENTATION_CONTROL]: 'Instrumentation & Control',
    [ProfessionalDomain.ELECTRICAL]: 'Electrical Engineering',
    [ProfessionalDomain.PROCESS]: 'Process Engineering',
    [ProfessionalDomain.PIPING_MECHANICAL]: 'Piping & Mechanical',
    [ProfessionalDomain.CIVIL]: 'Civil Engineering',
    [ProfessionalDomain.PROJECT_MANAGEMENT]: 'Project Management'
  };
  return domainNames[domain] || domain;
};

export const formatSkillCategory = (category: SkillCategory): string => {
  return category.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export const formatProficiencyLevel = (level: ProficiencyLevel): string => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export const formatProgressPercentage = (completed: number, total: number): string => {
  const percentage = Math.round((completed / total) * 100);
  return `${percentage}%`;
};

export const formatAssessmentScore = (score: number): string => {
  return `${score}/100`;
};

export const formatModuleStatus = (status: ModuleStatus): string => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};