import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import CostsChart from '@/app/ui/dashboard/costs-chart';
import ProfitChart from '@/app/ui/dashboard/profit-chart';
import { montserrat } from '@/app/ui/fonts';
import {
    fetchRevenue,
    fetchCosts,
    fetchProfit,
    fetchTotalProfit,
    fetchTotalPayments,
    fetchTotalCollected,
    fetchTotalPending,
} from '@/app/lib/data';

export default async function Page() {
    const revenue = await fetchRevenue();
    const costs = await fetchCosts();
    const profit = await fetchProfit();

    const totalPayments = await fetchTotalPayments();
    const totalProfit = await fetchTotalProfit();
    const totalCollected = await fetchTotalCollected();
    const totalPending = await fetchTotalPending();
    return (
        <main>
            <h1 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
                Painel
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {<Card title="Faturação Total" value={"€" + totalPayments} type="gross" />}
                {<Card title="Lucro Total" value={"€" + totalProfit} type="profit" />}
                {<Card title="Total Coletado" value={"€" + totalCollected} type="collected" />}
                {<Card title="Total Pendente" value={"€" + totalPending} type="pending" />}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {<RevenueChart revenue={revenue} />}
                {<CostsChart costs={costs} />}
                {<ProfitChart profit={profit} />}
            </div>
        </main>
    );
}