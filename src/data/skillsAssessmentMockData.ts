import { ProfessionalDomain, QuestionType, SkillCategory, AssessmentStatus, ModuleStatus, ProficiencyLevel } from '../types/enums';

// Mock data for API queries
export const mockQuery = {
  domains: [
    { id: '1', name: ProfessionalDomain.INSTRUMENTATION_CONTROL as const, description: 'Instrumentation & Control systems' },
    { id: '2', name: ProfessionalDomain.ELECTRICAL as const, description: 'Electrical systems and power' },
    { id: '3', name: ProfessionalDomain.PROCESS as const, description: 'Process engineering and optimization' },
    { id: '4', name: ProfessionalDomain.PIPING_MECHANICAL as const, description: 'Piping design and mechanical systems' },
    { id: '5', name: ProfessionalDomain.CIVIL as const, description: 'Civil and structural engineering' },
    { id: '6', name: ProfessionalDomain.PROJECT_MANAGEMENT as const, description: 'Project management and execution' }
  ],
  assessmentQuestions: [
    // I&C Domain Questions (100 questions available)
    {
      id: 'ic_001',
      question: 'What is the primary function of a PLC in industrial automation?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Data storage', 'Process control', 'Network communication', 'Power distribution'],
      correctAnswer: 1,
      category: SkillCategory.TECHNICAL_COMPETENCY as const,
      domain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const
    },
    {
      id: 'ic_002',
      question: 'Which communication protocol is commonly used in industrial networks?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['HTTP', 'Modbus', 'SMTP', 'FTP'],
      correctAnswer: 1,
      category: SkillCategory.TECHNICAL_COMPETENCY as const,
      domain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const
    },
    {
      id: 'ic_003',
      question: 'What is the primary safety consideration when working with high-pressure systems?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Cost efficiency', 'Pressure relief systems', 'Speed of operation', 'Equipment color coding'],
      correctAnswer: 1,
      category: SkillCategory.SAFETY as const,
      domain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const
    },
    {
      id: 'ic_004',
      question: 'In a distributed control system (DCS), what is the main advantage over traditional control?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Lower cost', 'Centralized monitoring and control', 'Simpler installation', 'Less maintenance'],
      correctAnswer: 1,
      category: SkillCategory.TECHNICAL_COMPETENCY as const,
      domain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const
    },
    // Process Engineering Questions
    {
      id: 'pe_001',
      question: 'Safety protocols must be followed at all times in oil and gas operations.',
      type: QuestionType.TRUE_FALSE as const,
      options: ['True', 'False'],
      correctAnswer: 0,
      category: SkillCategory.SAFETY as const,
      domain: ProfessionalDomain.PROCESS as const
    },
    {
      id: 'pe_002',
      question: 'What is the purpose of a heat exchanger in a process plant?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Generate electricity', 'Transfer heat between fluids', 'Store chemicals', 'Monitor pressure'],
      correctAnswer: 1,
      category: SkillCategory.TECHNICAL_COMPETENCY as const,
      domain: ProfessionalDomain.PROCESS as const
    },
    {
      id: 'pe_003',
      question: 'Which factor is most critical in process optimization?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Equipment cost', 'Energy efficiency', 'Installation time', 'Equipment size'],
      correctAnswer: 1,
      category: SkillCategory.TECHNICAL_COMPETENCY as const,
      domain: ProfessionalDomain.PROCESS as const
    },
    {
      id: 'pe_004',
      question: 'In process design, what does HAZOP analysis primarily focus on?',
      type: QuestionType.MULTIPLE_CHOICE as const,
      options: ['Cost reduction', 'Hazard and operability study', 'Equipment sizing', 'Project timeline'],
      correctAnswer: 1,
      category: SkillCategory.SAFETY as const,
      domain: ProfessionalDomain.PROCESS as const
    }
  ],
  userResults: {
    userId: 'user123',
    assessmentId: 'assessment456',
    domain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const,
    totalQuestions: 50,
    correctAnswers: 39,
    score: 78,
    completedAt: '2024-01-15T10:30:00Z',
    skillBreakdown: {
      hardSkills: { score: 82, level: ProficiencyLevel.ADVANCED as const },
      softSkills: { score: 74, level: ProficiencyLevel.INTERMEDIATE as const },
      technicalCompetency: { score: 85, level: ProficiencyLevel.ADVANCED as const },
      leadership: { score: 68, level: ProficiencyLevel.INTERMEDIATE as const },
      safety: { score: 92, level: ProficiencyLevel.EXPERT as const }
    },
    strengths: ['Safety Protocols', 'Technical Problem Solving', 'Process Optimization'],
    weaknesses: ['Team Leadership', 'Project Planning', 'Communication Skills'],
    workEnvironmentPreferences: ['Collaborative team environment', 'Hands-on technical work', 'Continuous learning opportunities']
  },
  learningModules: [
    {
      id: 'module1',
      title: 'Advanced PLC Programming',
      description: 'Master advanced PLC programming techniques and troubleshooting',
      duration: 240,
      status: ModuleStatus.NOT_STARTED as const,
      videoCount: 12,
      hasVirtualLab: true,
      category: SkillCategory.TECHNICAL_COMPETENCY as const
    },
    {
      id: 'module2',
      title: 'Leadership in Engineering Teams',
      description: 'Develop leadership skills for technical teams',
      duration: 180,
      status: ModuleStatus.IN_PROGRESS as const,
      videoCount: 8,
      hasVirtualLab: false,
      category: SkillCategory.LEADERSHIP as const
    },
    {
      id: 'module3',
      title: 'Safety Management Systems',
      description: 'Comprehensive safety management in oil & gas operations',
      duration: 300,
      status: ModuleStatus.COMPLETED as const,
      videoCount: 15,
      hasVirtualLab: true,
      category: SkillCategory.SAFETY as const
    },
    {
      id: 'module4',
      title: 'Process Control Fundamentals',
      description: 'Learn the basics of process control systems and optimization',
      duration: 200,
      status: ModuleStatus.NOT_STARTED as const,
      videoCount: 10,
      hasVirtualLab: true,
      category: SkillCategory.TECHNICAL_COMPETENCY as const
    },
    {
      id: 'module5',
      title: 'Communication Skills for Engineers',
      description: 'Improve technical communication and presentation skills',
      duration: 120,
      status: ModuleStatus.NOT_STARTED as const,
      videoCount: 6,
      hasVirtualLab: false,
      category: SkillCategory.SOFT_SKILLS as const
    }
  ]
};

// Mock data for root component props
export const mockRootProps = {
  user: {
    id: 'user123',
    name: 'John Smith',
    email: 'john.smith@company.com',
    selectedDomain: ProfessionalDomain.INSTRUMENTATION_CONTROL as const,
    hasCompletedAssessment: true
  },
  currentAssessment: {
    id: 'assessment456',
    status: AssessmentStatus.COMPLETED as const,
    currentQuestion: 100,
    totalQuestions: 50,
    startedAt: '2024-01-15T09:00:00Z',
    completedAt: '2024-01-15T10:30:00Z'
  }
};