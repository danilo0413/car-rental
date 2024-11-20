import { auth } from "@clerk/nextjs/server";
import { ListLovedCars } from "./components/ListLovedCars";
import { redirect } from "next/navigation";

export default async function PageLovedCars() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }
  return (
    <div>
      <h1 className="text-2xl">Cars your like</h1>

      <ListLovedCars />
    </div>
  );
}
