// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchDividends } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function DivTable({
    currentPage,
    sortBy,
    sortOrder,
    searchParams,
}: {
    currentPage: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    searchParams?: Record<string, string | undefined>;
}) {

    const filters = {
        company_name: searchParams?.company_name,
    };

    const  items = await fetchDividends({
        page: currentPage,
        sortBy,
        sortOrder,
        filters,
    });

    return (
        <DataTable
            columns={columns}
            data={items}
            // pageCount={total_pages}
            // manualPagination
            // manualSorting
            // manualFiltering
        />
    );
}
