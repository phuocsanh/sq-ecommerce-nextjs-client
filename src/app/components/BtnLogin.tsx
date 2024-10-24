"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { login } from "../actions";

function BtnLogin() {
  const [loading, setLoading] = useState(false);
  const loginUser = async () => {
    setLoading(true);
    const res = await login();
    setLoading(false);
    console.log("Login successful:", res.data);
  };
  return (
    <Button onClick={loginUser} title="Click">
      Click {loading ? "Loading" : ""}
    </Button>
  );
}

export default BtnLogin;
