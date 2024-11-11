// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { BsSearch } from "react-icons/bs";
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  // Đảm bảo đã gắn DOM trước khi sử dụng useTheme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Giả lập trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push("/login");
    // Xử lý đăng nhập ở đây
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-primary dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo và Trang chủ */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-lg font-semibold text-primary-foreground dark:text-white"
          >
            Trang Chủ
          </Link>
        </div>
        <div className="flex items-center space-x-2 bg-white w-[50%] rounded-sm  border focus-within:border-soft_cyan">
          <input
            className="w-full p-2 rounded border-none"
            placeholder="Tìm kiếm..."
          />
          <button className="h-full cursor-pointer  flex items-center justify-center p-2">
            <BsSearch className="w-10 text-lg text-gray-600 " />
          </button>
        </div>
        {/* Menu responsive */}
        <div className="flex items-center space-x-4">
          <Link
            href="/register"
            className={` ${
              pathname === "/register"
                ? "text-strong_cyan font-bold "
                : "text-soft_cyan font-medium"
            } "px-4 py-2 text-lg   rounded-lg transition cursor-pointer"`}
          >
            Đăng kí
          </Link>

          <button
            onClick={handleLogin}
            className={` ${
              pathname === "/login"
                ? "text-strong_cyan font-bold "
                : "text-soft_cyan font-medium"
            } "px-4 py-2 text-lg   rounded-lg transition cursor-pointer"`}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </nav>
  );
}
