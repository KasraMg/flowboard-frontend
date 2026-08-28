"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/src/providers/app-provider";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  return (
    <div className="flex h-screen items-center justify-center">landing</div>
  );
}
