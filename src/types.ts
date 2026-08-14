export interface Topic {
  id: string;
  title: string;
  description: string;
  resources?: string[];
  tags?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  gradient: string;
  days: number;
  topics: Topic[];
}
