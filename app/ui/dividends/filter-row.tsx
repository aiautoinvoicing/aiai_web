"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterRow({ onClose }: { onClose?: () => void }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // initial form based on URL, but will reset if component remounts
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
        // reset URL
        router.push("?page=1&page_size=10&sort_order=asc");
        // reset local inputs
        setForm({
            first_name: "",
            last_name: "",
            company: "",
            lead_owner: "",
            source: "",
            deal_stage: "",
        });
        onClose?.();
    }

    return (
        <div className="flex items-center gap-2">
            {["first_name","last_name","company","lead_owner","source","deal_stage"].map(field => (
                <Input
                    key={field}
                    placeholder={field.replace("_", " ")}
                    value={form[field as keyof typeof form]}
                    onChange={e =>
                        setForm({ ...form, [field]: e.target.value })
                    }
                />
            ))}

            <Button onClick={apply}>Apply</Button>
            <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
    );
}
