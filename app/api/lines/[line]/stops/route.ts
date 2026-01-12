//find stop ID
import { umoiqFetch } from "@/lib/umoiq";

const AGENCY = "unitrans";

export async function GET(
  req: Request,
  { params }: { params: { route: string } }
) {
  const stops = await umoiqFetch(
    `/agencies/${AGENCY}/routes/${params.route}/stops`
  );

  return Response.json(stops);
}

