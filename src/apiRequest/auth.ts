import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("auth/login", body),
  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>("api/auth/login", body, {
      baseUrl: "",
    }),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("api/auth/register", body),
};
export default authApiRequest;
