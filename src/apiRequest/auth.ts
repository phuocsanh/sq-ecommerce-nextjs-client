import http from "@/lib/http";
import { ResponseData } from "@/models/common";
import {
  LoginBodyType,
  LoginResType,
  RegisterEmailType,
  RegisterResType,
  RegisterVerifyOTPType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>("api/auth/login", body, {
      baseUrl: "",
    }),
  registerEmail: (body: RegisterEmailType) => {
    return http.post<ResponseData<null>>("api/v1/user/register1", body);
  },
  verifyOTP: (body: RegisterVerifyOTPType) => {
    return http.post<ResponseData<null>>("api/v1/user/verify_account", body);
  },
};
export default authApiRequest;
