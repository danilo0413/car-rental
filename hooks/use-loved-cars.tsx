import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";
import { Car } from "@prisma/client";

interface UseLovedCarsType {
  lovedItems: Car[];
  addLovedItems: (data: Car) => void;
  removeLovedItems: (id: string) => void;
}

export const useLovedCars = create(
  persist<UseLovedCarsType>(
    (set, get) => ({
      lovedItems: [],
      addLovedItems: (data: Car) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(
          (item) => item.id == data.id
        );

        if (existingItem) {
          return toast({
            title: "The car already exists in the list",
          });
        }

        set({
          lovedItems: [...get().lovedItems, data],
        });

        toast({
          title: "Car added to list",
        });
      },

      removeLovedItems: (id: string) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)],
        });
        toast({
          title: "Car removed from list",
        });
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
