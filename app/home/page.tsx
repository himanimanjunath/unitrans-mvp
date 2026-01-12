/*
"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email);
      }
    });

    return () => unsub();
  }, []);

  if (!email) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">
        Hey, {email.split("@")[0]} 👋
      </h1>

      <form className="space-y-3" action="/results">
        <input
          name="from"
          className="border p-2 w-full rounded"
          placeholder="Boarding stop"
        />
        <input
          name="to"
          className="border p-2 w-full rounded"
          placeholder="Destination"
        />
        <button className="w-full bg-black text-white py-2 rounded">
          Find buses
        </button>
      </form>
    </div>
  );
}
*/

"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [from, setFrom] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setEmail(user.email);
      }
    });

    return () => unsub();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from.trim()) return;

    setLoading(true);

    const res = await fetch(
      `/api/stops?query=${encodeURIComponent(from)}`
    );
    const stops = await res.json();

    if (!stops.length) {
      alert("No matching stops found");
      setLoading(false);
      return;
    }

    const stopId = stops[0].id;
    router.push(`/results?stop=${stopId}`);
  }

  if (!email) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">
        Hey, {email.split("@")[0]} 👋
      </h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Boarding stop"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Finding buses…" : "Find buses"}
        </button>
      </form>
    </div>
  );
}
