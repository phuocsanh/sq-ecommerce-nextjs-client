import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return Response.json({ accessToken: "" });
  }

  return Response.json({ accessToken });
}
