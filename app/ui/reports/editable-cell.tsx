// app/ui/reports/editable-cell.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EditableCell({
    value,
    rowId,
    field,
}: {
    value: string | null;
    rowId: string;
    field: string;
}) {
    const [editing, setEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value ?? "");
    const [loading, setLoading] = useState(false);

    async function save() {
        setLoading(true);

        await fetch(`http://localhost:8008/reports/${rowId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: localValue }),
        });

        setLoading(false);
        setEditing(false);
    }

    if (!editing) {
        return (
            <div
                className="cursor-pointer hover:underline"
                onClick={() => setEditing(true)}
            >
                {value ?? "—"}
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <Input
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="h-8"
                autoFocus
            />
            <Button size="sm" onClick={save} disabled={loading}>
                Save
            </Button>
        </div>
    );
}
