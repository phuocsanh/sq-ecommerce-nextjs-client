"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { handleErrorApi, isServerResponseError } from "@/lib/utils";
import { useLoginMutation } from "@/tanstack-queries/use-auth";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import { API_CODE } from "@/models/common";

const LoginForm = () => {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      user_password: "",
      user_account: "",
    },
  });

  const loginMutation = useLoginMutation();

  async function onSubmit(values: LoginBodyType) {
    const res = await loginMutation.mutateAsync({
      user_account: values.user_account,
      user_password: values.user_password,
    });
    console.log("🚀 ~ onSubmit ~ res:", res);
    if (res.data?.accessToken) {
    }
    try {
    } catch (error) {
      handleErrorApi({
        error: isServerResponseError(error) ? error.statusText : null,
      });
    }
  }
  return (
    <>
      <div>
        <p className="text-lg text-center font-bold">Đăng nhập</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="user_account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập email của bạn"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    content={form.formState.errors.user_account?.message}
                    className="text-red-600 font-light"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    content={form.formState.errors.user_password?.message}
                    className="text-red-600 font-light"
                  />
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-8 w-full text-white">
              Xác nhận
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
