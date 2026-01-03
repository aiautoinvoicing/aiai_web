"use client";

import { useState } from "react";

export default function Ask() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8008/rag/purerag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, top_k: 3 }),
      });
      const data = await res.json();
      setAnswer(data.answer);
      console.log("Sources:", data.sources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {loading ? "Asking..." : "Ask"}
      </button>
      {answer && <div className="mt-2 p-2 border rounded bg-gray-50">{answer}</div>}
    </div>
  );
}
