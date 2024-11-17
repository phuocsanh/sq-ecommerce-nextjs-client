import Image from "next/image";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="h-[calc(100vh-60px)] w-full relative">
      <div className="h-full w-[70%] absolute inset-0 py-5">
        <Image
          layout="fill" // Làm cho hình ảnh lấp đầy toàn bộ không gian của div cha
          objectFit="stretch" // Đảm bảo hình ảnh không bị biến dạng mà vẫn bao phủ toàn bộ không gian
          alt="bg_register"
          src={"/assets/bg_login.jpg"}
        />
      </div>
      <div className="right-0 absolute w-[30%] flex h-full bg-bg_cyan items-center justify-center">
        <div className="bg-white w-[80%] px-6 py-6 rounded-lg shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
