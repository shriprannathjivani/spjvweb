"use client";

import Link from "next/link";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  BookOpen,
  Calendar,
  Home,
  User,
  Menu,
  Users,
  Baby,
  PhoneCall,
  University,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cva } from "class-variance-authority";



export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [open, setOpen] = React.useState(false);
  function ListItem({
    title,
    children,
    href,
    ...props
  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
      <li {...props}>
        <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="text-muted-foreground line-clamp-2">{children}</div>
        </div></Link>} />
      </li>
    )
  }
  const navigationMenucustom = cva(
    `text-lg bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`
  )
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  console.log(pathname)

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");
  const menuClass = (path: string) =>
    `flex flex-col p-3 items-center justify-center rounded-xl transition ${isActive(path)
      ? "bg-orange-500 text-white"
      : "bg-orange-100 hover:text-orange-500"
    }`;

  const tabmenuClass = (path: string) =>
    `flex flex-col items-center justify-center hover:text-orange-500 transition ${isActive(path)
      ? "text-orange-600 font-bold"
      : ""
    }`;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={clsx(
          "fixed top-0 w-full z-40 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white/80 backdrop-blur-sm border-b border-neut-darkest/15"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/spjv-logo.svg"
              alt="spjv logo"
              width={230}
              height={500}
              style={{ marginTop: -9 }}
            />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-6 text-lg">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem >
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} 
                  text-lg
                  px-4
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`} render={<Link href="/satguru" className={`link ${pathname?.includes("/satguru") ? 'text-orange-600 font-semibold' : ''}` + "hover:text-orange-600"} >सतगुरु व परमहंस</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} 
                  text-lg
                  px-4
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`} render={<Link href="/karyakram" className={`link ${pathname?.includes("/karyakram") ? 'text-orange-600 font-semibold' : ''}` + "hover:text-orange-600"}>कार्यक्रम</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} 
                  text-lg
                  px-4
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`} render={<Link href="/balkendra" className={`link ${pathname?.includes("/balkendra") ? 'text-orange-600 font-semibold' : ''}` + "hover:text-orange-600"}> बाल केंद्र</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} 
                  text-lg
                  px-4
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`} render={<Link href="/mandirseva" className={`link ${pathname?.includes("/mandirseva") ? 'text-orange-600 font-semibold' : ''}` + "hover:text-orange-600"}>मंदिर व सेवा</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} 
                  text-lg
                  px-4
                  bg-transparent
                  hover:bg-transparent
                  focus:bg-transparent
                  data-[state=open]:bg-transparent
                  data-[state=open]:hover:bg-transparent
                  hover:text-orange-500`} render={<Link href="/gyanbhandar" className={`link ${pathname?.includes("/gyanbhandar") ? 'text-orange-600 font-semibold' : ''}` + "hover:text-orange-600"}>ज्ञान भंडार </Link>} />
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger className="
                    text-lg
                    px-4
                    cursor-pointer
                    bg-transparent
                    hover:bg-transparent
                    focus:bg-transparent
                    data-[state=open]:bg-transparent
                    data-[state=open]:hover:bg-transparent
                    hover:text-orange-500
                  ">अधिक</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px]">
                      <li>
                        <NavigationMenuLink render={<Link href="/balkendra" className="!text-base">शिशु नामकरण </Link>} />
                        <NavigationMenuLink render={<Link href="/balkendra" className="!text-base">मासिक कैलेंडर (डाउनलोड) </Link>} />
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                संपर्क करें
              </Button>
            </Link>
          </nav>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTitle />
              <div className="flex items-center gap-3">
                <Button className="rounded-full border-2 border-black text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer">संपर्क करें</Button>
                <SheetTrigger asChild>
                  <Menu size={30} />
                </SheetTrigger>
              </div>

              <SheetContent side="bottom" className="w-[100vw] sm:w-[100%]">
                <span className="text-xl p-2 px-10 mt-2">क्विक मेनू</span>
                <nav className=" grid grid-cols-3 gap-4 text-lg mb-8 px-8">
                  <Link
                    href="/"
                    className={menuClass("/")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home size={24} />
                    <span className="text-base mt-2">होम</span>
                  </Link>

                  <Link
                    href="/satguru"
                    className={menuClass("/satguru")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users size={24} />
                    <span className="text-base mt-2">सतगुरु</span>
                  </Link>

                  <Link
                    href="/karyakram"
                    className={menuClass("/karyakram")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar size={24} />
                    <span className="text-base mt-2">कार्यक्रम</span>
                  </Link>

                  <Link
                    href="/balkendra"
                    className={menuClass("/balkendra")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Baby size={24} />
                    <span className="text-base mt-2">बाल केंद्र</span>
                  </Link>

                  <Link
                    href="/mandirseva"
                    className={menuClass("/mandirseva")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University size={24} />
                    <span className="text-base mt-2">मंदिर व सेवा</span>
                  </Link>

                  <Link
                    href="/gyanbhandar"
                    className={menuClass("/gyanbhandar")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen size={24} />
                    <span className="text-base mt-2">ज्ञान भंडार</span>
                  </Link>

                  <Link
                    href="/contact"
                    className={menuClass("/contact")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PhoneCall size={24} />
                    <span className="text-base mt-2">संपर्क करें</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header >

      {/* ================= MOBILE BOTTOM TABS ================= */}
      < nav
        className={
          clsx(
            "fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden",
            "transition-transform duration-300 ease-in-out",
            visible ? "translate-y-0" : "translate-y-full"
          )
        }
      >
        <div className="grid grid-cols-5 h-16">
          <Link href="/" className={tabmenuClass("/")}>
            <Home size={20} />
            <span className="text-sm mt-1">होम</span>
          </Link>
          <Link href="/satguru" className={tabmenuClass("/satguru")}>
            <Users size={20} />
            <span className="text-sm mt-1">सतगुरु</span>
          </Link>
          <Link href="/karyakram" className={tabmenuClass("/karyakram")}>
            <Calendar size={20} />
            <span className="text-sm mt-1">कार्यक्रम</span>
          </Link>
          <Link href="/balkendra" className={tabmenuClass("/balkendra")}>
            <Baby size={20} />
            <span className="text-sm mt-1">बाल केंद्र</span>
          </Link>



          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center hover:text-orange-500"
          >
            <Menu size={20} />
            <span className="text-sm mt-1">मेनू</span>
          </button>
        </div>
      </nav >
    </>
  );
}
