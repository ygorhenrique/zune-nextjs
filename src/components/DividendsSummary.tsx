import { DividendData } from '@/lib/types';

interface DividendSummaryProps {
  summary: DividendData['received'];
}

export function DividendSummary({ summary }: DividendSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">Weekly</span>
        <span className="font-semibold text-gray-900 dark:text-white">${summary.weekly.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">Monthly</span>
        <span className="font-semibold text-gray-900 dark:text-white">${summary.monthly.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">Yearly</span>
        <span className="font-semibold text-gray-900 dark:text-white">${summary.yearly.toFixed(2)}</span>
      </div>
    </div>
  );
}