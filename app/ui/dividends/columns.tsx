// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { EditableCell } from "./editable-cell";
import { formatDate } from "@/app/utils/date";

export type Dividends = {
    id?:string;
    company_name?: string;
    last_name?: string;
    company?: string;
    lead_owner?: string;
    source?: string;
    deal_stage?: string;
    account_id?: string;
    mdate?: string; // ISO
};

const SortableHeader = ({
    column,
    label,
}: {
    column: any;
    label: string;
}) => {
    const sorted = column.getIsSorted();

    return (
        <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => {
                if (!sorted) column.toggleSorting(false);
                else if (sorted === "asc") column.toggleSorting(true);
                else column.clearSorting();
            }}
        >
            {label}
            {sorted === "asc" && <ArrowUp className="h-4 w-4" />}
            {sorted === "desc" && <ArrowDown className="h-4 w-4" />}
            {!sorted && <ArrowUpDown className="h-4 w-4" />}
        </div>
    );
};

export const columns: ColumnDef<Dividends>[] = [
    {
        id: "dividend_ex_date", // ✅ backend sort key
        accessorFn: (row) =>
            row.mdate ? new Date(row.mdate).getTime() : 0,
        sortingFn: "basic",
        header: ({ column }) => (
            <SortableHeader column={column} label="Ex-Date" />
        ),
        cell: ({ row }) =>
            row.original.mdate
                ? formatDate(row.original.mdate)
                : "—",
    },

    {
        accessorKey: "symbol",
        header: ({ column }) => (
            <SortableHeader column={column} label="Symbol" />
        ),
        cell: ({ row }) => (
            <EditableCell
                rowId={row.original.id}
                field="first_name"
                value={row.original.first_name ?? null}
            />
        ),
    },

    {
        accessorKey: "company_name",
        header: ({ column }) => (
            <SortableHeader column={column} label="Company" />
        ),
        cell: ({ row }) => (
            <EditableCell
                rowId={row.original.id}
                field="last_name"
                value={row.original.last_name ?? null}
            />
        ),
    },

    {
        accessorKey: "rate",
        header: ({ column }) => (
            <SortableHeader column={column} label="Rate" />
        ),
        cell: ({ row }) => (
            <EditableCell
                rowId={row.original.id}
                field="company"
                value={row.original.company ?? null}
            />
        ),
    },

    {
        accessorKey: "latest_price",
        header: ({ column }) => (
            <SortableHeader column={column} label="Latest Price" />
        ),
        cell: ({ row }) => (
            <EditableCell
                rowId={row.original.id}
                field="lead_owner"
                value={row.original.lead_owner ?? null}
            />
        ),
    },

    {
        accessorKey: "yield",
        header: ({ column }) => (
            <SortableHeader column={column} label="Yield" />
        ),
    },

    {
        accessorKey: "market_cap",
        header: ({ column }) => (
            <SortableHeader column={column} label="Market Cap" />
        ),
    },

];
