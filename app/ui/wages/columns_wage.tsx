// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Wage = {
    noc_title_eng? : string;
    prov?: string;
    er_name?: string;
    low_wage_salaire_minium?: number;
    median_wage_salaire_median?: number;
    high_wage_salaire_maximal?: number;
    average_wage_salaire_moyen?: number;
    quartile1_wage_salaire_quartile1?: number;
    quartile3_wage_salaire_quartile3?: number;
    data_source_e?: string;
};



export const columns: ColumnDef<Wage>[] = [
    { accessorKey: "prov", header: "Province" },
    { accessorKey: "er_name", header: "Area" },
    { accessorKey: "noc_title_eng", header: "Title" },
    { accessorKey: "low_wage_salaire_minium", header: "low" },
    { accessorKey: "median_wage_salaire_median", header: "med" },
    { accessorKey: "high_wage_salaire_maximal", header: "high" },
    { accessorKey: "average_wage_salaire_moyen", header: "ave" },
    { accessorKey: "quartile1_wage_salaire_quartile1", header: "25%" },
    { accessorKey: "quartile3_wage_salaire_quartile3", header: "75%" },
    { accessorKey: "data_source_e", header: "data_source" },
];
