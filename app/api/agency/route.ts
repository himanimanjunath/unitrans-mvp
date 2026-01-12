//find agency ID

import { umoiqFetch } from "@/lib/umoiq";

export async function GET(){
    const agencies = await umoiqFetch("/agencies");

    const unitrans = agencies.find(
        (a: any)=>
            a.name.toLowerCase().includes("unitrans") || a.name.toLowerCase("davis").includes()
    );

    return Response.json(unitrans);
}