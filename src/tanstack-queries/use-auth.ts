import { ResponseData } from "@/models/common";
import { RegisterVerifyOTPType } from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useVerifyOTPMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterVerifyOTPType) => {
      const response = await fetch("/api/auth/register/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Có lỗi xảy ra.");
      }
      return response.json();
    },
  });
};
export const useRegisterEmailMutation = () => {
  return useMutation({
    mutationFn: async (data: {
      verify_key: string;
      verify_purpose: string;
      verify_type: number;
    }) => {
      const response = await fetch("/api/auth/register/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Có lỗi xảy ra.");
      }

      return response.json();
    },
  });
};
