import { PortfolioData } from '@/lib/types';

interface HoldingsTableProps {
  holdings: PortfolioData['holdings'];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Ticker</th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Name</th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Shares</th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Value ($)</th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Gain/Loss (%)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr
              key={holding.ticker}
              className={`border-b dark:border-gray-700 ${
                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
              }`}
            >
              <td className="px-4 py-2 text-gray-900 dark:text-white">{holding.ticker}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-white">{holding.name}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-white">{holding.shares}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-white">{holding.value.toFixed(2)}</td>
              <td
                className={`px-4 py-2 ${
                  holding.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {holding.gainLoss.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}