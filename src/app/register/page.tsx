"use client";
import Container from "@/components/Container";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Form from "@/components/forms/Form";
import { FieldValues } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormRolenput from "@/components/forms/FormRolenput";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/utils/imageUploader";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [profilePicture, setProfilePicture] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [signup, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const result = await uploadImageToCloudinary(profilePicture);
    setLoading(false);
    signup({
      ...data,
      profilePicture: result.url,
      name: { firstName: data.firstName, lastName: data.lastName },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
      toast.success("Signup successful");
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
            src="/img/auth/register.png"
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
              Create a new account
            </h1>
            <FormInput
              name="firstName"
              type="text"
              id="firstName"
              placeholder="First name"
              label="First Name"
              required={true}
            />
            <FormInput
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Last name"
              label="Last Name"
              required={true}
            />
            <FormInput
              name="phoneNumber"
              type="text"
              id="phone"
              placeholder="Phone number"
              label="Phone Number"
              required={true}
            />
            <FormInput
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              label="Password"
              required={true}
            />
            <FormRolenput />
            <FormItem>
              <FormLabel>Select profile picture</FormLabel>
              <FormControl>
                <Input
                  required
                  type="file"
                  className="file:text-primary file:font-bold file:cursor-pointer"
                  accept="image/jpg, image/jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfilePicture(e?.target?.files?.[0])
                  }
                />
              </FormControl>
            </FormItem>
            <Button type="submit" disabled={isLoading || loading}>
              {isLoading || loading ? "Loading..." : "Register"}
            </Button>
          </Form>
          <Link href={"/register"}>
            <p className="mt-2 text-primary text-sm">
              Already have an account?
            </p>
          </Link>
        </div>
      </div>
    </Container>
  );
}
