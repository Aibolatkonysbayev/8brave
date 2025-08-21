// Domain types for oil and gas professionals (MVP scope - 6 domains)
export enum ProfessionalDomain {
  INSTRUMENTATION_CONTROL = 'I&C',
  ELECTRICAL = 'Electrical',
  PROCESS = 'Process',
  PIPING_MECHANICAL = 'Piping & Mechanical',
  CIVIL = 'Civil',
  PROJECT_MANAGEMENT = 'Project Management'
}

// Assessment question types
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SCENARIO_BASED = 'scenario_based'
}

// Skill categories
export enum SkillCategory {
  HARD_SKILLS = 'hard_skills',
  SOFT_SKILLS = 'soft_skills',
  TECHNICAL_COMPETENCY = 'technical_competency',
  LEADERSHIP = 'leadership',
  SAFETY = 'safety'
}

// Assessment status
export enum AssessmentStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

// Learning module status
export enum ModuleStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

// Skill proficiency levels
export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}