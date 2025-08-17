'use server';

import { redirect } from 'next/navigation';
import { PaymentFormData } from './definitions';
import postgres from 'postgres';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Validation schemas
const PaymentSchema = z.object({
    amount: z.number().min(0, 'Amount must be positive'),
    date: z.string().min(1, 'Date is required'),
    description: z.string().min(1, 'Description is required'),
    type: z.enum(['incoming', 'outgoing']),
    status: z.enum(['pending', 'paid']),
    collaborator_id: z.string().optional(),
});

const ServiceSchema = z.object({
    customerId: z.string().min(1, 'Customer is required'),
    name: z.string().min(1, 'Service name is required').max(255, 'Service name is too long'),
    description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
    type: z.enum(['video', 'music', 'marketing']),
    payments: z.array(PaymentSchema).optional().default([]),
});

export async function createService(formData: FormData) {
    const customerId = formData.get('customerId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const paymentsJson = formData.get('payments') as string;

    let payments: PaymentFormData[] = [];
    if (paymentsJson) {
        try {
            const parsedPayments = JSON.parse(paymentsJson);
            payments = parsedPayments.map((payment: any) => ({
                ...payment,
                amount: typeof payment.amount === 'string' ? parseFloat(payment.amount) || 0 : payment.amount,
            }));
        } catch (error) {
            console.error('Error parsing payments JSON:', error);
            payments = [];
        }
    }

    try {
        const validatedData = ServiceSchema.parse({
            customerId,
            name,
            description,
            type,
            payments,
        });

        await sql.begin(async (sql) => {
            const [service] = await sql`
                INSERT INTO services (customer_id, name, description, type)
                VALUES (${validatedData.customerId}, ${validatedData.name}, ${validatedData.description}, ${validatedData.type})
                RETURNING id
            `;

            if (validatedData.payments.length > 0) {
                await Promise.all(
                    validatedData.payments.map((payment) =>
                        sql`
                            INSERT INTO payments (service_id, collaborator_id, amount, date, description, type, status)
                            VALUES (${service.id}, ${payment.collaborator_id || null}, ${payment.amount}, ${payment.date}, ${payment.description}, ${payment.type}, ${payment.status})
                        `
                    )
                );
            }
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation errors:', error.issues);
            return {
                message: 'Validation failed',
                errors: error.issues.map((issue: any) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            };
        }

        console.error('Unexpected error:', error);
        return {
            message: 'Database Error: Failed to create a service.',
        };
    }

    revalidatePath('/dashboard/services');
    redirect('/dashboard/services');
}

export async function deleteService(id: string) {
    try {
        await sql.begin(async (sql) => {
            await sql`DELETE FROM payments WHERE service_id = ${id}`;

            await sql`DELETE FROM services WHERE id = ${id}`;
        });

        revalidatePath('/dashboard/services');
    } catch (error) {
        console.error('Error deleting service:', error);
        throw new Error('Failed to delete service and associated payments');
    }
}

export async function updateService(formData: FormData) {
    const id = formData.get('id') as string;
    const customerId = formData.get('customerId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as string;
    const paymentsJson = formData.get('payments') as string;

    let payments: PaymentFormData[] = [];
    if (paymentsJson) {
        try {
            const parsedPayments = JSON.parse(paymentsJson);
            payments = parsedPayments.map((payment: any) => ({
                ...payment,
                amount: typeof payment.amount === 'string' ? parseFloat(payment.amount) || 0 : payment.amount,
            }));
        } catch (error) {
            console.error('Error parsing payments JSON:', error);
            payments = [];
        }
    }

    try {
        const validatedData = ServiceSchema.parse({
            customerId,
            name,
            description,
            type,
            payments,
        });

        await sql.begin(async (sql) => {
            await sql`
                UPDATE services 
                SET customer_id = ${validatedData.customerId}, 
                    name = ${validatedData.name}, 
                    description = ${validatedData.description}, 
                    type = ${validatedData.type}
                WHERE id = ${id}
            `;

            await sql`DELETE FROM payments WHERE service_id = ${id}`;

            if (validatedData.payments.length > 0) {
                await Promise.all(
                    validatedData.payments.map((payment) =>
                        sql`
                            INSERT INTO payments (service_id, collaborator_id, amount, date, description, type, status)
                            VALUES (${id}, ${payment.collaborator_id || null}, ${payment.amount}, ${payment.date}, ${payment.description}, ${payment.type}, ${payment.status})
                        `
                    )
                );
            }
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation errors:', error.issues);
            return {
                message: 'Validation failed',
                errors: error.issues.map((issue: any) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))
            };
        }

        console.error('Unexpected error:', error);
        return {
            message: 'Database Error: Failed to update the service.',
        };
    }

    revalidatePath('/dashboard/services');
    redirect('/dashboard/services');
}