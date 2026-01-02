"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FilterRow } from "./filter-row";

export function FilterButton() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex w-full items-start gap-4">
            {/* Left: button */}
            <Button
                variant="secondary"
                onClick={() => setOpen(prev => !prev)}
                className="shrink-0"
            >
                <Filter className="mr-2 h-4 w-4" />
                Filter
            </Button>

            {/* Right: filter fields */}
            {open && (
                <div className="flex-1">
                    <FilterRow onClose={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
}
