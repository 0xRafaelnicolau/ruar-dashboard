/*//////////////////////////////////////////////////////////////
                        COLLABORATOR
//////////////////////////////////////////////////////////////*/

const collaborators = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Ron',
        email: 'rodrigo@gmail.com',
        phone: '+351 914 399 346',
        password: '123456',
    },
    {
        id: '600524b2-4001-4271-1000-fec4b6a6442a',
        name: 'XZ',
        email: 'xz@gmail.com',
        phone: '+351 925 123 456',
        password: '123456',
    },
    {
        id: '999544b2-8888-4271-9855-fec4b6a6442a',
        name: 'CBS',
        email: 'cbs@gmail.com',
        phone: '+351 936 789 012',
        password: '123456',
    },
    {
        id: 'ab7577b2-4001-4271-9833-fec4b6a6442a',
        name: 'Saike',
        email: 'saike@gmail.com',
        phone: '+351 947 345 678',
        password: '123456',
    },
    {
        id: '789044b2-4221-4231-9822-fec4b6a6442a',
        name: 'Street',
        email: 'street@gmail.com',
        phone: '+351 958 901 234',
        password: '123456',
    },
    {
        id: 'cd7577b4-4001-4271-9833-fec4b6a6442a',
        name: 'Flor',
        email: 'flor@gmail.com',
        phone: '+351 969 567 890',
        password: '123456',
    },
];

/*//////////////////////////////////////////////////////////////
                        CUSTOMER
//////////////////////////////////////////////////////////////*/

const customers = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'Komet',
        email: 'komet@gmail.com',
        phone: '+351 911 111 111',
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Snails',
        email: 'snails@gmail.com',
        phone: '+351 922 222 222',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Policarpo',
        email: 'policarpo@gmail.com',
        phone: '+351 933 333 333',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'Yvng',
        email: 'yvng@gmail.com',
        phone: '+351 944 444 444',
    },
    {
        id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
        name: 'Quintasz',
        email: 'quintasz@gmail.com',
        phone: '+351 955 555 555',
    },
];

/*//////////////////////////////////////////////////////////////
                        SERVICE
//////////////////////////////////////////////////////////////*/

const services = [
    {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        customer_id: customers[0].id,
        name: 'Videoclip Komet',
        description: 'Videoclip da música Longe',
        type: 'video',
    },
    {
        id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
        customer_id: customers[1].id,
        name: 'Mix/Master + Beat Snails',
        description: 'Full Mix/Master + Beat',
        type: 'music',
    },
];

/*//////////////////////////////////////////////////////////////
                        PAYMENT
//////////////////////////////////////////////////////////////*/

const payments = [
    {
        id: 'a0a1b2c3-d4e5-6789-abcd-ef1234567890',
        service_id: services[0].id,
        amount: 1000,
        date: '2025-07-01',
        type: 'incoming',
        description: '1º terço do pagamento',
        status: 'paid',
    },
    {
        id: 'b2b3c4d5-e6f7-8901-bcde-f23456789012',
        service_id: services[0].id,
        amount: 750,
        date: '2025-07-07',
        type: 'incoming',
        description: '2º terço do pagamento',
        status: 'paid',
    },
    {
        id: 'c3c4d5e6-f7a8-9012-cdef-345678901234',
        service_id: services[0].id,
        amount: 750,
        date: '2025-07-15',
        type: 'incoming',
        description: '3º terço do pagamento',
        status: 'paid',
    },
    {
        id: 'd1b3c4d5-e6f7-8901-bcde-f23456789012',
        service_id: services[0].id,
        amount: 500,
        date: '2025-07-01',
        type: 'outgoing',
        description: 'Custos de produção',
        status: 'paid',
    },
    {
        id: 'c2b3c4d5-e6f7-8901-bcde-f23456789012',
        service_id: services[0].id,
        collaborator_id: collaborators[0].id, // Ron
        amount: 1000,
        date: '2025-07-01',
        type: 'outgoing',
        description: 'Pagamento Ron',
        status: 'paid',
    },
    {
        id: 'd3c4d5e6-f7a8-9012-cdef-345678901234',
        service_id: services[0].id,
        collaborator_id: collaborators[5].id, // Flor
        amount: 250,
        date: '2025-07-15',
        type: 'outgoing',
        description: 'Pagamento Flor',
        status: 'paid',
    },
    {
        id: 'd4d5e6f7-a8b9-0123-defa-456789012345',
        service_id: services[1].id,
        amount: 100,
        date: '2025-07-20',
        description: 'Pagamento 1º terço',
        type: 'incoming',
        status: 'paid',
    },
    {
        id: 'e5e6f7a8-b9c0-1234-efab-567890123456',
        service_id: services[1].id,
        amount: 100,
        date: '2025-08-05',
        description: 'Pagamento 2º terço',
        type: 'incoming',
        status: 'paid',
    },
    {
        id: 'f6f7a8b9-c0d1-2345-fabc-678901234567',
        service_id: services[1].id,
        amount: 100,
        date: '2025-08-20',
        description: 'Pagamento 3º terço',
        type: 'incoming',
        status: 'pending',
    },
    {
        id: 'f3c4d5e6-f7a8-9012-cdef-345678901234',
        service_id: services[1].id,
        collaborator_id: collaborators[2].id, // CBS
        amount: 200,
        date: '2025-07-15',
        description: 'Pagamento CBS',
        type: 'outgoing',
        status: 'paid',
    },
];

export { collaborators, customers, services, payments }; 