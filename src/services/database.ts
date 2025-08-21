import { ProfessionalDomain, SkillCategory } from '../types/enums';
import {
  DatabaseQuestion,
  DatabaseUser,
  DatabaseAssessment,
  DatabaseLearningModule,
  DatabaseSimulator,
  DatabaseVideoModule,
  UserProgress,
  UserAchievement,
  QuestionsResponse,
  LearningContentResponse,
  UserProgressResponse,
} from '../types/database';

// Mock database service - In production, this would connect to a real database
class DatabaseService {
  // Questions API
  async getQuestionsByDomain(domain: ProfessionalDomain, limit = 100): Promise<QuestionsResponse> {
    // Mock implementation - would fetch from database
    const mockQuestions: DatabaseQuestion[] = Array.from({ length: 100 }, (_, index) => ({
      id: `q_${domain}_${index + 1}`,
      question: `${domain} Question ${index + 1}: What is the best practice for...?`,
      type: 'multiple_choice' as const,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: Math.floor(Math.random() * 4),
      category: Object.values(SkillCategory)[Math.floor(Math.random() * Object.values(SkillCategory).length)],
      domain,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
      explanation: `This is the explanation for question ${index + 1}`,
      tags: ['technical', 'safety', 'best-practices'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    return {
      questions: mockQuestions.slice(0, limit),
      total: mockQuestions.length,
      page: 1,
      pageSize: limit,
    };
  }

  async createAssessment(assessment: Omit<DatabaseAssessment, 'id' | 'createdAt'>): Promise<DatabaseAssessment> {
    const newAssessment: DatabaseAssessment = {
      ...assessment,
      id: `assessment_${Date.now()}`,
    };
    
    // Mock save to database
    console.log('Saving assessment to database:', newAssessment);
    return newAssessment;
  }

  async getLearningContent(domain: ProfessionalDomain, weaknesses: string[]): Promise<LearningContentResponse> {
    const mockModules: DatabaseLearningModule[] = [
      {
        id: 'module_plc_advanced',
        title: 'Advanced PLC Programming',
        description: 'Master advanced PLC programming techniques and troubleshooting',
        category: SkillCategory.TECHNICAL_COMPETENCY,
        domain,
        difficulty: 'advanced',
        duration: 240,
        videoCount: 12,
        hasVirtualLab: true,
        hasSimulator: true,
        prerequisites: ['module_plc_basics'],
        learningObjectives: [
          'Implement complex control logic',
          'Debug PLC programs effectively',
          'Optimize system performance'
        ],
        tags: ['plc', 'programming', 'automation'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'module_leadership',
        title: 'Technical Leadership Skills',
        description: 'Develop leadership skills for engineering teams',
        category: SkillCategory.LEADERSHIP,
        domain,
        difficulty: 'intermediate',
        duration: 180,
        videoCount: 8,
        hasVirtualLab: false,
        hasSimulator: false,
        prerequisites: [],
        learningObjectives: [
          'Lead technical teams effectively',
          'Manage project timelines',
          'Communicate technical concepts'
        ],
        tags: ['leadership', 'management', 'communication'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const mockSimulators: DatabaseSimulator[] = [
      {
        id: 'sim_process_control',
        name: 'Process Control Simulator',
        description: 'Interactive process control simulation for oil and gas operations',
        category: SkillCategory.TECHNICAL_COMPETENCY,
        domain,
        type: 'process_simulator',
        difficulty: 'intermediate',
        estimatedTime: 120,
        prerequisites: ['module_process_basics'],
        learningObjectives: [
          'Understand process dynamics',
          'Implement control strategies',
          'Handle emergency scenarios'
        ],
        thumbnailUrl: '/simulators/process-control-thumb.jpg',
        launchUrl: '/simulators/process-control',
        tags: ['process', 'control', 'simulation'],
      },
      {
        id: 'sim_safety_training',
        name: 'Safety Protocol VR Training',
        description: 'Virtual reality safety training for hazardous environments',
        category: SkillCategory.SAFETY,
        domain,
        type: 'safety_training',
        difficulty: 'beginner',
        estimatedTime: 90,
        prerequisites: [],
        learningObjectives: [
          'Identify safety hazards',
          'Follow emergency procedures',
          'Use safety equipment properly'
        ],
        thumbnailUrl: '/simulators/safety-vr-thumb.jpg',
        launchUrl: '/simulators/safety-vr',
        tags: ['safety', 'vr', 'emergency'],
      },
    ];

    const mockVideos: DatabaseVideoModule[] = [
      {
        id: 'video_plc_basics',
        title: 'PLC Fundamentals',
        description: 'Introduction to Programmable Logic Controllers',
        category: SkillCategory.TECHNICAL_COMPETENCY,
        domain,
        duration: 45,
        difficulty: 'beginner',
        videoUrl: '/videos/plc-fundamentals.mp4',
        thumbnailUrl: '/videos/plc-fundamentals-thumb.jpg',
        transcript: 'Video transcript content...',
        subtitles: ['en', 'es'],
        tags: ['plc', 'basics', 'automation'],
      },
    ];

    return {
      modules: mockModules,
      simulators: mockSimulators,
      videos: mockVideos,
      total: mockModules.length + mockSimulators.length + mockVideos.length,
    };
  }

  async getUserProgress(userId: string): Promise<UserProgressResponse> {
    const mockProgress: UserProgress[] = [
      {
        userId,
        moduleId: 'module_plc_advanced',
        status: 'in_progress' as const,
        progress: 65,
        startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        timeSpent: 120,
        lastAccessedAt: new Date().toISOString(),
      },
    ];

    const mockAchievements: UserAchievement[] = [
      {
        id: 'achievement_1',
        userId,
        type: 'assessment_completed',
        title: 'Assessment Master',
        description: 'Completed your first skills assessment',
        earnedAt: new Date().toISOString(),
      },
    ];

    return {
      progress: mockProgress,
      achievements: mockAchievements,
      overallProgress: {
        completedModules: 3,
        totalModules: 10,
        totalTimeSpent: 480,
        skillsImproved: ['PLC Programming', 'Safety Protocols'],
      },
    };
  }

  async updateUserProgress(userId: string, moduleId: string, progress: Partial<UserProgress>): Promise<UserProgress> {
    // Mock implementation
    const updatedProgress: UserProgress = {
      userId,
      moduleId,
      status: 'in_progress' as const,
      progress: 0,
      startedAt: new Date().toISOString(),
      timeSpent: 0,
      lastAccessedAt: new Date().toISOString(),
      ...progress,
    };

    console.log('Updating user progress:', updatedProgress);
    return updatedProgress;
  }
}

export const databaseService = new DatabaseService();