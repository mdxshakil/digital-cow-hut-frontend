"use client";
import Container from "@/components/Container";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  Password: string;
};

export default function LoginPage() {
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen place-items-center gap-0 md:gap-12">
        <div className="hidden md:block">
          <Image
            src={"/img/auth/login.png"}
            alt="Login-Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} //
            loading="lazy"
            // className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl text-primary font-bold mb-3 ">
            Login to your account
          </h1>
          <Form submitHandler={onSubmit}>
            <FormInput
              type="email"
              name="email"
              placeholder="Your email"
              id="email"
              label="Email"
              required={true}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              label="Password"
              required={true}
            />
            <Button type="submit">Login</Button>
          </Form>
          <Link href={"/register"}>
            <p className="mt-2 text-primary text-sm">
              Don&apos;t have an account?
            </p>
          </Link>
        </div>
      </div>
    </Container>
  );
}
