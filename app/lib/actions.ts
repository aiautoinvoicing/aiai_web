'use server';
import { z } from 'zod';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}







export async function uploadReports(formData: FormData) {
    const file = formData.get('file');
    const customerId = formData.get('customerId');

    if (!(file instanceof File)) {
        throw new Error('File is required');
    }

    if (typeof customerId !== 'string' || !customerId) {
        throw new Error('Customer is required');
    }

    // Compose multipart/form-data for backend
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const response = await fetch('http://localhost:8008/reports/upload', {
        method: 'POST',
        headers: {
            accept: 'application/json',
        },
        body: uploadFormData,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Report upload failed: ${text}`);
    }

    const result = await response.json();

    /**
     * At this point you have:
     * - customerId (from your app)
     * - result (from reports service)
     *
     * This is where you would later:
     * - persist the association
     * - trigger processing
     * - enqueue background jobs
     */

    return result;
}
