"use client";
import { ButtonEditCarProps } from "./ButtonEditCar.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import FormEditCar from "../FormEditCar/FormEditCar";

export default function ButtonEditCar(props: ButtonEditCarProps) {
  const { carData } = props;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenDialog(true)}>
          Edit
          <Pencil className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent>
          <DialogHeader>
            <FormEditCar setOpenDialog={setOpenDialog} carData={carData} />
          </DialogHeader>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
