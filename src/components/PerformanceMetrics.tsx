import { PerformanceData } from '@/lib/types';

interface PerformanceMetricsProps {
  metrics: PerformanceData;
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { period: 'Weekly', data: metrics.weekly },
        { period: 'Monthly', data: metrics.monthly },
        { period: 'Yearly', data: metrics.yearly },
      ].map(({ period, data }) => (
        <div
          key={period}
          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{period}</h3>
          <p
            className={`text-2xl font-bold ${
              data.percentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {data.percentage.toFixed(2)}%
          </p>
          <p className="text-gray-600 dark:text-gray-400">${data.value.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}