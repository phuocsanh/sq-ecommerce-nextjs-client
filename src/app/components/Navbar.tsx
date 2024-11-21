// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Navbar() {
  const pathname = usePathname();
  // Đảm bảo đã gắn DOM trước khi sử dụng useTheme
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (event: React.FocusEvent) => {
    // Kiểm tra nếu phần tử mất focus và phần tử nhận focus không phải là dropdown
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client
    const token = localStorage.getItem("accessToken");
    console.log("🚀 ~ access:", token);
    setAccessToken(token);
  }, []);
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
        {accessToken ? (
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Open</Button>
                 */}
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
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
                {/* <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator /> */}

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
        )}
      </div>
    </nav>
  );
}
