// app/ui/reports/pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);

    const goToPage = (p: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(p));
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
            >
                Previous
            </Button>

            <span className="text-sm">
                Page {page} of {totalPages}
            </span>

            <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
            >
                Next
            </Button>
        </div>
    );
}