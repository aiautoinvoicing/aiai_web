// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditableCell } from "./editable-cell";
import { formatDate } from "@/app/utils/date";

export type Report = {
  id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  lead_owner?: string;
  source?: string;
  deal_stage?: string;
  created_at?: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => (
      <EditableCell
        rowId={row.original.id}
        field="first_name"
        value={row.original.first_name ?? null}
      />
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <EditableCell
        rowId={row.original.id}
        field="last_name"
        value={row.original.last_name ?? null}
      />
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <EditableCell
        rowId={row.original.id}
        field="company"
        value={row.original.company ?? null}
      />
    ),
  },
  {
    accessorKey: "lead_owner",
    header: "Lead Owner",
    cell: ({ row }) => (
      <EditableCell
        rowId={row.original.id}
        field="lead_owner"
        value={row.original.lead_owner ?? null}
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    accessorFn: (row) =>
      row.created_at ? new Date(row.created_at).getTime() : 0,
    cell: ({ row }) =>
      row.original.created_at
        ? formatDate(row.original.created_at)
        : "—",
  },
];
