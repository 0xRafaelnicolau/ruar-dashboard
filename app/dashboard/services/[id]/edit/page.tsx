import Form from '@/app/ui/services/edit-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { ServiceFormSkeleton } from '@/app/ui/skeletons';
import { fetchCollaborators, fetchCustomers, fetchServiceAndPayments } from '@/app/lib/data';
import { Suspense } from 'react';

async function EditFormContent({ id }: { id: string }) {
    const [customers, collaborators, serviceAndPayments] = await Promise.all([
        fetchCustomers(),
        fetchCollaborators(),
        fetchServiceAndPayments(id),
    ]);

    return <Form customers={customers} collaborators={collaborators} serviceAndPayments={serviceAndPayments} />;
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Serviços', href: '/dashboard/services' },
                    {
                        label: 'Editar Serviço',
                        href: `/dashboard/services/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<ServiceFormSkeleton />}>
                <EditFormContent id={id} />
            </Suspense>
        </main>
    );
}