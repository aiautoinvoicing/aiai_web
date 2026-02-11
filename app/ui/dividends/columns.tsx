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
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.dividend_rate?.toLocaleString("en-US", { maximumFractionDigits: 2 }) ?? "—"}
            </div>
        ),
    },
    {
        accessorKey: "latest_price",
        header: "Latest Price",
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.latest_price?.toLocaleString("en-US", { maximumFractionDigits: 2 }) ?? "—"}
            </div>
        ),
    },
    {
        accessorKey: "yield_percent",
        header: "Yield",
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.yield_percent != null
                    ? row.original.yield_percent.toLocaleString("en-US", { maximumFractionDigits: 2 }) + "%"
                    : "—"
                }
            </div>
        ),
    }, {
        accessorKey: "market_cap",
        header: "Market Cap (USD M)",
        cell: ({ row }) => (
            <div className="text-right">
                {row.original.market_cap?.toLocaleString("en-US", { maximumFractionDigits: 0 }) ?? "—"}
            </div>
        ),
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
