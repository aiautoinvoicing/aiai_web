// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { formatDate } from "@/app/utils/date";

export type Wage = {
    noc_title_en? : string;
    province?: string;
    er_name_en?: string;
    low_wage?: number;
    median_wage?: number;
    high_wage?: number;
    average_wage?: number;
    quartile1_wage?: number;
    quartile3_wage?: number;
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

export const columns: ColumnDef<Wage>[] = [
    {
        accessorKey: "province",
        header: ({ column }) => (
            <SortableHeader column={column} label="province" />
        ),
    },

    {
        accessorKey: "noc_title_en",
        header: ({ column }) => (
            <SortableHeader column={column} label="noc_title_en" />
        ),
    },

    {
        accessorKey: "low_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="low_wage" />
        ),
    },
    {
        accessorKey: "median_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="median_wage" />
        ),
    },
    {
        accessorKey: "high_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="high_wage" />
        ),
    },
    {
        accessorKey: "average_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="average_wage" />
        ),
    },
    {
        accessorKey: "quartile1_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="quartile1_wage" />
        ),
    },
    {
        accessorKey: "quartile3_wage",
        header: ({ column }) => (
            <SortableHeader column={column} label="quartile3_wage" />
        ),
    },
    {
        accessorKey: "data_source_en",
        header: ({ column }) => (
            <SortableHeader column={column} label="data_source_en" />
        ),
    },
];
