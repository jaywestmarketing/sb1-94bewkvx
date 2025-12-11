export interface TestResult {
  id: string;
  url: string;
  instructions: string;
  status: 'passed' | 'failed' | 'running';
  steps: TestStep[];
  screenshot_url: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface TestStep {
  message: string;
  timestamp: string;
  status: 'running' | 'complete' | 'error';
}

export type NavigationView = 'new-test' | 'history' | 'schedule' | 'settings';
