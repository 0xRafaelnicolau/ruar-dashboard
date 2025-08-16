import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { montserrat } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

export default async function LatestInvoices({
    latestInvoices,
}: {
    latestInvoices: LatestInvoice[];
}) {
    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl text-gray-900`}>
                Pagamentos
            </h2>
            <div className="rounded-xl bg-white border border-gray-200 p-3 shadow-sm">
                <div className="bg-gray-50 rounded-md p-3">
                    {latestInvoices.map((invoice, i) => {
                        return (
                            <div
                                key={invoice.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    {
                                        'border-t border-gray-200': i !== 0,
                                    },
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="mr-4 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {invoice.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base text-gray-900">
                                            {invoice.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {invoice.email}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className={`${montserrat.className} truncate text-sm font-medium md:text-base text-gray-900`}
                                >
                                    {invoice.amount}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}