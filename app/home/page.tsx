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