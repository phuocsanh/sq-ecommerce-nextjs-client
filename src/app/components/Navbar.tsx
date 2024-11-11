// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo và Trang chủ */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            Trang Chủ
          </Link>
        </div>

        {/* Menu responsive */}
        <div className="flex items-center space-x-4">
          {/* Nút Login / Logout */}

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          {/* Nút chuyển đổi chế độ sáng/tối */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === "dark" ? "🌞" : "🌜"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
