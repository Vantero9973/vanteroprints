"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-sm text-accent">You&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 min-w-[180px] dark:bg-black bg-white border border-white/5 text-text-primary text-sm px-4 py-2.5 rounded-sm outline-none focus:border-white/10 placeholder:text-text-muted transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-black text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {status === "loading" ? "..." : "Join"}
      </button>
      {status === "error" && (
        <p className="text-xs text-sakura w-full mt-1">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
