"use server";
import { resquestApi } from "@/fetch-api";

interface LoginResponse {
  token: string;
  userId: number;
  // Add any other fields expected in the response
}
interface LoginRequest {
  username: string;
  password: string;
  device_name: string;
  device_token: string;
  // Add any other fields expected in the response
}
export async function login() {
  const res = await resquestApi.POST<LoginRequest, LoginResponse>(
    "https://test.vn/sky/gateway/v1/booking/api/login",
    {
      username: "0987344446",
      password: "123123",
      device_name: "Iphone",
      device_token: "hjkhflfoashjfaoishjaosifhaoisfha",
    }
  );
  return res;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}
