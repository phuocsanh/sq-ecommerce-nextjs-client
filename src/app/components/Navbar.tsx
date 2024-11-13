// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsSearch } from "react-icons/bs";
export default function Navbar() {
  const pathname = usePathname();
  // Đảm bảo đã gắn DOM trước khi sử dụng useTheme

  return (
    <nav className="bg-primary dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo và Trang chủ */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-lg font-semibold text-primary-foreground text-white"
          >
            Trang Chủ
          </Link>
        </div>

        {pathname === "/" && (
          <div className="flex items-center space-x-2 bg-white w-[50%] rounded-sm  border focus-within:border-soft_cyan">
            <input
              className="w-full p-2 rounded border-none bg-white"
              placeholder="Tìm kiếm..."
            />
            <button className="h-full cursor-pointer  flex items-center justify-center p-2">
              <BsSearch className="w-10 text-lg text-gray-600 " />
            </button>
          </div>
        )}

        {/* Menu responsive */}
        <div className="flex items-center space-x-4">
          <Link
            href="/register"
            className={` ${
              pathname === "/register"
                ? "text-white font-extrabold"
                : "text-white  font-medium"
            } "px-4 py-2 text-lg rounded-lg transition cursor-pointer "`}
          >
            Đăng kí
          </Link>

          <Link
            href="/login"
            className={` ${
              pathname === "/login"
                ? "text-white font-extrabold"
                : "text-white  font-medium"
            } "px-4 py-2 text-lg   rounded-lg transition cursor-pointer text-white""`}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </nav>
  );
}
