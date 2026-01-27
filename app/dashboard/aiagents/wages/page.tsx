export const dynamic = "force-dynamic";

import { Ask } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchWages } from "@/app/lib/data";
import { Metadata } from 'next';
import WagesTable from '@/app/ui/wages/table_main';
import Pagination from "@/app/ui/wages/pagination";

export const metadata: Metadata = {
    title: 'Canada Wages | invoAIce Dashboard',
};


export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        sort_by?: string;
        sort_order?: "asc" | "desc";
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const sortBy = searchParams?.sort_by;
    const sortOrder = searchParams?.sort_order;
    const { total_pages } = await fetchWages({
        page: currentPage,
    });

    return (
        <div className="w-full">
            <div className="flex w-full items-center gap-4">
                <h1 className={`${lusitana.className} text-2xl`}>Canada Wage Report (2025) </h1>
                <Ask />
            </div>

            
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>

                <WagesTable
                    key={`${currentPage}-${sortBy}-${sortOrder}`} // 🔑 forces refresh
                    currentPage={currentPage}
                />
                <Pagination totalPages={total_pages} />

            </Suspense>
        </div>
    );
}