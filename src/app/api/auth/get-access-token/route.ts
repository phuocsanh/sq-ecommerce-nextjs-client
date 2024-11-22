import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const accessToken = req.cookies.accessToken;
  console.log("🚀 ~ GET ~ accessToken:", accessToken);

  if (!accessToken) {
    return Response.json({ accessToken: "" });
  }

  return Response.json({ accessToken });
}
