"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FilterRow } from "./filter-row";

export function FilterButton() {
    const [open, setOpen] = useState(false);
    const [resetKey, setResetKey] = useState(0); // key to reset FilterRow

    const toggle = () => {
        if (open) {
            // closing → force FilterRow to reset inputs
            setResetKey(prev => prev + 1);
        }
        setOpen(prev => !prev);
    };

    return (
        <div className="flex w-full items-start gap-4">
            {/* Left: button */}
            <Button
                variant="secondary"
                onClick={toggle}
                className="shrink-0"
            >
                <Filter className="mr-2 h-4 w-4" />
                Filter
            </Button>

            {/* Right: filter fields */}
            {open && (
                <div className="flex-1">
                    {/* pass resetKey as key to remount FilterRow */}
                    <FilterRow key={resetKey} onClose={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
}
