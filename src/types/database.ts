import { ProfessionalDomain, QuestionType, SkillCategory, AssessmentStatus, ModuleStatus, ProficiencyLevel } from './enums';

// Database schema interfaces
export interface DatabaseQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number;
  category: SkillCategory;
  domain: ProfessionalDomain;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  experience: number; // years
  selectedDomains: ProfessionalDomain[];
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseAssessment {
  id: string;
  userId: string;
  domain: ProfessionalDomain;
  status: AssessmentStatus;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // minutes
  questions: string[]; // question IDs
  answers: number[];
  score: number;
  skillBreakdown: Record<string, { score: number; level: ProficiencyLevel }>;
  strengths: string[];
  weaknesses: string[];
  workEnvironmentPreferences: string[];
}

export interface DatabaseLearningModule {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  domain: ProfessionalDomain;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  videoCount: number;
  hasVirtualLab: boolean;
  hasSimulator: boolean;
  prerequisites: string[]; // module IDs
  learningObjectives: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSimulator {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  domain: ProfessionalDomain;
  type: 'virtual_lab' | 'process_simulator' | 'equipment_simulator' | 'safety_training';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  prerequisites: string[];
  learningObjectives: string[];
  thumbnailUrl: string;
  launchUrl: string;
  tags: string[];
}

export interface DatabaseVideoModule {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  domain: ProfessionalDomain;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string;
  thumbnailUrl: string;
  transcript?: string;
  subtitles?: string[];
  quiz?: {
    questions: DatabaseQuestion[];
  };
  tags: string[];
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  status: ModuleStatus;
  progress: number; // 0-100
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // minutes
  lastAccessedAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  type: 'assessment_completed' | 'module_completed' | 'skill_mastered' | 'streak_achieved';
  title: string;
  description: string;
  iconUrl?: string;
  earnedAt: string;
  metadata?: Record<string, any>;
}

// API Response types
export interface QuestionsResponse {
  questions: DatabaseQuestion[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LearningContentResponse {
  modules: DatabaseLearningModule[];
  simulators: DatabaseSimulator[];
  videos: DatabaseVideoModule[];
  total: number;
}

export interface UserProgressResponse {
  progress: UserProgress[];
  achievements: UserAchievement[];
  overallProgress: {
    completedModules: number;
    totalModules: number;
    totalTimeSpent: number;
    skillsImproved: string[];
  };
}