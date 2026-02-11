// app/ui/dividends/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "dividend_ex_date",
        header: "Ex-Date",
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
    },
    {
        accessorKey: "dividend_rate",
        header: "Rate",
    },
    {
        accessorKey: "latest_price",
        header: "Latest Price",
    },
    {
        accessorKey: "yield_percent",
        header: "Yield",
    },
    {
        accessorKey: "market_cap",
        header: "Market Cap",
    },
    {
        accessorKey: "company_type",
        header: "Company Type",
    },
    {
        accessorKey: "company_name",
        header: "Company",
    },
];
