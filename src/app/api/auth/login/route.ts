import authApiRequest from "@/apiRequest/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const { payload } = await authApiRequest.sLogin(body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {}
}
