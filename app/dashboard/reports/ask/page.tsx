"use client";

import { useState } from "react";

export default function Ask() {
    const [query, setQuery] = useState("");
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [loadingLLM, setLoadingLLM] = useState(false);
    const [answerLLM, setAnswerLLM] = useState<string | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const SAMPLE_PROMPTS = [
        "Summarize the key insights from my latest reports",
        "What are the main risks highlighted in these reports?",
        "Show trends or patterns across all reports",
        "Explain this data in simple terms",
    ];


    const handleLLM = async () => {
        if (!query) return;
        setLoadingLLM(true);
        try {
            const res = await fetch("http://localhost:8008/rag/askLLM", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, top_k: 3 }),
            });
            const data = await res.json();
            setAnswerLLM(data.answer);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingLLM(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="AI Agent help you - your data, your reports, web search, and LLM..."
                    className="border px-2 py-1 rounded flex-1"
                />

                <button
                    onClick={handleLLM}
                    disabled={loadingLLM}
                    className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                    {loadingLLM ? "Calling LLM..." : "Ask"}
                </button>
            </div>

            {/* Show LLM answer */}
            {!answerLLM && (
                <div className="mt-2 text-sm text-gray-600">
                    <div className="mb-1">Try asking:</div>
                    <div className="flex flex-wrap gap-2">
                        {SAMPLE_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => setQuery(prompt)}
                                className="rounded border px-2 py-1 hover:bg-gray-100 text-left"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
