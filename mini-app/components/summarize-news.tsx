"use client";

import { useEffect, useState } from "react";

export interface SummarizeNewsProps {
  topic: string;
}

export default function SummarizeNews({ topic }: SummarizeNewsProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        // Placeholder: replace with real API call if available
        const response = await fetch(
          `https://api.example.com/summarize?topic=${encodeURIComponent(topic)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSummary(data.summary);
      } catch (_) {
        setSummary(
          `Could not fetch summary for "${topic}". Please try again later.`
        );
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [topic]);

  return (
    <section className="mt-6 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">
        Summary of news about '{topic}'
      </h2>
      {loading ? (
        <p className="text-muted-foreground">Loading summary...</p>
      ) : (
        <p className="text-muted-foreground">{summary}</p>
      )}
    </section>
  );
}
