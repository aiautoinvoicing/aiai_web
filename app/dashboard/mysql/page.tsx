import React from 'react';
import { PrismaClient } from '@/prisma/generated/mysql-client';

const mysql = new PrismaClient();

export default async function Page() {
    const invoices = await mysql.invoices.findMany({ orderBy: { date: 'desc' } });

    return (
        <main className="p-6">
            <h1 className="text-2xl mb-4">Invoices (MySQL)</h1>
            <ul>
                {invoices.map((inv: any) => (
                    <li key={inv.id}>
                        {new Date(inv.date).toISOString().split('T')[0]} — ${inv.amount} — {inv.status}
                    </li>
                ))}
            </ul>
        </main>
    );
}