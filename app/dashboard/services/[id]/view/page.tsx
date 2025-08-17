import { montserrat } from '@/app/ui/fonts';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { fetchServiceAndPayments } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { UpdateService, DeleteService } from '@/app/ui/services/buttons';
import { ServiceViewSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import {
    Calendar,
    User,
    Mail,
    Euro,
    TrendingUp,
    TrendingDown,
    FileText,
    Video,
    Music,
    Megaphone,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';

async function ServiceViewContent({ id }: { id: string }) {
    const serviceAndPayments = await fetchServiceAndPayments(id);

    // Calculate financial metrics
    const incomingPayments = serviceAndPayments.payments.filter(p => p.type === 'incoming');
    const outgoingPayments = serviceAndPayments.payments.filter(p => p.type === 'outgoing');

    const grossAmount = incomingPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    const totalCosts = outgoingPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    const profit = grossAmount - totalCosts;
    const profitMargin = grossAmount > 0 ? (profit / grossAmount) * 100 : 0;

    const paidPayments = serviceAndPayments.payments.filter(p => p.status === 'paid');
    const pendingPayments = serviceAndPayments.payments.filter(p => p.status === 'pending');

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="h-5 w-5" />;
            case 'music': return <Music className="h-5 w-5" />;
            case 'marketing': return <Megaphone className="h-5 w-5" />;
            default: return <FileText className="h-5 w-5" />;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
            default: return <AlertCircle className="h-4 w-4 text-red-600" />;
        }
    };

    return (
        <main className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Serviços', href: '/dashboard/services' },
                    {
                        label: 'Detalhes do Serviço',
                        href: `/dashboard/services/${id}/view`,
                        active: true,
                    },
                ]}
            />

            {/* Header with actions */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    {getTypeIcon(serviceAndPayments.type)}
                    <h1 className={`${montserrat.className} text-2xl font-bold`}>
                        {serviceAndPayments.name}
                    </h1>
                </div>
                <div className="flex gap-2">
                    <UpdateService id={id} />
                    <DeleteService id={id} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Informações do Serviço
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Descrição</p>
                                <p className="text-black">{serviceAndPayments.description || 'Sem descrição'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Tipo</p>
                                    <span className="capitalize bg-gray-100 px-3 py-1 rounded-full text-sm inline-block">
                                        {serviceAndPayments.type}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">ID do Serviço</p>
                                    <p className="text-black font-mono text-sm">{serviceAndPayments.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Informações do Cliente
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-500" />
                                <span className="text-black">{serviceAndPayments.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="text-black">{serviceAndPayments.customer_email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Euro className="h-5 w-5" />
                            Histórico de Pagamentos
                        </h2>
                        {serviceAndPayments.payments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Descrição</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tipo</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceAndPayments.payments.map((payment) => (
                                            <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm text-black">
                                                    {formatDateToLocal(payment.date)}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-black">
                                                    {payment.description}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`capitalize px-2 py-1 rounded-full text-xs ${payment.type === 'incoming'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {payment.type === 'incoming' ? 'Receita' : 'Despesa'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(payment.status)}
                                                        <span className="capitalize text-sm">
                                                            {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span className={`font-medium whitespace-nowrap ${payment.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {payment.type === 'incoming' ? '+' : '-'}€{Number(payment.amount).toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">Nenhum pagamento registrado para este serviço.</p>
                        )}
                    </div>
                </div>

                {/* Financial Metrics Sidebar */}
                <div className="space-y-6">
                    {/* Financial Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Resumo Financeiro
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Receita Total</span>
                                <span className="text-sm font-semibold text-green-600">€{grossAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Custos Totais</span>
                                <span className="text-sm font-semibold text-red-600">€{totalCosts.toFixed(2)}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-black font-medium">Lucro</span>
                                <span className={`text-base font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    €{profit.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Margem de Lucro</span>
                                <span className={`text-sm font-semibold ${profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {profitMargin.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Estado dos Pagamentos
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pagamentos Realizados</span>
                                <span className="text-sm font-semibold text-black">{paidPayments.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pagamentos Pendentes</span>
                                <span className="text-sm font-semibold text-black">{pendingPayments.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total de Pagamentos</span>
                                <span className="text-sm font-semibold text-black">{serviceAndPayments.payments.length}</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </main>
    );
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    return (
        <Suspense fallback={<ServiceViewSkeleton />}>
            <ServiceViewContent id={id} />
        </Suspense>
    );
}
