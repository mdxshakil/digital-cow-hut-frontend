"use client";
import Container from "@/components/Container";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Form from "@/components/forms/Form";
import { FieldValues } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/utils/imageUploader";
import { useRouter } from "next/navigation";
import FormBreedInput from "@/components/forms/FormBreedInput";
import FormCategoryInput from "@/components/forms/FormCategoryInput";
import useGetUserFromStore from "@/hooks/useGetUserFromStore";
import toast from "react-hot-toast";
import { usePostNewCowMutation } from "@/redux/features/cow/cowApi";

export default function PostNewCowPage() {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useGetUserFromStore();
  const [postNewCow, { isError, isSuccess, isLoading }] =
    usePostNewCowMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const result = await uploadImageToCloudinary(image);
    setLoading(false);

    postNewCow({
      ...data,
      age: Number(data.age),
      price: Number(data.price),
      weight: Number(data.weight),
      label: "for sale",
      image: result.url,
      seller: userId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/my-cows");
      toast.success("New Cow posted successfully");
    }
    if (isError) {
      toast.error("An error occured");
    }
  }, [isSuccess, router, isError]);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 place-items-center">
        <div className="hidden md:block">
          <Image
            src="/img/add-cow.png"
            alt="register"
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} //
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-2/3">
          <Form submitHandler={onSubmit}>
            <h1 className="text-2xl text-primary font-bold mb-3 ">
              Post a new cow
            </h1>
            <FormInput
              name="name"
              type="text"
              id="name"
              placeholder="Cow name"
              label="Cow Name"
              required={true}
            />
            <div className="flex flex-col md:flex-row w-full gap-x-3 gap-y-6 md:gap-y-0">
              <FormInput
                name="age"
                type="number"
                id="age"
                placeholder="age"
                label="Cow Age"
                required={true}
              />
              <FormInput
                name="price"
                type="number"
                id="price"
                placeholder="Price"
                label="Cow Price"
                required={true}
              />
              <FormInput
                name="weight"
                type="number"
                id="weight"
                placeholder="Weight"
                label="Weight (kg)"
                required={true}
              />
            </div>
            <FormInput
              name="location"
              type="string"
              id="location"
              placeholder="Location"
              label="Location"
              required={true}
            />

            <div className="grid grid-cols-2 gap-x-3">
              <FormBreedInput />
              <FormCategoryInput />
            </div>
            <FormItem>
              <FormLabel>Select Cow Image</FormLabel>
              <FormControl>
                <Input
                  required
                  type="file"
                  className="file:text-primary file:font-bold file:cursor-pointer"
                  accept="image/jpg, image/jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e?.target?.files?.[0])
                  }
                />
              </FormControl>
            </FormItem>
            <Button type="submit" disabled={loading || isLoading}>
              {loading || isLoading ? "Loading..." : "Submit"}
            </Button>
          </Form>
          <Link href={"/my-cows"}>
            <p className="mt-2 text-primary text-sm">Go to my cows.</p>
          </Link>
        </div>
      </div>
    </Container>
  );
}
