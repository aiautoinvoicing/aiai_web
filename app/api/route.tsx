import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
    const invoices = await prisma.invoices.findMany({ orderBy: { date: 'desc' } });
        return NextResponse.json(invoices);
    } catch (err) {
        console.error('invoices-mysql error', err);
        return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
}