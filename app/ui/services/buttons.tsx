'use client';

import { Pencil, PlusCircle, Trash2, Eye, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { deleteService } from '@/app/lib/actions';

export function CreateService() {
    return (
        <Link
            href="/dashboard/services/create"
            className="flex h-[42px] items-center rounded-md bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <span className="hidden md:block">Adicionar Serviço</span>{' '}
            <PlusCircle className="h-5 md:ml-2" />
        </Link>
    );
}

export function ViewService({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/services/${id}/view`}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <Eye className="h-4 w-4" />
        </Link>
    );
}

export function UpdateService({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/services/${id}/edit`}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <Pencil className="h-4 w-4" />
        </Link>
    );
}

export function DeleteService({ id }: { id: string }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteService(id);
            setShowConfirmDialog(false);
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setShowConfirmDialog(true)}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                <span className="sr-only">Delete</span>
                <Trash2 className="h-4 w-4" />
            </button>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Confirmar Remoção
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Tem certeza que deseja remover este serviço?
                                </p>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                            <p className="text-sm text-red-800">
                                <strong>Atenção:</strong> O serviço e todos os seus pagamentos associados serão permanentemente removidos.
                                Esta ação não pode ser desfeita.
                            </p>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirmDialog(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}