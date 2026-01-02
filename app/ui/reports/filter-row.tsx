"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterRow() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [form, setForm] = useState({
        first_name: searchParams.get("first_name") ?? "",
        last_name: searchParams.get("last_name") ?? "",
        company: searchParams.get("company") ?? "",
        lead_owner: searchParams.get("lead_owner") ?? "",
        source: searchParams.get("source") ?? "",
        deal_stage: searchParams.get("deal_stage") ?? "",
    });

    function apply() {
        const params = new URLSearchParams();

        // keep your existing defaults
        params.set("page", "1");
        params.set("page_size", "10");
        params.set("sort_order", "asc");

        Object.entries(form).forEach(([key, value]) => {
            if (value.trim()) {
                params.set(key, value.trim());
            }
        });

        router.push(`?${params.toString()}`);
    }

    function clear() {
        router.push("?page=1&page_size=10&sort_order=asc");
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="First name"
                value={form.first_name}
                onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                }
            />
            <Input
                placeholder="Last name"
                value={form.last_name}
                onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                }
            />
            <Input
                placeholder="Company"
                value={form.company}
                onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                }
            />
            <Input
                placeholder="Lead owner"
                value={form.lead_owner}
                onChange={(e) =>
                    setForm({ ...form, lead_owner: e.target.value })
                }
            />
            <Input
                placeholder="Source"
                value={form.source}
                onChange={(e) =>
                    setForm({ ...form, source: e.target.value })
                }
            />
            <Input
                placeholder="Deal stage"
                value={form.deal_stage}
                onChange={(e) =>
                    setForm({ ...form, deal_stage: e.target.value })
                }
            />

            {/* Buttons stay at the end */}
            <Button onClick={apply}>
                Apply
            </Button>
            <Button variant="ghost" onClick={clear}>
                Clear
            </Button>
        </div>
    );
}
