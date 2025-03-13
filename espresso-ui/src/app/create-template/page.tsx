"use client";

import CreatePdfTemplate from "@/components/EspressoConsole/CreatePdfTemplate";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<></>}>
        <CreatePdfTemplate />
      </Suspense>{" "}
    </div>
  );
}
