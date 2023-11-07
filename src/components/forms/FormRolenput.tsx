"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormRolenput = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={"role"}
        render={({ field: { onChange, value } }) => (
          <FormItem className="space-y-3">
            <FormLabel>Select your role </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={onChange}
                defaultValue={value}
                className="flex flex-col space-y-1"
              >
                <div className="flex gap-6">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="seller" />
                    </FormControl>
                    <FormLabel className="font-normal">Seller</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="buyer" />
                    </FormControl>
                    <FormLabel className="font-normal">Buyer</FormLabel>
                  </FormItem>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default FormRolenput;
