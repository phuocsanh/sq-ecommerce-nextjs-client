import Image from "next/image";
import RegisterForm from "./register-form";
export default function Register() {
  return (
    <div className="h-[calc(100vh-60px)] w-full flex flex-col mt-20">
      {/* Header Section */}
      <header className="bg-primary w-full flex flex-col lg:mt-10 lg:flex-row">
        {/* Left Content */}
        <aside className="hidden lg:flex w-full lg:w-[50%] justify-center items-center flex-col py-10 lg:py-20 px-6 text-center lg:text-left">
          <Image
            width={200}
            height={200}
            objectFit="contain"
            alt="bg_register"
            src={"/assets/online-shop.png"}
          />
          <h1 className="text-white font-medium text-4xl lg:text-5xl mt-4">
            SQ-ECOMMERCE
          </h1>
          <p className="mt-4 text-white text-lg lg:text-2xl text-center">
            Nền tảng thương mại điện tử tiện lợi - nhanh chóng
          </p>
        </aside>

        {/* Right Content */}
        <main className="w-full lg:w-[40%] flex items-center justify-center bg-white lg:bg-transparent px-6  py-10">
          <RegisterForm />
        </main>
      </header>
    </div>
  );
}
