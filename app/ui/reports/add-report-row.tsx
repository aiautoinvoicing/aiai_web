// app/ui/reports/add-report-row.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddReportRow() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        mdate:"",
        first_name: "",
        last_name: "",
        company: "",
        lead_owner: "",
        source:"",
        deal_stage:"",
        account_id:"",
    });

    async function submit() {
        setLoading(true);
        await fetch("http://localhost:8008/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setLoading(false);
        location.reload(); // or router.refresh()
    }

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Date"
                type="date"
                value={form.mdate}
                onChange={(e) =>
                    setForm({ ...form, mdate: e.target.value })
                }
            />
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
                placeholder="source"
                value={form.source}
                onChange={(e) =>
                    setForm({ ...form, source: e.target.value })
                }
            />
            <Input
                placeholder="deal_stage"
                value={form.deal_stage}
                onChange={(e) =>
                    setForm({ ...form, deal_stage: e.target.value })
                }
            />
            <Input
                placeholder="account_id"
                value={form.account_id}
                onChange={(e) =>
                    setForm({ ...form, account_id: e.target.value })
                }
            />
            <Button onClick={submit} disabled={loading}>
                Add
            </Button>
        </div>
    );
}
