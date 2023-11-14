"use client";
import Container from "@/components/Container";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import React from "react";
import Loading from "../loading";
import { useGetMyProfileQuery } from "@/redux/features/profile/profileAPi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ProfilePage() {
  //protect route
  const { isLoading } = useAuthCheck();
  const {
    data: profile,
    isLoading: profileLoading,
    isError,
    error,
  } = useGetMyProfileQuery(undefined);
  const { phoneNumber, profilePicture, role, name, income } =
    profile?.data || {};

  if (isLoading || profileLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <Card>
            <CardHeader className="flex items-center">
              <Image
                src={profilePicture}
                alt={name?.firstName}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "60%", height: "auto" }} //
                loading="lazy"
                className="aspect-square object-cover rounded-full border-primary transition-all duration-300 hover:scale-105"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-center">
                {name?.firstName + " " + name?.lastName}
              </CardTitle>
              <p className="text-center text-primary tracking-wider my-2">
                {role?.toUpperCase()}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 mb-6 md:mb-0">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>First name</TableCell>
                    <TableCell>{name?.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>{name?.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>{phoneNumber}</TableCell>
                  </TableRow>
                  {role === "seller" && (
                    <>
                      <TableRow>
                        <TableCell>Total Income</TableCell>
                        <TableCell>{income}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Cow Sold</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                    </>
                  )}
                  {role === "buyer" && (
                    <TableRow>
                      <TableCell>Total Cow Purchase</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
