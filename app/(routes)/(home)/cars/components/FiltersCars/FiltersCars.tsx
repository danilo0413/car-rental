import * as React from "react";
import { FiltersCarsProps } from "./FiltersCars.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export function FiltersCars(props: FiltersCarsProps) {
  const { clearFilters, setFilters, filters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };
  return (
    <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-2">
      <Select
        onValueChange={(value) => handleFilter("type", value)}
        value={filters.type}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vehicle type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Vehicle Type</SelectLabel>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="coupe">Coupe</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="familiar">Familiar</SelectItem>
            <SelectItem value="luxe">Luxe</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilter("transmission", value)}
        value={filters.transmission}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gear shifting" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gear shifting</SelectLabel>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="automatic">Automatic</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilter("engine", value)}
        value={filters.engine}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type of engine" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type of engine</SelectLabel>
            <SelectItem value="gasoline">Gasoline</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilter("people", value)}
        value={filters.people}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Number of people" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Number of people</SelectLabel>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="7">7</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={clearFilters}>
        Remove items <Trash className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
