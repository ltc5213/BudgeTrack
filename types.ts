
export enum NavItem {
  BUDGET_COMPILATION = 'budget_compilation',
  EXPENSE_APPLICATION = 'expense_application',
  BUDGET_OCCUPANCY = 'budget_occupancy',
  BUDGET_ANALYSIS = 'budget_analysis',
  CONTROL_STRATEGY = 'control_strategy'
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  totalAmount: number;
  usedAmount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'archived';
}

export interface ExpenseApplication {
  id: string;
  date: string;
  budgetName: string;
  applicant: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Strategy {
  id: string;
  title: string;
  isActive: boolean;
  controlMethod: string;
  controlIntensity: string;
  scope: string;
  businessDocs: string[];
  indicators: string[];
  organization: string;
}
