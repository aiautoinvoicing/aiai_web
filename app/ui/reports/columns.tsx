// app/ui/reports/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
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
  account_id?: string;
  created_at?: string; // ISO
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
    id: "created_at", // ✅ backend sort key
    accessorFn: (row) =>
      row.created_at ? new Date(row.created_at).getTime() : 0,
    sortingFn: "basic",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ row }) =>
      row.original.created_at
        ? formatDate(row.original.created_at)
        : "—",
  },

  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <SortableHeader column={column} label="First Name" />
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
    accessorKey: "last_name",
    header: ({ column }) => (
      <SortableHeader column={column} label="Last Name" />
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
    accessorKey: "company",
    header: ({ column }) => (
      <SortableHeader column={column} label="Company" />
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
    accessorKey: "lead_owner",
    header: ({ column }) => (
      <SortableHeader column={column} label="Lead Owner" />
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
