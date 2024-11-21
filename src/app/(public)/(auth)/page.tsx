"use client";

import { useRefreshTokenMutation } from "@/tanstack-queries/use-auth";
import { useEffect, useState } from "react";

// import { cookies } from "next/headers";

export default function Page() {
  // const cookieStore = cookies();
  // const access = cookieStore.get("accessToken");
  const refreshToken = useRefreshTokenMutation();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client
    const token = localStorage.getItem("accessToken");
    console.log("🚀 ~ access:", token);
    setAccessToken(token);
  }, []);

  const handle = async () => {
    const res = await refreshToken.mutateAsync();
    console.log("🚀 ~ handle ~ res:", res);
  };
  return (
    <div>
      <button onClick={handle}>refresh Token</button>
    </div>
  );
}
