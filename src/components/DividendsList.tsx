import { DividendData } from '@/lib/types';

interface DividendListProps {
  dividends: DividendData['upcoming'];
}

export function DividendList({ dividends }: DividendListProps) {
  return (
    <ul className="space-y-4">
      {dividends.map((dividend) => (
        <li key={`${dividend.ticker}-${dividend.date}`} className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{dividend.ticker}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{dividend.date}</p>
          </div>
          <p className="text-gray-900 dark:text-white">${dividend.amount.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  );
}