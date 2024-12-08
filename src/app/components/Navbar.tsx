// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdHome } from "react-icons/io";
import { useAuthStore } from "@/stores/useAuthStore";
export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);

  useEffect(() => {
    // Chỉ thực hiện trên client
    const isLogin = localStorage.getItem("isLogin");
    setIsAuthenticated(isLogin);
  }, []);
  // Đảm bảo đã gắn DOM trước khi sử dụng useTheme

  return (
    <nav className="bg-primary dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
        {/* Logo và Trang chủ */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="text-sm md:text-lg font-semibold text-primary-foreground text-white truncate flex items-center"
          >
            <span className="sm:hidden">
              {/* Thay chữ bằng icon trên mobile */}
              <IoMdHome size={30} />
            </span>
            <span className="hidden sm:block">Trang Chủ</span>
          </Link>
        </div>

        {pathname === "/" && (
          <div className="flex items-center space-x-2 bg-white w-[50%] sm:w-[60%] md:w-[50%] rounded-sm border focus-within:border-soft_cyan">
            <input
              className="w-full p-1 sm:p-2 rounded border-none bg-white text-sm"
              placeholder="Tìm kiếm..."
            />
            <button className="h-full cursor-pointer flex items-center justify-center p-1 sm:p-2">
              <BsSearch className="w-5 sm:w-6 text-lg text-gray-600" />
            </button>
          </div>
        )}

        {/* Menu responsive */}
        {isAuthenticated === "0" ? (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 md:w-56 bg-white">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link
              href="/register"
              className={` ${
                pathname === "/register"
                  ? "text-white font-bold text-sm sm:text-lg "
                  : "text-white font-medium text-sm sm:text-lg"
              } px-1 sm:px-4 py-1 sm:py-2 rounded-lg transition cursor-pointer`}
            >
              Đăng kí
            </Link>

            <Link
              href="/login"
              className={` ${
                pathname === "/login"
                  ? "text-white font-bold text-sm sm:text-lg"
                  : "text-white font-medium text-sm sm:text-lg"
              } px-1  sm:px-4 py-1 sm:py-2 rounded-lg transition cursor-pointer`}
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
