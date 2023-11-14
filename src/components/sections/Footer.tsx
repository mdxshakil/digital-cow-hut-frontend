import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../Container";

const socialLinks = [
  {
    href: "https://www.facebook.com",
    icon: <Facebook className="text-blue-500" />,
  },
  {
    href: "https://www.twitter.com",
    icon: <Twitter className="text-sky-300" />,
  },
  {
    href: "https://www.instagram.com",
    icon: <Instagram className="text-pink-500" />,
  },
  {
    href: "https://www.linkedin.com",
    icon: <Linkedin className="text-blue-400" />,
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
];

const usefulLinks = [
  { href: "/", label: "Terms and Conditions" },
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "FAQs" },
  { href: "/", label: "Customer Support" },
];

export default function Footer() {
  return (
    <Container>
      <footer className="border-t">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          <div className="text-xl md:text-2xl font-bold">
            <Link href={"/"} passHref>
              CowHut
            </Link>
            <p className="mt-2 text-xs text-justify text-gray-400">
              Welcome to Digital Cow Hut, where the world of cattle commerce
              meets modern convenience. Explore a seamless platform for buying
              and selling cows with ease. Your trusted marketplace for all
              things bovine – bringing farmers and buyers together in the
              digital age.
            </p>
            <div className="flex mt-4">
              <Input type="email" placeholder="Email" />
              <Button variant={"secondary"}>Subscribe</Button>
            </div>
            <div className="flex justify-center mt-4 space-x-4 lg:mt-2">
              {socialLinks.map(({ href, icon }, index) => (
                <Link href={href} key={index} passHref>
                  {icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              {quickLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link href={href} passHref>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Useful Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              {usefulLinks.map(({ href, label }, index) => (
                <li key={index}>
                  <Link href={href} passHref>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <p className="text-center pb-2">
            @2024 All rights reserved by Digital Cow Hut.
          </p>
        </div>
      </footer>
    </Container>
  );
}
