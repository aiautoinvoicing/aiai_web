// app/ui/invoices/data-table.tsx  (CLIENT COMPONENT)

"use client";

import { ColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function DataTable<TData>({ columns, data, }:
    {
        columns: ColumnDef<TData>[];
        data: TData[];
    }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [sorting, setSorting] = useState<SortingState>(() => {
        const sortBy = searchParams.get("sort_by");
        const sortOrder = searchParams.get("sort_order");
        return sortBy
            ? [{ id: sortBy, desc: sortOrder === "desc" }]
            : [];
    });

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        manualSorting: true,
        manualPagination: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: (updater) => {
            const next =
                typeof updater === "function" ? updater(sorting) : updater;
            setSorting(next);

            const params = new URLSearchParams(searchParams.toString());

            if (next.length === 0) {
                params.delete("sort_by");
                params.delete("sort_order");
            } else {
                params.set("sort_by", next[0].id);
                params.set("sort_order", next[0].desc ? "desc" : "asc");
            }

            params.set("page", "1"); // reset page on sort
            router.push(`?${params.toString()}`);
        },
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                        {hg.headers.map((h) => (
                            <TableHead key={h.id}>
                                {flexRender(h.column.columnDef.header, h.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => {
                    const original = row.original as any;
                    const highlight = Number(original.yield_percent) > 3;

                    return (
                        <TableRow
                            key={row.id}
                            className={highlight ? "bg-blue-50 dark:bg-blue-900" : ""}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>

        </Table>
    );
}
