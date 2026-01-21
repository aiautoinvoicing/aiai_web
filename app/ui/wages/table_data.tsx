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


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
