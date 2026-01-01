// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { formatDate } from "@/app/utils/date";

export type Report = {
    id: string;
    lead_owner?: string;
    source?: string;
    deal_stage?: string;
    account_id?: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    date?: string;
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
        accessorKey: "date",
        accessorFn: (row) =>
            row.date ? new Date(row.date).getTime() : 0,
        sortingFn: "basic",
        header: ({ column }) => (
            <SortableHeader column={column} label="Date" />
        ),
        cell: ({ row }) =>
            row.original.date
                ? formatDate(row.original.date)
                : "—",
    },
    {
        accessorKey: "first_name",
        header: ({ column }) => (
            <SortableHeader column={column} label="First Name" />
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => (
            <SortableHeader column={column} label="Last Name" />
        ),
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <SortableHeader column={column} label="Company" />
        ),
    },
    {
        accessorKey: "lead_owner",
        header: ({ column }) => (
            <SortableHeader column={column} label="Lead Owner" />
        ),
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