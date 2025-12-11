import { supabase } from '../lib/supabase';
import type { TestResult, TestStep } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SIMULATION_STEPS = [
  'Initializing Browser...',
  'Navigating to URL...',
  'Analyzing DOM elements...',
  'Executing test instructions...',
  'Verifying results...',
];

export async function runTestSimulation(
  url: string,
  instructions: string,
  onUpdate: (testResult: TestResult) => void
): Promise<TestResult> {
  const testId = crypto.randomUUID();
  const steps: TestStep[] = [];

  let testResult: TestResult = {
    id: testId,
    url,
    instructions,
    status: 'running',
    steps,
    screenshot_url: null,
    created_at: new Date().toISOString(),
    completed_at: null,
  };

  await supabase.from('test_results').insert({
    id: testId,
    url,
    instructions,
    status: 'running',
    steps: [],
  });

  for (let i = 0; i < SIMULATION_STEPS.length; i++) {
    const step: TestStep = {
      message: SIMULATION_STEPS[i],
      timestamp: new Date().toISOString(),
      status: 'running',
    };

    steps.push(step);
    testResult = { ...testResult, steps: [...steps] };
    onUpdate(testResult);

    await delay(2000);

    steps[i].status = 'complete';
    testResult = { ...testResult, steps: [...steps] };
    onUpdate(testResult);
  }

  const successStep: TestStep = {
    message: 'Test completed successfully!',
    timestamp: new Date().toISOString(),
    status: 'complete',
  };

  steps.push(successStep);

  const finalStatus = Math.random() > 0.2 ? 'passed' : 'failed';
  const completedAt = new Date().toISOString();

  testResult = {
    ...testResult,
    steps: [...steps],
    status: finalStatus,
    completed_at: completedAt,
    screenshot_url: `https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800`,
  };

  await supabase
    .from('test_results')
    .update({
      status: finalStatus,
      steps: steps,
      completed_at: completedAt,
      screenshot_url: testResult.screenshot_url,
    })
    .eq('id', testId);

  onUpdate(testResult);

  return testResult;
}
