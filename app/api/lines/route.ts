//find route code 

import { umoiqFetch } from "@/lib/umoiq";

const AGENCY = "unitrans"; 

export async function GET(){
    const routes = await umoiqFetch(`/agencies/${AGENCY}/routes`);
    return Response.json(routes);
}