import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/mysql-client';

const mysql = new PrismaClient();

export async function GET() {
    try {
        const invoices = await mysql.invoices.findMany({ orderBy: { date: 'desc' } });
        return NextResponse.json(invoices);
    } catch (err) {
        console.error('invoices-mysql error', err);
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}