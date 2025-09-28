// import postgres from 'postgres';
import { PrismaClient } from '@/prisma/generated/mysql-client';
import { formatCurrency } from './utils';
import { Revenue } from './definitions';

const prisma = new PrismaClient();

export async function fetchLatestInvoicesPrisma() {
    try {
        const data = await prisma.invoices.findMany({
            select: {
                id: true,
                amount: true,
                customer: {
                    select: {
                        name: true,
                        image_url: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
            take: 5,
        });

        const latestInvoices = data.map((invoice) => ({
            id: invoice.id,
            name: invoice.customer.name,
            image_url: invoice.customer.image_url,
            email: invoice.customer.email,
            amount: formatCurrency(invoice.amount),
        }));

        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}



export async function fetchCardDataPrisma() {
    try {
        const [
            invoiceCount,
            customerCount,
            invoiceStatus,
        ] = await Promise.all([
            prisma.invoices.count(),
            prisma.customers.count(),
            prisma.invoices.groupBy({
                by: ['status'],
                _sum: {
                    amount: true,
                },
            }),
        ]);

        let totalPaidInvoices = 0;
        let totalPendingInvoices = 0;

        invoiceStatus.forEach((item) => {
            if (item.status === 'paid') totalPaidInvoices = item._sum.amount ?? 0;
            if (item.status === 'pending') totalPendingInvoices = item._sum.amount ?? 0;
        });

        return {
            numberOfInvoices: invoiceCount,
            numberOfCustomers: customerCount,
            totalPaidInvoices: formatCurrency(totalPaidInvoices),
            totalPendingInvoices: formatCurrency(totalPendingInvoices),
        };
    } catch (error) {
        console.error('Prisma Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}



export async function fetchRevenuePrisma(): Promise<Revenue[]> {
    try {
        // Fetch all revenue records
        const data = await prisma.revenue.findMany({
            orderBy: {
                month: 'asc', // optional, sort by month
            },
        });
        return data;
    } catch (error) {
        console.error('Prisma Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}