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
                    <table className="hidden min-w-full text-black md:table table-fixed">
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

export function ServiceViewSkeleton() {
    return (
        <main className="w-full">
            {/* Breadcrumbs skeleton */}
            <nav className="mb-6 block">
                <div className="flex text-xl md:text-2xl">
                    <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-200`} />
                    <span className="mx-3">/</span>
                    <div className={`${shimmer} relative h-6 w-32 rounded bg-gray-200`} />
                </div>
            </nav>

            {/* Header with actions skeleton */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                    <div className={`${shimmer} relative h-8 w-48 rounded bg-gray-200`} />
                </div>
                <div className="flex gap-2">
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                    <div className={`${shimmer} relative h-8 w-8 rounded-md bg-gray-200`} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Details - Left side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Information Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-40 rounded bg-gray-200`} />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200 mb-1`} />
                                <div className={`${shimmer} relative h-5 w-64 rounded bg-gray-200`} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200 mb-1`} />
                                    <div className={`${shimmer} relative h-6 w-20 rounded-full bg-gray-200`} />
                                </div>
                                <div>
                                    <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200 mb-1`} />
                                    <div className={`${shimmer} relative h-5 w-48 rounded bg-gray-200`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-40 rounded bg-gray-200`} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className={`${shimmer} relative h-4 w-4 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-32 rounded bg-gray-200`} />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`${shimmer} relative h-4 w-4 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-40 rounded bg-gray-200`} />
                            </div>
                        </div>
                    </div>

                    {/* Payments Table Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-40 rounded bg-gray-200`} />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4">
                                            <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200`} />
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200`} />
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className={`${shimmer} relative h-4 w-16 rounded bg-gray-200`} />
                                        </th>
                                        <th className="text-right py-3 px-4">
                                            <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200`} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i} className="border-b border-gray-100">
                                            <td className="py-3 px-4">
                                                <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className={`${shimmer} relative h-4 w-32 rounded bg-gray-200`} />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className={`${shimmer} relative h-6 w-16 rounded-full bg-gray-200`} />
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`${shimmer} relative h-4 w-4 rounded bg-gray-200`} />
                                                    <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200`} />
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className={`${shimmer} relative h-4 w-16 rounded bg-gray-200 ml-auto`} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Financial Metrics Sidebar - Right side */}
                <div className="space-y-6">
                    {/* Financial Summary Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-32 rounded bg-gray-200`} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-20 rounded bg-gray-200`} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-20 rounded bg-gray-200`} />
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-200`} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-28 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-12 rounded bg-gray-200`} />
                            </div>
                        </div>
                    </div>

                    {/* Payment Status Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-32 rounded bg-gray-200`} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-32 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-32 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className={`${shimmer} relative h-4 w-28 rounded bg-gray-200`} />
                                <div className={`${shimmer} relative h-5 w-8 rounded bg-gray-200`} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`${shimmer} relative h-5 w-5 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-32 rounded bg-gray-200`} />
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className={`${shimmer} relative h-4 w-28 rounded bg-gray-200 mb-1`} />
                                <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                            </div>
                            <div>
                                <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200 mb-1`} />
                                <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                            </div>
                            <div>
                                <div className={`${shimmer} relative h-4 w-32 rounded bg-gray-200 mb-1`} />
                                <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export function ServiceFormSkeleton() {
    return (
        <div className="space-y-6">
            {/* Customer Name */}
            <div>
                <div className={`${shimmer} relative h-4 w-12 rounded bg-gray-200 mb-2`} />
                <div className="relative">
                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                    <div className={`${shimmer} absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                </div>
            </div>

            {/* Service Name */}
            <div>
                <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200 mb-2`} />
                <div className="relative">
                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                    <div className={`${shimmer} absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                </div>
            </div>

            {/* Service Description */}
            <div>
                <div className={`${shimmer} relative h-4 w-16 rounded bg-gray-200 mb-2`} />
                <div className="relative">
                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                    <div className={`${shimmer} absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                </div>
            </div>

            {/* Service Type */}
            <div>
                <div className={`${shimmer} relative h-4 w-24 rounded bg-gray-200 mb-2`} />
                <div className="relative">
                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                    <div className={`${shimmer} absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                </div>
            </div>

            {/* Payments Section */}
            <div>
                <div className="mb-4">
                    <div className={`${shimmer} relative h-4 w-16 rounded bg-gray-200`} />
                </div>

                <div className="space-y-4">
                    {/* Payment Card 1 */}
                    <div className="rounded-lg border border-gray-300 bg-white p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-200`} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Amount */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Collaborator */}
                            <div className="md:col-span-2">
                                <div className={`${shimmer} relative h-3 w-24 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <div className={`${shimmer} relative h-3 w-16 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Card 2 */}
                    <div className="rounded-lg border border-gray-300 bg-white p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${shimmer} relative h-4 w-20 rounded bg-gray-200`} />
                            <div className={`${shimmer} relative h-6 w-16 rounded bg-gray-200`} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Amount */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <div className={`${shimmer} relative h-3 w-8 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Collaborator */}
                            <div className="md:col-span-2">
                                <div className={`${shimmer} relative h-3 w-24 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <div className={`${shimmer} relative h-3 w-16 rounded bg-gray-200 mb-1`} />
                                <div className="relative">
                                    <div className={`${shimmer} relative h-[42px] w-full rounded-lg bg-gray-200`} />
                                    <div className={`${shimmer} absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-gray-300`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Payment Button */}
                <div className="mt-4 flex justify-center">
                    <div className={`${shimmer} relative h-10 w-32 rounded-lg bg-gray-200`} />
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end gap-4">
                <div className={`${shimmer} relative h-10 w-20 rounded-lg bg-gray-200`} />
                <div className={`${shimmer} relative h-10 w-32 rounded-lg bg-gray-200`} />
            </div>
        </div>
    );
}