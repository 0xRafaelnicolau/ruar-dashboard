import Form from '@/app/ui/services/edit-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { fetchCollaborators, fetchCustomers, fetchServiceAndPayments } from '@/app/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const [customers, collaborators, serviceAndPayments] = await Promise.all([
        fetchCustomers(),
        fetchCollaborators(),
        fetchServiceAndPayments(id),
    ]);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Serviços', href: '/dashboard/services' },
                    {
                        label: 'Editar Serviço',
                        href: '/dashboard/services/${id}/edit',
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} collaborators={collaborators} serviceAndPayments={serviceAndPayments} />
        </main>
    );
}