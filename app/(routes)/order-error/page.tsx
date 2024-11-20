"use client";

import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PageOrderError() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">
            ¡OPS! An error has occurred. Try it later.
          </h1>
          <Link href="/">
            <Button>Back to products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
