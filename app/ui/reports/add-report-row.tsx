"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddReportRow({ onClose }: { onClose?: () => void }) {
    const [loading, setLoading] = useState(false);
    const initialForm = {
        mdate: "",
        first_name: "",
        last_name: "",
        company: "",
        lead_owner: "",
        source: "",
        deal_stage: "",
        account_id: "",
    };
    const [form, setForm] = useState(initialForm);

    async function submit() {
        setLoading(true);
        await fetch("http://localhost:8008/reports/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setLoading(false);
        location.reload(); // or router.refresh()
    }

    function cancel() {
        setForm(initialForm); // clear inputs
        onClose?.();           // close row if callback provided
    }

    return (
        <div className="flex flex-col gap-2">
            {/* Inputs in a single line */}
            <div className="flex gap-2 w-full">
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
                <Input
                    placeholder="Account ID"
                    value={form.account_id}
                    onChange={(e) =>
                        setForm({ ...form, account_id: e.target.value })
                    }
                />
            </div>

            {/* Buttons below the input line */}
            <div className="flex gap-2">
                <Button onClick={submit} disabled={loading}>
                    Add
                </Button>
                <Button variant="ghost" onClick={cancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
