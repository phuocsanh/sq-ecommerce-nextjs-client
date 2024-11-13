import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterEmailType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>("api/auth/login", body, {
      baseUrl: "",
    }),
  registerEmail: (body: RegisterEmailType) => {
    console.log("🚀 ~ body:", body);
    return http.post<RegisterResType>("api/v1/user/register", body);
  },
};
export default authApiRequest;
