const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
        >
            <div className="flex p-4">
                <div className="h-5 w-5 rounded-md bg-gray-200" />
                <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                <div className="h-7 w-20 rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

export function RevenueChartSkeleton() {
    return (
        <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="bg-white p-4 rounded-md">
                    <div className="h-[350px] bg-gray-100 rounded-md" />
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function CostsChartSkeleton() {
    return (
        <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="bg-white p-4 rounded-md">
                    <div className="h-[350px] bg-gray-100 rounded-md" />
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function ProfitChartSkeleton() {
    return (
        <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="bg-white p-4 rounded-md">
                    <div className="h-[350px] bg-gray-100 rounded-md" />
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export default function DashboardSkeleton() {
    return (
        <>
            <div
                className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChartSkeleton />
                <CostsChartSkeleton />
                <ProfitChartSkeleton />
            </div>
        </>
    );
}

export function ServicesMobileSkeleton() {
    return (
        <div className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between pb-4">
                <div>
                    <div className="mb-2 flex items-center">
                        {/* Service name - font-medium (larger text) */}
                        <div className={`${shimmer} relative h-5 w-32 rounded bg-gray-200`} />
                    </div>
                    {/* Customer name - text-sm text-gray-500 */}
                    <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200`} />
                    {/* Type - text-xs text-gray-400 capitalize */}
                    <div className={`${shimmer} relative mt-1 h-3 w-16 rounded bg-gray-200`} />
                </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
                <div>
                    {/* Amount - text-xl font-medium */}
                    <div className={`${shimmer} relative h-6 w-20 rounded bg-gray-200`} />
                    {/* Date - text-sm text-gray-500 */}
                    <div className={`${shimmer} relative mt-1 h-4 w-16 rounded bg-gray-200`} />
                </div>
                {/* Actions - three h-8 w-8 buttons with gap-2 */}
                <div className="flex justify-end gap-2">
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                </div>
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <tr className="w-full py-3 text-sm [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Service Column - w-1/4 */}
            <td className="py-3 px-6 w-1/4">
                <div className="flex flex-col min-w-0">
                    {/* Service name - font-medium */}
                    <div className={`${shimmer} relative h-5 w-32 rounded bg-gray-200 max-w-[200px] leading-tight`} />
                    {/* Description - text-xs text-gray-500 */}
                    <div className={`${shimmer} relative mt-1 h-3 w-24 rounded bg-gray-200 max-w-[200px] leading-tight`} />
                </div>
            </td>
            {/* Customer Column - w-1/6 */}
            <td className="py-3 px-6 w-1/6">
                <div className={`${shimmer} relative h-5 w-20 rounded bg-gray-200 leading-tight inline-block`} />
            </td>
            {/* Type Column - w-1/6 */}
            <td className="py-3 px-6 w-1/6">
                {/* Type badge - text-xs with px-3 py-1 padding, rounded-full, bg-gray-100 */}
                <div className={`${shimmer} relative h-6 w-16 rounded-full bg-gray-200 px-3 py-1 leading-tight inline-block`} />
            </td>
            {/* Value Column - w-1/6 */}
            <td className="py-3 px-6 w-1/6">
                {/* Value - font-medium */}
                <div className={`${shimmer} relative h-5 w-16 rounded bg-gray-200 leading-tight inline-block`} />
            </td>
            {/* Date Column - w-1/6 */}
            <td className="py-3 px-6 w-1/6">
                {/* Date - text-gray-500 */}
                <div className={`${shimmer} relative h-5 w-20 rounded bg-gray-200 leading-tight inline-block`} />
            </td>
            {/* Actions Column - w-1/6 */}
            <td className="py-3 px-6 w-1/6">
                {/* Three h-8 w-8 buttons with gap-3 */}
                <div className="flex justify-end gap-3">
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                </div>
            </td>
        </tr>
    );
}

export function ServicesTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                        <ServicesMobileSkeleton />
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table table-fixed">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="w-1/4 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-16 rounded bg-gray-200`} />
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-12 rounded bg-gray-200`} />
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-10 rounded bg-gray-200`} />
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                                </th>
                                <th scope="col" className="w-1/6 px-6 py-5 font-medium">
                                    <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                            <TableRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}