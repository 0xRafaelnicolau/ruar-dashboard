'use client';

import { CustomerField, CollaboratorField, PaymentFormData, ServiceWithPayments } from '@/app/lib/definitions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    User,
    FileText,
    Tag,
    AlignLeft,
    Plus,
    Minus,
    Euro,
    Calendar,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
} from 'lucide-react';
import { Button } from '@/app/ui/button';
import { updateService } from '@/app/lib/actions';

export default function Form({
    customers,
    collaborators,
    serviceAndPayments
}: {
    customers: CustomerField[];
    collaborators: CollaboratorField[];
    serviceAndPayments: ServiceWithPayments;
}) {
    const [payments, setPayments] = useState<PaymentFormData[]>([]);

    // Initialize payments from the existing service data
    useEffect(() => {
        if (serviceAndPayments.payments) {
            const initialPayments: PaymentFormData[] = serviceAndPayments.payments.map(payment => ({
                amount: payment.amount,
                date: payment.date,
                description: payment.description,
                type: payment.type,
                status: payment.status,
                collaborator_id: payment.collaborator_id || '',
            }));
            setPayments(initialPayments);
        }
    }, [serviceAndPayments.payments]);

    const addPayment = () => {
        const newPayment: PaymentFormData = {
            amount: 0,
            date: new Date().toISOString().split('T')[0],
            description: '',
            type: 'incoming',
            status: 'pending',
            collaborator_id: '',
        };
        setPayments([...payments, newPayment]);
    };

    const removePayment = (index: number) => {
        setPayments(payments.filter((_, i) => i !== index));
    };

    const updatePayment = (index: number, field: keyof PaymentFormData, value: any) => {
        setPayments(payments.map((payment, i) =>
            i === index ? { ...payment, [field]: value } : payment
        ));
    };

    const handleSubmit = async (formData: FormData) => {
        // Add service ID and payments data to form data
        formData.append('id', serviceAndPayments.id);
        formData.append('payments', JSON.stringify(payments));

        // Call the server action
        await updateService(formData);
    };

    return (
        <form action={handleSubmit}>
            <div className="space-y-6">
                {/* Customer Name */}
                <div>
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium text-black">
                        Cliente
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                            defaultValue={serviceAndPayments.customer_id}
                            required
                        >
                            <option value="" disabled>
                                Selecione o cliente
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                    </div>
                </div>

                {/* Service Name */}
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-black">
                        Nome do Serviço
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Introduza o nome do serviço"
                            className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                            defaultValue={serviceAndPayments.name}
                            required
                        />
                        <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                    </div>
                </div>

                {/* Service Description */}
                <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-black">
                        Descrição
                    </label>
                    <div className="relative">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Introduza a descrição do serviço"
                            className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                            defaultValue={serviceAndPayments.description}
                            required
                        />
                        <AlignLeft className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                    </div>
                </div>

                {/* Service Type */}
                <div>
                    <label htmlFor="type" className="mb-2 block text-sm font-medium text-black">
                        Tipo de Serviço
                    </label>
                    <div className="relative">
                        <select
                            id="type"
                            name="type"
                            className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                            defaultValue={serviceAndPayments.type}
                            required
                        >
                            <option value="" disabled>
                                Selecione o tipo de serviço
                            </option>
                            <option value="video">Vídeo</option>
                            <option value="music">Música</option>
                            <option value="marketing">Marketing</option>
                        </select>
                        <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                    </div>
                </div>

                {/* Payments Section */}
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">
                            Pagamentos
                        </label>
                    </div>

                    <div className="space-y-4">
                        {payments.map((payment, index) => (
                            <div key={index} className="rounded-lg border border-gray-300 bg-white p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-gray-700">
                                        Pagamento {index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removePayment(index)}
                                        className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-600 transition-colors duration-200 hover:bg-red-200"
                                    >
                                        <Minus className="h-3 w-3" />
                                        Remover
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Amount */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Valor
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={payment.amount}
                                                onChange={(e) => updatePayment(index, 'amount', parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            />
                                            <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Data
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={payment.date}
                                                onChange={(e) => updatePayment(index, 'date', e.target.value)}
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            />
                                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Tipo
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={payment.type}
                                                onChange={(e) => updatePayment(index, 'type', e.target.value as 'incoming' | 'outgoing')}
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            >
                                                <option value="incoming">Entrada</option>
                                                <option value="outgoing">Saída</option>
                                            </select>
                                            {payment.type === 'incoming' ? (
                                                <ArrowUpRight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                            ) : (
                                                <ArrowDownRight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Status
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={payment.status}
                                                onChange={(e) => updatePayment(index, 'status', e.target.value as 'pending' | 'paid')}
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            >
                                                <option value="pending">Pendente</option>
                                                <option value="paid">Pago</option>
                                            </select>
                                            {payment.status === 'pending' ? (
                                                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                            ) : (
                                                <CheckCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Collaborator */}
                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Colaborador (opcional)
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={payment.collaborator_id || ''}
                                                onChange={(e) => updatePayment(index, 'collaborator_id', e.target.value || undefined)}
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            >
                                                <option value="">Sem colaborador</option>
                                                {collaborators.map((collaborator) => (
                                                    <option key={collaborator.id} value={collaborator.id}>
                                                        {collaborator.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label className="mb-1 block text-xs font-medium text-gray-700">
                                            Descrição
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={payment.description}
                                                onChange={(e) => updatePayment(index, 'description', e.target.value)}
                                                placeholder="Descrição do pagamento"
                                                className="peer block w-full h-[42px] rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-0"
                                            />
                                            <AlignLeft className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 peer-focus:text-black peer-hover:text-gray-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Payment Button */}
                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            onClick={addPayment}
                            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
                <Link
                    href="/dashboard/services"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200"
                >
                    Cancelar
                </Link>
                <Button type="submit">Atualizar Serviço</Button>
            </div>
        </form>
    );
}
