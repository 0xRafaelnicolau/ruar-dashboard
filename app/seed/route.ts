import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { managers, customers, services, payments } from '../lib/mock-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedManagers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS managers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL
    );
  `;

  const insertedManagers = await Promise.all(
    managers.map(async (manager) => {
      const hashedPassword = await bcrypt.hash(manager.password, 10);
      return sql`
        INSERT INTO managers (id, name, email, password, phone)
        VALUES (${manager.id}, ${manager.name}, ${manager.email}, ${hashedPassword}, ${manager.phone})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedManagers;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, phone)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.phone})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedServices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      manager_id UUID NOT NULL,
      customer_id UUID NOT NULL,
      collaborator_id TEXT[] NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      type VARCHAR(50) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      costs DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (manager_id) REFERENCES managers(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `;

  const insertedServices = await Promise.all(
    services.map(
      (service) => sql`
        INSERT INTO services (id, manager_id, customer_id, collaborator_id, name, description, type, price, costs)
        VALUES (${service.id}, ${service.manager_id}, ${service.customer_id}, ${service.collaborator_id}, ${service.name}, ${service.description}, ${service.type}, ${service.price}, ${service.costs})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedServices;
}

async function seedPayments() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      service_id UUID NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      date DATE NOT NULL,
      description TEXT,
      type VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL,
      FOREIGN KEY (service_id) REFERENCES services(id)
    );
  `;

  const insertedPayments = await Promise.all(
    payments.map(
      (payment) => sql`
        INSERT INTO payments (id, service_id, amount, date, description, type, status)
        VALUES (${payment.id}, ${payment.service_id}, ${payment.amount}, ${payment.date}, ${payment.description || null}, ${payment.type}, ${payment.status})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPayments;
}

export async function GET() {
  try {
    // Seed tables in order to respect foreign key dependencies
    await seedManagers();
    await seedCustomers();
    await seedServices();
    await seedPayments();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
