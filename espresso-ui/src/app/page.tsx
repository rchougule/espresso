"use client";

import "./globals.css";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";


export default function HomePage () {

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname === "/") {
      router.push("/template-list");
    }
  }, [pathname, router]);

    return <></>;
}