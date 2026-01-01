// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type Report = {
  id: string;
  lead_owner?: string;
  source?: string;
  deal_stage?: string;
  account_id?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "lead_owner",
    header: "Lead Owner",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "deal_stage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Deal Stage
      </Button>
    ),
  },
  {
    accessorKey: "account_id",
    header: "Account ID",
  },
];
