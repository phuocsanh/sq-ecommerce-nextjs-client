"use client";

import { useEffect, useState } from "react";

// import { cookies } from "next/headers";

export default function Page() {
  // const cookieStore = cookies();
  // const access = cookieStore.get("accessToken");

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client
    const token = localStorage.getItem("accessToken");
    console.log("🚀 ~ access:", token);
    setAccessToken(token);
  }, []);
  return <div>Home</div>;
}
