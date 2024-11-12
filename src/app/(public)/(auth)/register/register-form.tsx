"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { MdArrowBack } from "react-icons/md";
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
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequest/auth";

type Steps = 1 | 2 | 3 | undefined;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Steps>(undefined);
  // const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      // name: "",
      // password: "",
      // confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setStep(1);
    // if (loading) return;
    // setLoading(true);
    // try {
    //   const result = await authApiRequest.register(values);
    //   console.log("🚀 ~ onSubmit ~ result:", result);

    //   // await authApiRequest.auth({
    //   //   sessionToken: result.payload.data.token,
    //   //   expiresAt: result.payload.data.expiresAt,
    //   // });
    //   // toast({
    //   //   description: result.payload.message,
    //   // });
    //   // setUser(result.payload.data.account);

    //   router.push("/me");
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   handleErrorApi({
    //     error,
    //     setError: form.setError,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <>
      {!step ? (
        <div>
          <h1 className="text-center font-bold text-lg mb-5">Email</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel style={{ fontSize: 15, fontFamily: "sans-serif" }}>
                    Email
                  </FormLabel> */}
                    <FormControl>
                      <Input placeholder="Nhập email" type="email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 font-light" />
                  </FormItem>
                )}
              />
              {/* <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
              {/* <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nhập lại mật khẩu</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
              <Button
                type="submit"
                className="!mt-8 w-full text-white"
                onClick={() => {
                  setStep(1);
                }}
              >
                Tiếp theo
              </Button>
            </form>
          </Form>
        </div>
      ) : step === 1 ? (
        <InputOTPPattern setStep={setStep} />
      ) : step === 2 ? (
        <CreatePass setStep={setStep} />
      ) : (
        <></>
      )}
    </>
  );
};

function InputOTPPattern({ setStep }: { setStep: (step: Steps) => void }) {
  return (
    <div className="flex flex-col items-center">
      <button className="self-start" onClick={() => setStep(undefined)}>
        <MdArrowBack size={25} />
      </button>
      <p className="text-lg text-center font-bold">Nhập mã xác thực</p>
      <p className="text-center">Mã xác thực sẽ được gửi qua email</p>
      <div className="mt-8">
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <p className="text-center mt-6">
        Bạn vẫn chưa nhận được?{" "}
        <button onClick={() => {}}>
          <p className="text-cyan-500">Gửi lại</p>
        </button>
      </p>

      <Button
        type="submit"
        className="!mt-8 w-full text-white"
        onClick={() => {
          setStep(2);
        }}
      >
        Tiếp theo
      </Button>
    </div>
  );
}

function CreatePass({ setStep }: { setStep: (step: Steps) => void }) {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setStep(1);
  }
  return (
    <div>
      <button className="self-start" onClick={() => setStep(undefined)}>
        <MdArrowBack size={25} />
      </button>
      <p className="text-lg text-center font-bold">Tạo mật khẩu</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
          noValidate
        >
          <FormField
            control={form.control}
            name="password"
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
                  content={form.formState.errors.confirmPassword?.message}
                  className="text-red-600 font-light"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  content={form.formState.errors.confirmPassword?.message}
                  className="text-red-600 font-light"
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!mt-8 w-full text-white"
            // onClick={() => {
            //   setStep(3);
            // }}
          >
            Tiếp theo
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default RegisterForm;
