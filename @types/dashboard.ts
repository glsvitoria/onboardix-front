export interface DashboardData {
  cards: {
    totalEmployees: number;
    avgProgress: string;
    completionRate: number;
  };
  charts: {
    taskDistribution: { name: string; value: number }[];
    recentActivity: { date: string; count: number }[];
  };
}

export interface OrganizationReport {
  totalEmployees: number;
  averageProgress: number;
  employees: {
    id: string;
    name: string;
    email: string;
    progress: string;
    progressValue: number;
    status: 'COMPLETED' | 'IN_PROGRESS';
  }[];
}