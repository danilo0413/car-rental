import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";

export default async function pageReserves() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //console.log(order);
  return (
    <div>
      <h1 className="mb-4 text-3xl">Reserves Pages</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col justify-center gap-4">
            <h2 className="text-xl">You not have reservations yet</h2>
            <p>Make your reservation through the page</p>
            <Link href='/cars'>
                <Button>Reserve</Button>
            </Link>
        </div>
      ) : (
        <TableReserves orders={orders}/>
      )}
    </div>
  );
}
