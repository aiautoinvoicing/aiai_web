// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchWages } from "@/app/lib/data";
import { DataTable } from "./table_data";
import { columns } from "./columns";

export default async function WagesTable({
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

    const { items, total_pages } = await fetchWages({
        page: currentPage,
        sortBy,
        sortOrder,
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
