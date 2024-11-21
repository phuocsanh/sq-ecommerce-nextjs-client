import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Lấy refreshToken từ header
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        message: "No refresh token",
        code: 500,
        data: null,
      },
      { status: 500 }
    );
  }

  try {
    // Gửi refreshToken trong header để lấy accessToken mới
    const response = await fetch(
      "http://0.0.0.0:8002/api/v1/user/refresh_token",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`, // Gửi refreshToken trong header
          "Content-Type": "application/json", // Optional nếu server yêu cầu JSON format
        },
      }
    );
    console.log("🚀 ~ POST ~ response:", response);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "An unexpected error occurred",
          code: 500,
          data: null,
        },
        { status: 500 }
      );
    }

    return Response.json(response);
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e);
    if (e instanceof HttpError) {
      return NextResponse.json(
        {
          message: `HTTP Error: ${e.message}`,
          code: e.code,
          data: e.data,
        },
        { status: e.code }
      );
    }

    // Trường hợp lỗi khác
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        code: 500,
        data: null,
      },
      { status: 500 }
    );
  }
}
