// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

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



export const columns: ColumnDef<Wage>[] = [
    { accessorKey: "province", header: "province" },
    { accessorKey: "noc_title_en", header: "noc_title_en" },
    { accessorKey: "low_wage", header: "low_wage" },
    { accessorKey: "median_wage", header: "median_wage" },
    { accessorKey: "high_wage", header: "high_wage" },
    { accessorKey: "average_wage", header: "average_wage" },
    { accessorKey: "quartile1_wage", header: "quartile1_wage" },
    { accessorKey: "quartile3_wage", header: "quartile3_wage" },
    { accessorKey: "data_source_en", header: "data_source_en" },
    { accessorKey: "data_source_fr", header: "data_source_en" },
];
