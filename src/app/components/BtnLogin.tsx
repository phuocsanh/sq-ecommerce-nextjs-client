"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLoginMutation } from "@/tanstack-queries/use-auth";

function BtnLogin() {
  const loginUser = useLoginMutation();
  return (
    <Button
      onClick={() => {
        loginUser.mutateAsync();
      }}
      title="Click"
    >
      Click
    </Button>
  );
}

export default BtnLogin;
