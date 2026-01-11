"use client";

import { useState } from "react";

export default function Ask() {
    const [query, setQuery] = useState("");
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [loadingLLM, setLoadingLLM] = useState(false);
    const [answerLLM, setAnswerLLM] = useState<string | null>(null);
    const [answerRoute, setAnswerRoute] = useState<string | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const SAMPLE_PROMPTS = [
        // SQL – specific
        "How many deals are in Closed Won stage?",
        "List all deals currently On Hold with lead owner and company name",
        "Which accounts have deals in Proposal Sent stage?",
        "Show all deals generated through Chatbot",
        "Which lead owners have more than one deal?",
        "List deals with account IDs starting with '2F'",
        "Which deals have been sourced from Website Form?",
        "Show first and last names of all contacts in Closed Won deals",
        "Which companies have multiple deals On Hold?",
        "List all deals created in January 2025",

        // SQL – overall / aggregate
        "How many total deals are in the table?",
        "Show deal count grouped by Deal Stage",
        "Count deals per lead owner",
        "How many deals came from LinkedIn Outreach?",
        "What is the distribution of deals per source?",
        "Total number of unique companies in the table",
        "How many deals were created each month?",
        "Which lead owner has the most deals?",
        "How many deals are Re-engagement vs New Lead?",
        "Summarize total deals by Source and Deal Stage",

        "// Semantic search (embeddings)",
        
        "Which lead owners are most associated with successful deals?",
        "Are there common patterns among deals marked as Re-engagement?",
        "Identify trends in deal stages over time",
        "Which sources lead to the fastest deal closures?",
        "Highlight companies with repeated engagements",
        "Find similarities between deals in Closed Won stage",
        "Which accounts have similar lead owner profiles?",
        "Detect patterns in companies using Chatbot vs LinkedIn Outreach",
        "Which first names appear most in high-value deals?",
        "What deal characteristics indicate On Hold vs Proposal Sent?",

        "// Web search",
        "Latest best practices for improving lead conversion from LinkedIn Outreach",
        "Current trends in CRM deal stage management",
        "Top strategies for increasing sales via Chatbot leads",
        "How to improve lead engagement from Networking Events",
        "Best ways to track and report deal pipelines effectively",
        "Trends in sales re-engagement campaigns",
        "Advice for reducing deals stuck in Proposal Sent stage",
        "How successful companies manage multiple deals per account",
        "Insights on lead owner performance tracking",
        "Latest tools for automating lead source analysis",

        "// LLM knowledge fallback",
        "What does 'Re-engagement' typically mean in a sales pipeline?",
        "Explain common sales deal stages in simple terms",
        "How to interpret On Hold status in CRM reports",
        "Describe best practices for lead follow-up",
        "Explain differences between Closed Won and Proposal Sent",
        "What is the significance of lead owner in deal success?",
        "How to summarize sales data for management",
        "Common sources of leads and their effectiveness",
        "How to analyze sales trends from a table of deals",
        "Explain how account IDs are used to track clients",
    ];


    const handleLLM = async () => {
        if (!query) return;
        setLoadingLLM(true);
        try {
            const res = await fetch("/api/llm", {
                // const res = await fetch("http://localhost:8008/iv3tools/sql_emb_serp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, top_k: 3 }),
            });
            const data = await res.json();
            setAnswerLLM(data.answer);
            setAnswerRoute(data.route);
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
                    {loadingLLM ? "Calling LLM Agent for help..." : "Ask"}
                </button>
            </div>

            {/* Show LLM answer */}
            {answerLLM && (
                <div className="mt-2 p-2 border rounded bg-yellow-50">
                    <strong>LLM Answer:</strong>
                    <div>{answerLLM}</div>
                    <div className="text-xs text-gray-400 mt-1">({answerRoute})</div>
                </div>
            )}

            <div className="mt-2 text-sm text-gray-600">
                <div className="mb-1">
                    Try asking: <span className="text-gray-500 text-xs">(Note: For large queries, only the top 30 results may be returned due to token limits)</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {SAMPLE_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            type="button"
                            onClick={() => {
                                setQuery(prompt);      // fill input
                                setAnswerLLM(null);    // clear previous answer
                            }}
                            className="rounded border px-2 py-1 hover:bg-gray-100 text-left"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
