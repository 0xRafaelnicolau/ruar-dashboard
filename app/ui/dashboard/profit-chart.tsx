'use client';

import { Calendar } from 'lucide-react';
import { montserrat } from '@/app/ui/fonts';
import { Profit } from '@/app/lib/definitions';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ProfitChartProps {
    profit: Profit[];
}

export default function ProfitChart({ profit }: ProfitChartProps) {
    if (!profit || profit.length === 0) {
        return <p className="mt-4 text-black">No data available.</p>;
    }

    const data = {
        labels: profit.map(month => month.month),
        datasets: [
            {
                label: 'Profit',
                data: profit.map(month => month.profit),
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 0,
                borderRadius: 4,
                hoverBackgroundColor: '#374151',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'black',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                callbacks: {
                    label: function (context: any) {
                        return `€${context.parsed.y.toLocaleString()}`;
                    }
                }
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'black',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                display: true,
                grid: {
                    color: '#e5e7eb',
                    borderColor: '#e5e7eb',
                },
                ticks: {
                    color: 'black',
                    font: {
                        size: 12,
                    },
                    callback: function (value: any) {
                        return `€${(value / 1000).toFixed(0)}K`;
                    }
                },
            },
        },
    };

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl text-black`}>
                Lucros
            </h2>
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="bg-white p-4 rounded-md">
                    <div style={{ height: '350px' }}>
                        <Bar data={data} options={options} />
                    </div>
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <Calendar className="h-5 w-5 text-black" />
                    <h3 className="ml-2 text-sm text-black">Últimos 12 meses</h3>
                </div>
            </div>
        </div>
    );
}