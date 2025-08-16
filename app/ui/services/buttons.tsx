import { Pencil, PlusCircle, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

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

export function ViewPayments({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/services/payments`}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <Eye className="h-4 w-4" />
        </Link>
    );
}

export function UpdateService({ id }: { id: string }) {
    return (
        <Link
            href="/dashboard/services"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <Pencil className="h-4 w-4" />
        </Link>
    );
}

export function DeleteService({ id }: { id: string }) {
    return (
        <>
            <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                <span className="sr-only">Delete</span>
                <Trash2 className="h-4 w-4" />
            </button>
        </>
    );
}