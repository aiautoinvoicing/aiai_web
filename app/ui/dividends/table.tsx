// app/ui/reports/table.tsx  (SERVER COMPONENT)

import { fetchDividends } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function DivTable({
    currentPage,
}: {
    currentPage: number;
}) {


    const items = (await fetchDividends({
        page: currentPage,
    })).sort((a:any, b:any) =>
        new Date(a.dividend_ex_date).getTime() -
        new Date(b.dividend_ex_date).getTime()
    );

    return (
        <DataTable
            columns={columns}
            data={items}
        />
    );
}
