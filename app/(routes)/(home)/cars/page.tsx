import { Navbar } from "@/components/Shared/Navbar";
import { db } from "@/lib/db";
import { HeaderCars } from "./components/HeaderCars";
import { FilterAndListCars } from "./components/FilterAndListCars";

export default async function pageCars() {
  const cars = await db.car.findMany({
    where: {
      isPublish: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //console.log(cars);
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-6xl">
        <HeaderCars />
        <div>
          <FilterAndListCars cars={cars} />
        </div>
      </div>
    </div>
  );
}
