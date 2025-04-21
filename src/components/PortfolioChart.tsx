import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PortfolioData } from '@/lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PortfolioChartProps {
  data: PortfolioData['growth'];
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.values,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#4b5563' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4b5563' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}