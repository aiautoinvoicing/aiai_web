// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { formatDate } from "@/app/utils/date";

export type Report = {
    id: string;
    first_name?: string;
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

export const columns: ColumnDef<Report>[] = [
    {
        id: "mdate", // ✅ backend sort key
        accessorFn: (row) =>
            row.mdate ? new Date(row.mdate).getTime() : 0,
        sortingFn: "basic",
        header: ({ column }) => (
            <SortableHeader column={column} label="Date" />
        ),
        cell: ({ row }) =>
            row.original.mdate
                ? formatDate(row.original.mdate)
                : "—",
    },

    {
        accessorKey: "source",
        header: ({ column }) => (
            <SortableHeader column={column} label="Source" />
        ),
    },

    {
        accessorKey: "deal_stage",
        header: ({ column }) => (
            <SortableHeader column={column} label="Deal Stage" />
        ),
    },

    {
        accessorKey: "account_id",
        header: ({ column }) => (
            <SortableHeader column={column} label="Account ID" />
        ),
    },
];
