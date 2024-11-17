import {
  UpdatePassBodyType,
  UpdatePassType,
  VerifyOTPType,
} from "@/models/auth";
import { ResponseData } from "@/models/common";
import {
  LoginBodyType,
  RegisterVerifyOTPType,
} from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<ResponseData<UpdatePassType>, Error, LoginBodyType>({
    mutationFn: async (data) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw response;
      }
      return response.json(); //
    },
  });
};

export const useUpdatePassRegisterMutation = () => {
  return useMutation<ResponseData<UpdatePassType>, Error, UpdatePassBodyType>({
    mutationFn: async (data) => {
      const response = await fetch("/api/auth/register/update-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw response;
      }
      return response.json(); //
    },
  });
};
export const useVerifyOTPMutation = () => {
  return useMutation<ResponseData<VerifyOTPType>, Error, RegisterVerifyOTPType>(
    {
      mutationFn: async (data) => {
        const response = await fetch("/api/auth/register/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw response;
        }
        return response.json(); //
      },
    }
  );
};

export const useRegisterEmailMutation = () => {
  return useMutation<
    ResponseData<null>,
    Error,
    { verify_key: string; verify_purpose: string; verify_type: number }
  >({
    mutationFn: async (data) => {
      const response = await fetch("/api/auth/register/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw response;
      }

      return response.json(); // TypeScript sẽ hiểu kết quả trả về có kiểu RegisterEmailResponse
    },
    onError: (error) => {
      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
    },
  });
};
