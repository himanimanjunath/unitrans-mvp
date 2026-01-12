/*
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Prediction = {
  routeShortName?: string;
  routeId?: string;
  minutes?: number;
  predictedArrivalTime?: string;
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stopId = searchParams.get("stop");

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stopId) {
      router.push("/home");
      return;
    }

    async function fetchPredictions() {
      const res = await fetch(`/api/predictions?stop=${stopId}`);
      const data = await res.json();
      setPredictions(data);
      setLoading(false);
    }

    fetchPredictions();
  }, [stopId]);

  if (loading) return <p className="p-6">Loading arrivals…</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Upcoming buses</h1>

      {predictions.length === 0 && (
        <p className="text-gray-500">No arrivals found.</p>
      )}

      <ul className="space-y-3">
        {predictions.map((p, i) => (
          <li
            key={i}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                Route {p.routeShortName ?? p.routeId}
              </p>
              <p className="text-sm text-gray-500">
                Arriving in {p.minutes ?? "?"} min
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/home")}
        className="w-full mt-4 border py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}

*/

/* attempt 2 
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Prediction = {
  route: string | { id: string };
  minutes: number | { id: string };
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stopId = searchParams.get("stop");

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stopId) return;

    async function fetchPredictions() {
      try {
        const res = await fetch(`/api/predictions?stop=${stopId}`);
        const data = await res.json();
        setPredictions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, [stopId]);

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold text-center">
        Upcoming buses
      </h1>

      {loading && <p className="text-center">Loading arrivals…</p>}

      {!loading && predictions.length === 0 && (
        <p className="text-center text-gray-500">
          No upcoming buses
        </p>
      )}

      {predictions.map((p, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div className="font-medium">
            Route {typeof p.route === "string" ? p.route : p.route?.id}</div>
          <div className="text-gray-600">
            {typeof p.minutes === "number"
                ? `Arriving in ${p.minutes} min`
                : p.minutes === "DUE"
                ? "Arriving now"
                : "Arrival time unavailable"}
            </div>
        </div>
      ))}

      <button
        onClick={() => router.back()}
        className="w-full border py-2 rounded mt-4"
      >
        Back
      </button>
    </div>
  );
}

*/

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Prediction = {
  route: string;
  minutes: number | "DUE" | "?";
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stopId = searchParams.get("stop");

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stopId) {
      router.push("/home");
      return;
    }

    async function fetchPredictions() {
      try {
        const res = await fetch(`/api/predictions?stop=${stopId}`);
        const data = await res.json();

        const normalized: Prediction[] = data.map((p: any) => ({
          route:
            typeof p.route === "string"
              ? p.route
              : p.route?.id ?? p.route?.title ?? "Unknown",
          minutes: p.minutes ?? "?",
        }));

        setPredictions(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, [stopId]); 

  if (loading) {
    return <p className="p-6 text-center">Loading arrivals…</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold text-center">
        Upcoming buses
      </h1>

      {predictions.length === 0 && (
        <p className="text-center text-gray-500">
          No upcoming buses
        </p>
      )}

      <ul className="space-y-3">
        {predictions.map((p, i) => (
          <li
            key={i}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <span className="font-medium">Route {p.route}</span>
            <span className="text-gray-600">
              {p.minutes === "DUE"
                ? "Arriving now"
                : p.minutes === "?"
                ? "Arrival time unavailable"
                : `Arriving in ${p.minutes} min`}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.back()}
        className="w-full border py-2 rounded mt-4"
      >
        Back
      </button>
    </div>
  );
}
