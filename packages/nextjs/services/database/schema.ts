export interface GlobalScores {
  [date: string]: GlobalScoreDay;
}
export interface GlobalScoreDay {
  createdAt: string;
  metrics: GlobalScoreRecord[];
}

export interface GlobalScoreRecord {
  name: string;
  value: string;
}

export interface Projects {
  [projectId: string]: Project;
}

export interface Project {
  id: string;
  category: string;
  name: string;
  description: string;
  profileAvatarUrl: string;
  proejctCoverImageUrl: string; // Typo intentional (Agora has typo)
  socialLinks: SocialLinks;
  team: string[];
  github: string[];
  packages: any[];
  contracts: any[];
  grantsAndFunding: GrantsAndFunding;
}

export interface SocialLinks {
  twitter: string;
  farcaster: any[];
  mirror: any;
  website: string[];
}

export interface GrantsAndFunding {
  ventureFunding: any[];
  grants: Grant[];
  revenue: Revenue[];
}

export interface Grant {
  grant: string;
  link: string;
  amount: string;
  date: string;
  details: string;
}

export interface Revenue {
  amount: string;
  details: string;
}
export interface TotalsByDate {
  totalProjects: number;
  totalOverallScore: number;
  metrics: TotalsByDateMetrics;
}

export interface TotalsByDateMetrics {
  [metric: string]: number;
}

export interface ProjectTotalsByDate {
  isNew: boolean;
  overallScore: number;
  rank: number;
  rankChange: number;
  rankChangeWeek: number;
  rankChangeMonth: number;
  momentum: number;
  metrics: ProjectTotalsByDateMetrics;
}

export interface ProjectTotalsByDateMetrics {
  [metric: string]: ProjectTotalsByDateMetric;
}

export interface ProjectTotalsByDateMetric {
  score: number;
  rank: number;
  momentum: number;
}

export interface Metrics {
  [metricId: string]: Metric;
}

export interface Metric {
  name: string;
  description: string;
  weight: number;
}

export interface ETLLogs {
  [date: string]: ETLLog;
}

export interface ETLLog {
  complete: boolean;
  message: string;
}
