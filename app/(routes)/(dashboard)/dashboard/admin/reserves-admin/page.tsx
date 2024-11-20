import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TableReserves from "./components/TableReserves/TableReserves";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function pageReservesAdmin() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user || !isAdministrator(userId)) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  //console.log(user)

  return (
    <div>
      <h1 className="text-3xl mb-4">Reserves Pages</h1>
      <TableReserves orders={orders} />
    </div>
  );
}