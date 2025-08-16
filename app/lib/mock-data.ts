const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Ron',
        email: 'rodrigo@gmail.com',
        password: '123456',
    },
    {
        id: '600524b2-4001-4271-1000-fec4b6a6442a',
        name: 'XZ',
        email: 'xz@gmail.com',
        password: '123456',
    },
    {
        id: '999544b2-8888-4271-9855-fec4b6a6442a',
        name: 'CBS',
        email: 'cbs@gmail.com',
        password: '123456',
    },
    {
        id: 'ab7577b2-4001-4271-9833-fec4b6a6442a',
        name: 'Saike',
        email: 'saike@gmail.com',
        password: '123456',
    },
    {
        id: '789044b2-4221-4231-9822-fec4b6a6442a',
        name: 'Street',
        email: 'street@gmail.com',
        password: '123456',
    },
];

const customers = [
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'Komet',
        email: 'komet@gmail.com',
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Snails',
        email: 'snails@gmail.com',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Policarpo',
        email: 'policarpo@gmail.com',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'Yvng',
        email: 'yvng@gmail.com',
    },
    {
        id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
        name: 'Quintasz',
        email: 'amy@burns.com',
    },
];

const invoices = [
    {
        customer_id: customers[0].id,
        amount: 500,
        status: 'pending',
        date: '2025-07-01',
    },
    {
        customer_id: customers[1].id,
        amount: 200,
        status: 'pending',
        date: '2025-07-03',
    },
    {
        customer_id: customers[4].id,
        amount: 300,
        status: 'paid',
        date: '2025-07-08',
    },
    {
        customer_id: customers[3].id,
        amount: 100,
        status: 'paid',
        date: '2025-07-12',
    },
    {
        customer_id: customers[2].id,
        amount: 200,
        status: 'pending',
        date: '2025-07-15',
    },
    {
        customer_id: customers[0].id,
        amount: 300,
        status: 'pending',
        date: '2025-07-21',
    },
    {
        customer_id: customers[3].id,
        amount: 800,
        status: 'paid',
        date: '2025-07-30',
    },
    {
        customer_id: customers[4].id,
        amount: 200,
        status: 'paid',
        date: '2025-08-03',
    },
    {
        customer_id: customers[1].id,
        amount: 100,
        status: 'paid',
        date: '2025-07-06',
    },
    {
        customer_id: customers[2].id,
        amount: 650,
        status: 'paid',
        date: '2025-07-09',
    },
];

const revenue = [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
    { month: 'Jul', revenue: 2400 },
    { month: 'Aug', revenue: 950 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 },
];

export { users, customers, invoices, revenue };