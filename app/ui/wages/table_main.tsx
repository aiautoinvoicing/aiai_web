// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchWages } from "@/app/lib/data";
import { DataTable } from "./table_data";
import { columns } from "./columns_wage";

export default async function WagesTable({
    currentPage,
}: {
    currentPage: number;
}) {

    const { items } = await fetchWages({
        page: currentPage,
    });

    return (
        <DataTable
            columns={columns}
            data={items}
        />
    );
}
