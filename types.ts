
export interface UserProfile {
  name: string;
  careerStage: 'early' | 'mid' | 'returner' | 'switcher';
  industry: string;
  goals: string[];
  bio: string;
}

export interface RoadmapStep {
  week: number;
  title: string;
  tasks: string[];
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Artifact {
  id: string;
  type: 'resume' | 'linkedin' | 'portfolio';
  title: string;
  content: string;
  lastUpdated: Date;
}
