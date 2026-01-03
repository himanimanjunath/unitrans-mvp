import { NextResponse } from "next/server";

const SERVICE_URL = "http://localhost:3000/api/auth/cas";
const CAS_LOGIN = "https://cas.ucdavis.edu/cas/login";
const CAS_VALIDATE = "https://cas.ucdavis.edu/cas/serviceValidate";

function extractNetId(xml: string) {
  // super simple parse (good enough for MVP)
  const match = xml.match(/<cas:user>(.*?)<\/cas:user>/);
  return match?.[1] ?? null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticket = searchParams.get("ticket");

  // 1) No ticket? Send them to CAS login
  if (!ticket) {
    const redirectUrl = `${CAS_LOGIN}?service=${encodeURIComponent(SERVICE_URL)}`;
    return NextResponse.redirect(redirectUrl);
  }

  // 2) Validate ticket with CAS
  const validateUrl = `${CAS_VALIDATE}?ticket=${encodeURIComponent(ticket)}&service=${encodeURIComponent(SERVICE_URL)}`;
  const res = await fetch(validateUrl);
  const xml = await res.text();

  const netid = extractNetId(xml);

  if (!netid) {
    return new NextResponse("CAS validation failed", { status: 401 });
  }

  // 3) Set a cookie (MVP session)
  const response = NextResponse.redirect("http://localhost:3000/home");
  response.cookies.set("netid", netid, { httpOnly: true, path: "/" });
  return response;
}