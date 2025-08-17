import Form from '@/app/ui/services/create-form';
import Breadcrumbs from '@/app/ui/services/breadcrumbs';
import { fetchCollaborators, fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    const customers = await fetchCustomers();
    const collaborators = await fetchCollaborators();

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
            <Form customers={customers} collaborators={collaborators} />
        </main>
    );
}