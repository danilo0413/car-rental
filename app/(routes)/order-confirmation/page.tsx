import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function OrderConfirmationPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">¡Thank you for trusting us!</h1>
          <p>You will soon receive all the information by email.</p>
          <p>You can view your reservations on the customer page</p>
          <Link href='/'>
            <Button>Back to products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
