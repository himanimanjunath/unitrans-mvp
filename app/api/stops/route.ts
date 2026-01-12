import { umoiqFetch } from "@/lib/umoiq";
import { NextResponse } from "next/server";

const AGENCY = "unitrans";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    // 1. fetch all routes
    const routes = await umoiqFetch(
      `/agencies/${AGENCY}/routes`
    );

    const matches: {
      id: string;
      name: string;
      route: string;
    }[] = [];

    // 2. loop routes and collect matching stops
    for (const route of routes) {
      const stops = await umoiqFetch(
        `/agencies/${AGENCY}/routes/${route.id}/stops`
      );

      for (const stop of stops) {
        if (
          stop.name?.toLowerCase().includes(query.toLowerCase())
        ) {
          matches.push({
            id: stop.id,
            name: stop.name,
            route: route.id,
          });
        }
      }
    }

    return NextResponse.json(matches.slice(0, 10)); //limit results
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search stops" },
      { status: 500 }
    );
  }
}
