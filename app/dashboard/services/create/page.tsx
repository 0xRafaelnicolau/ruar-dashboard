import Form from '@/app/ui/services/create-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { ServiceFormSkeleton } from '@/app/ui/skeletons';
import { fetchCollaborators, fetchCustomers } from '@/app/lib/data';
import { Suspense } from 'react';

async function CreateFormContent() {
    const customers = await fetchCustomers();
    const collaborators = await fetchCollaborators();

    return <Form customers={customers} collaborators={collaborators} />;
}

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Serviços', href: '/dashboard/services' },
                    {
                        label: 'Criar Serviço',
                        href: '/dashboard/services/create',
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<ServiceFormSkeleton />}>
                <CreateFormContent />
            </Suspense>
        </main>
    );
}