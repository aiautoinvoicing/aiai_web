"use client";

import { useState } from "react";

export default function Ask() {
  const [query, setQuery] = useState("");
  const [loadingAsk, setLoadingAsk] = useState(false);
  const [loadingLLM, setLoadingLLM] = useState(false);
  const [answerAsk, setAnswerAsk] = useState<string | null>(null);
  const [answerLLM, setAnswerLLM] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);

  const handleAsk = async () => {
    if (!query) return;
    setLoadingAsk(true);
    setAnswerAsk(null);
    setAnswerLLM(null); // reset LLM answer
    try {
      const res = await fetch("http://localhost:8008/rag/purerag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, top_k: 3 }),
      });
      const data = await res.json();
      setAnswerAsk(data.answer);
      setSources(data.sources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAsk(false);
    }
  };

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
          placeholder="Ask a question..."
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          onClick={handleAsk}
          disabled={loadingAsk}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loadingAsk ? "Asking..." : "Ask"}
        </button>

        <button
          onClick={handleLLM}
          disabled={loadingLLM}
          className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loadingLLM ? "Calling LLM..." : "LLM"}
        </button>
      </div>

      {/* Show RAG answer */}
      {answerAsk && (
        <div className="mt-2 p-2 border rounded bg-gray-50">
          <strong>RAG Answer:</strong>
          <div>{answerAsk}</div>
          <div className="text-sm text-gray-500">Sources: {sources.join(", ")}</div>
        </div>
      )}

      {/* Show LLM answer */}
      {answerLLM && (
        <div className="mt-2 p-2 border rounded bg-yellow-50">
          <strong>LLM Answer:</strong>
          <div>{answerLLM}</div>
        </div>
      )}
    </div>
  );
}
