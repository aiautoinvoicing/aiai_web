// app/ui/reports/add-report-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { AddReportRow } from "./add-report-row";

export function AddReportButton() {
    const [open, setOpen] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const toggle = () => {
        if (open) {
            // closing → force FilterRow to reset inputs
            setResetKey(prev => prev + 1);
        }
        setOpen(prev => !prev);
    };

    return (
        <>

            <Button
                variant="secondary"
                onClick={toggle}
                className="shrink-0"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Report
            </Button>

            {open && <AddReportRow onClose={() => setOpen(false)} />}
        </>
    );
}
