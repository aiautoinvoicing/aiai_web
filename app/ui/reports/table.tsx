// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchReports } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ReportsTable({
    currentPage,
    sortBy,
    sortOrder,
}: {
    currentPage: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}) {
    const { items, total_pages } = await fetchReports({
        page: currentPage,
        sortBy,
        sortOrder,
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
