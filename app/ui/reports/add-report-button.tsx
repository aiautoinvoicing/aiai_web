// app/ui/reports/add-report-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddReportRow } from "./add-report-row";

export function AddReportButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Report
            </Button>

            {open && <AddReportRow onClose={() => setOpen(false)} />}
        </>
    );
}
