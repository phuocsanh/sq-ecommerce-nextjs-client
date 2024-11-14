import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/http";
import { RegisterVerifyOTPType } from "@/schemaValidations/auth.schema";

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterVerifyOTPType;
  try {
    const { payload } = await authApiRequest.verifyOTP(body);

    return Response.json(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    if (e instanceof HttpError) {
      return Response.json(e.payload, {
        status: e.status,
      });
    } else {
      return Response.json(
        {
          message: "Có lỗi xảy ra",
        },
        {
          status: 500,
        }
      );
    }
  }
}
