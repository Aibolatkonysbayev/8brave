import { ProfessionalDomain, QuestionType, SkillCategory, AssessmentStatus, ModuleStatus, ProficiencyLevel } from './enums';

// Props types (data passed to components)
export interface User {
  id: string;
  name: string;
  email: string;
  selectedDomain?: ProfessionalDomain;
  hasCompletedAssessment: boolean;
}

export interface Domain {
  id: string;
  name: ProfessionalDomain;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number;
  category: SkillCategory;
  domain: ProfessionalDomain;
}

export interface Assessment {
  id: string;
  status: AssessmentStatus;
  currentQuestion: number;
  totalQuestions: number;
  startedAt: string;
  completedAt?: string;
}

export interface SkillScore {
  score: number;
  level: ProficiencyLevel;
}

export interface AssessmentResults {
  userId: string;
  assessmentId: string;
  domain: ProfessionalDomain;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  completedAt: string;
  skillBreakdown: Record<string, SkillScore>;
  strengths: string[];
  weaknesses: string[];
  workEnvironmentPreferences: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: ModuleStatus;
  videoCount: number;
  hasVirtualLab: boolean;
  category: SkillCategory;
}

// Store types (global state data)
export interface AppState {
  user: User | null;
  currentAssessment: Assessment | null;
  assessmentResults: AssessmentResults | null;
  selectedDomain: ProfessionalDomain | null;
}

// Query types (API response data)
export interface DomainsResponse {
  domains: Domain[];
}

export interface AssessmentQuestionsResponse {
  questions: AssessmentQuestion[];
}

export interface AssessmentResultsResponse {
  results: AssessmentResults;
}

export interface LearningModulesResponse {
  modules: LearningModule[];
}

// Props for the root component
export interface RootComponentProps {
  user: User;
  currentAssessment: Assessment | null;
}