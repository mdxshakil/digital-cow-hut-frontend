"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormCategoryInput() {
  const { control } = useFormContext();
  const categories = ["Dairy", "Beef", "Dual Purpose"];
  return (
    <>
      <Controller
        control={control}
        name={"category"}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select cow category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category, i) => (
                  <SelectItem key={i} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
