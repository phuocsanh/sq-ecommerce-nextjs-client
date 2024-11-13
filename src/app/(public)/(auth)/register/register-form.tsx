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
  RegisterEmail,
  RegisterEmailType,
} from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequest/auth";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import { useRegisterEmailMutation } from "@/tanstack-queries/use-auth";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
type Steps = 1 | 2 | 3 | undefined;

const RegisterForm = () => {
  const [step, setStep] = useState<Steps>(undefined);
  // const { toast } = useToast();
  const router = useRouter();
  const registerEmailMutation = useRegisterEmailMutation();
  const form = useForm<RegisterEmailType>({
    resolver: zodResolver(RegisterEmail),
    defaultValues: {
      verify_key: "",
      verify_purpose: "TEST_USER",
      verify_type: 1,
      // name: "",
      // password: "",
      // confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmitEmail(values: RegisterEmailType) {
    if (registerEmailMutation.isPending) return;
    try {
      const result = await registerEmailMutation.mutateAsync({
        verify_key: values.verify_key || "",
        verify_purpose: values.verify_purpose,
        verify_type: values.verify_type,
      });
      console.log("🚀 ~ onSubmit ~ result:", result);
      setStep(1);
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  }
  return (
    <>
      {!step ? (
        <div>
          <h1 className="text-center font-bold text-lg mb-5">Email</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitEmail)}
              className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
              noValidate
            >
              <FormField
                control={form.control}
                name="verify_key"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nhập email" type="email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 font-light" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="!mt-8 w-full text-white">
                {registerEmailMutation.isPending ? (
                  <LoadingSpinner />
                ) : (
                  <>Tiếp theo</>
                )}
              </Button>
            </form>
          </Form>
        </div>
      ) : step === 1 ? (
        <InputOTPPattern setStep={setStep} />
      ) : step === 2 ? (
        <CreatePass setStep={setStep} />
      ) : (
        <SuccessRegister />
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
            onClick={() => {
              setStep(3);
            }}
          >
            Tiếp theo
          </Button>
        </form>
      </Form>
    </div>
  );
}

function SuccessRegister() {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <Player
        autoplay
        loop
        src="/assets/Success.json"
        style={{ height: "70%", width: "50%" }}
      >
        {/* <Controls visible={true} buttons={["repeat"]} /> */}
      </Player>
      <p className="mt-5 font-light">
        Chúc mừng bạn đã đăng kí tài khoản thành công
      </p>
      <Button className="mt-10 text-white cursor-pointer">
        <Link href={"/login"}>Go to Login</Link>
      </Button>
    </div>
  );
}

export default RegisterForm;
