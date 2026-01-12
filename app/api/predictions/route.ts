import { umoiqFetch } from "@/lib/umoiq";
import { NextResponse } from "next/server";

const AGENCY = "unitrans";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stop = searchParams.get("stop");

  if (!stop) {
    return NextResponse.json(
      { error: "Missing stop" },
      { status: 400 }
    );
  }

  try {
    const data = await umoiqFetch(
      `/agencies/${AGENCY}/stops/${stop}/predictions`
    );

    // turning predictions into frontend-friendly format
    const predictions = data.map((p: any) => ({
      route: p.routeId || p.route || "Unknown",
      minutes: p.minutes ?? "?",
      vehicleId: p.vehicleId ?? null,
      occupancy: p.occupancy ?? null,
    }));

    return NextResponse.json(predictions);
  } catch (error) {
    console.error("UmoIQ predictions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}
