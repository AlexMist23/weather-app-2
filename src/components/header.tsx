"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import AppLogo from "./icons/app-logo";

export default function Header() {
  return (
    <>
      <header
        className={cn(
          "z-10 w-full bg-background/80 backdrop-blur border-b shadow-sm"
        )}
      >
        <div className="flex items-center h-16 gap-8 px-4 mx-auto text-sm xl:container">
          <Link href={"/"} className="h-full flex gap-4 items-center">
            <AppLogo className="h-12" />
            <h1 className="text-3xl font-bold ">Weather App</h1>
          </Link>
        </div>
      </header>
    </>
  );
}
