export interface Projects {
  [projectId: string]: Project;
}

export interface Project {
  id?: string;
  avatarUrl: string;
  coverImageUrl: string;
  attestationUid: string;
  approvalAttestationUid: string;
  name: string;
  description: string;
  externalLink: string;
  socialLinks: SocialLinks;
  team: Team[];
  repositories: string[];
  deployedContracts: DeployedContract[];
  categories: Category[];
  funding: Funding;
}

export interface SocialLinks {
  twitter: string;
  farcaster: string;
  mirror: string;
  website: string;
}

export interface Team {
  farcasterId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeployedContract {}

export interface Category {
  name: string;
  description: string;
}

export interface Funding {
  ventureCapital: VentureCapital[];
  grants: Grant[];
  optimismGrants: OptimismGrant[];
}

export interface VentureCapital {
  amount: string;
  source: string;
  date: string;
  details: string;
}

export interface Grant {
  amount: string;
  source: string;
  date: string;
  details: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OptimismGrant {}

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
