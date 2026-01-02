// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchReports } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ReportsTable({
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
        source: searchParams?.source,
        deal_stage: searchParams?.deal_stage,
        lead_owner: searchParams?.lead_owner,
    };

    const { items, total_pages } = await fetchReports({
        page: currentPage,
        sortBy,
        sortOrder,
        filters,
    });

    return (
        <DataTable
            columns={columns}
            data={items}
            pageCount={total_pages}
            manualPagination
            manualSorting
            manualFiltering
        />
    );
}
