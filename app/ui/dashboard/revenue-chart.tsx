import { generateYAxis } from '@/app/lib/utils';
import { Calendar } from 'lucide-react';
import { montserrat } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

export default async function RevenueChart({
    revenue,
}: {
    revenue: Revenue[];
}) {
    const chartHeight = 308;

    const { yAxisLabels, topLabel } = generateYAxis(revenue);

    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-600">Sem dados disponíveis.</p>;
    }

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl text-gray-900`}>
                Faturação
            </h2>

            <div className="rounded-xl bg-white border border-gray-200 p-3 shadow-sm">
                <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-gray-50 p-3 md:gap-4">
                    <div
                        className="mb-6 hidden flex-col justify-between text-sm text-gray-600 sm:flex"
                        style={{ height: `${chartHeight}px` }}
                    >
                        {yAxisLabels.map((label) => (
                            <p key={label}>{label}</p>
                        ))}
                    </div>

                    {revenue.map((month) => (
                        <div key={month.month} className="flex flex-col items-center gap-2">
                            <div
                                className="w-full rounded-md bg-black shadow-sm"
                                style={{
                                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                                }}
                            ></div>
                            <p className="-rotate-90 text-sm text-gray-600 sm:rotate-0">
                                {month.month}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <Calendar className="h-5 w-5 text-gray-700" />
                    <h3 className="ml-2 text-sm text-gray-700">Últimos 12 meses</h3>
                </div>
            </div>
        </div>
    );
}