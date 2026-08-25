"use client";

import Link from "next/link";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from 'next/navigation'
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
  FolderSymlink,
  BookUser,
  BookOpenCheck,
  UserRound,
  MoonStar,
  LogIn,
  ShieldUser,
  CircleUserRound,
  Key,
  LogOut,
  CirclePower,
  SearchAlertIcon,
  BookSearch,
  Search,
  Gamepad2,
  MessageCircleQuestionMark,
  Scroll,
  BookA,
  UserCheck2,
  UserRoundCog,
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
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const basePath =
  process.env.NODE_ENV === "production" ? "" : "";

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const protectedRoutes = ["/dashboard"];
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

  function isUserLoggedIn() {
    const auth = sessionStorage.getItem("auth");
    const expiry = sessionStorage.getItem("expiry");

    if (!auth || !expiry) return false;

    return Date.now() <= Number(expiry);
  }
  // ✅ FIXED: proper sync
  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, [pathname]);

  // ✅ FIXED: logout
  const logout = () => {
    sessionStorage.clear();
    router.replace(`/`);
  };
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
  // ✅ FIXED: prevent redirect loop
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    const expiry = sessionStorage.getItem("expiry");

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isLoginPage = pathname === "/login";

    if ((!auth || !expiry || Date.now() > Number(expiry)) && isProtected) {
      sessionStorage.clear();
      router.replace(`${basePath}/login`);
      setLoggedIn(false);
    } else {
      setLoggedIn(!!auth && Date.now() <= Number(expiry));
    }

    setLoading(false);
  }, [pathname, router]);
  //console.log(pathname)

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
        <div className="mx-auto flex h-18 w-full max-w-370 items-center justify-between px-4 lg:px-8">
          <div className="flex">
            {/* Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
            >
              <Link href={`/`} className="flex items-center me-4">
                <Image
                  src="/spjv-logo.svg"
                  alt="spjv logo"
                  width={230}
                  height={500}
                  style={{ marginTop: -9 }}
                />
              </Link>
            </motion.div>
            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden lg:flex items-center gap-6 text-lg">
              <NavigationMenu>
                <NavigationMenuList>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1
                    }}
                  >
                    <NavigationMenuItem >
                      <NavigationMenuLink className={cn("text-lg px-4 py-2 me-1 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/satguru") ? "bg-black/6" : "bg-transparent")} render={<Link href="/satguru" className={cn("link flex items-center gap-2", pathname?.includes("/satguru") ? "text-orange-600" : "text-black hover:text-orange-600")} >परमहंस</Link>} />
                    </NavigationMenuItem>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3
                    }}
                  >
                    <NavigationMenuItem  >
                      <NavigationMenuTrigger className={cn("text-lg px-4 me-1 py-5.5 rounded-full hover:bg-black/6! focus:bg-black/6! data-[state=open]:bg-black/6! data-open:bg-black/6! data-open:hover:bg-black/6! data-popup-open:bg-black/6! data-popup-open:hover:bg-black/6!  transition-all duration-200 cursor-pointer", pathname?.includes("/gamesnquiz") ? "text-orange-600 bg-black/6" : "text-black hover:text-orange-600 bg-transparent")} >क्विज़</NavigationMenuTrigger>

                      <NavigationMenuContent className="">
                        <ul className="grid w-60 p-2">
                          <li>
                            <NavigationMenuLink className="inline-flex" render={<Link href="/gamesnquiz#game" className="text-lg! my-0.5 px-4 py-1 border border-transparent hover:text-orange-500 bg-transparent hover:bg-gray rounded-full! focus:bg-transparent"><Gamepad2 size={24} />गेम क्विज़</Link>} />
                            <NavigationMenuLink className="inline-flex" render={<Link href="/gamesnquiz#google" className="text-lg! my-0.5 px-4 py-1 border border-transparent hover:text-orange-500 bg-transparent hover:bg-gray rounded-full! focus:bg-transparent"><MessageCircleQuestionMark size={24} />गूगल क्विज़ </Link>} />
                            <NavigationMenuLink className="inline-flex" render={<Link href="/gamesnquiz#live" className="text-lg! my-0.5 px-4 py-1 border border-transparent hover:text-orange-500 bg-transparent hover:bg-gray rounded-full! focus:bg-transparent"><Scroll size={24} />लाइव क्विज़</Link>} />
                            <NavigationMenuLink className="inline-flex" render={<Link href="/gamesnquiz#antakshari" className="text-lg! my-0.5 px-4 py-1 border border-transparent hover:text-orange-500 bg-transparent hover:bg-gray rounded-full! focus:bg-transparent"><BookOpenCheck size={24} />ब्रह्मवाणी अंताक्षरी</Link>} />
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4
                    }}
                  >
                    <NavigationMenuItem>
                      <NavigationMenuLink className={cn("text-lg px-4 py-2 me-1 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/shrijigame") ? "bg-black/6" : "bg-transparent")} render={<Link href="/shrijigame" className={cn("link flex items-center gap-2", pathname?.includes("/shrijigame") ? "text-orange-600" : "text-black hover:text-orange-600")} >श्री जी गेम</Link>} />
                    </NavigationMenuItem>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5
                    }}
                  >
                    <NavigationMenuItem>
                      <NavigationMenuLink className={cn("text-lg px-4 py-2 me-1 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/balkendra") ? "bg-black/6" : "bg-transparent")} render={<Link href="/balkendra" className={cn("link flex items-center gap-2", pathname?.includes("/balkendra") ? "text-orange-600" : "text-black hover:text-orange-600")} >आत्मदर्शनम्</Link>} />
                    </NavigationMenuItem>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6
                    }}
                  >
                    <NavigationMenuItem>
                      <NavigationMenuLink className={cn("text-lg px-4 py-2 me-1 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/gyanbhandar") ? "bg-black/6" : "bg-transparent")} render={<Link href="/gyanbhandar" className={cn("link flex items-center gap-2", pathname?.includes("/gyanbhandar") ? "text-orange-600" : "text-black hover:text-orange-600")} >ज्ञान भंडार</Link>} />
                    </NavigationMenuItem>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7
                    }}
                  >
                    <NavigationMenuItem>
                      <NavigationMenuLink className={cn("text-lg px-4 py-2 me-1 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/mandirseva") ? "bg-black/6" : "bg-transparent")} render={<Link href="/mandirseva" className={cn("link flex items-center gap-2", pathname?.includes("/mandirseva") ? "text-orange-600" : "text-black hover:text-orange-600")} >मंदिर</Link>} />
                    </NavigationMenuItem>
                  </motion.div>

                  {loggedIn ? (
                    <>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.5
                        }}
                      >
                        <NavigationMenuItem>
                          <NavigationMenuLink className={cn("text-lg px-4 me-1 py-2 rounded-full hover:bg-black/6 focus:bg-black/6 data-[state=open]:bg-black/5 transition-all duration-200 cursor-pointer text-black hover:text-orange-500", pathname?.includes("/dashboard") ? "bg-black/6" : "bg-transparent")} render={<Link href="/dashboard" className={cn("link flex items-center gap-2", pathname?.includes("/dashboard") ? "text-orange-600" : "text-black hover:text-orange-600")} >चौपाइ खोजें</Link>} />
                        </NavigationMenuItem>
                      </motion.div>
                    </>) : (<>
                    </>)}

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
            </nav>
          </div>


          {loggedIn ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <motion.div
                    className="hidden lg:flex"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6
                    }}
                  >
                    <NavigationMenuItem data-align="end">
                      <NavigationMenuTrigger className={cn("text-lg px-4 me-1 py-5.5 rounded-full hover:bg-black/6! focus:bg-black/6! data-[state=open]:bg-black/6! data-open:bg-black/6! data-open:hover:bg-black/6! data-popup-open:bg-black/6! data-popup-open:hover:bg-black/6!  transition-all duration-200 cursor-pointer", pathname?.includes("/logout") ? "text-orange-600 bg-black/6" : "text-black hover:text-orange-600 bg-transparent")} > <CircleUserRound className="pe-2" size={32} /> सुंदरसाथ</NavigationMenuTrigger>

                      <NavigationMenuContent className="inline-flex" data-align="end">
                        <ul className="grid w-auto p-2">
                          <li>
                            <NavigationMenuLink
                              className="inline-flex cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault(); // Stop default navigation link behavior
                                setIsMenuOpen(false);
                                logout();
                              }}
                              render={
                                <span className="text-lg! my-0.5 px-4 py-1 flex items-center gap-2 border border-transparent hover:text-orange-500 bg-transparent hover:bg-gray rounded-full! focus:bg-transparent ">
                                  <LogOut size={24} />  लॉगआउट
                                </span>
                              }
                            />
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                  </motion.div>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          ) : (
            <motion.div
              className="hidden lg:flex"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-black px-6 py-5 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                >
                  संपर्क करें
                </Button>
              </Link>
            </motion.div>
          )}


          {/* ================= MOBILE MENU BUTTON ================= */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTitle />
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                ><Button className="rounded-full border-2 border-black text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer">संपर्क करें</Button>
                </Link>
                <SheetTrigger asChild>
                  <Menu size={30} />
                </SheetTrigger>
              </div>

              <SheetContent side="bottom" className="w-screen sm:w-full">
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
                    <span className="text-base mt-2">परमहंस</span>
                  </Link>

                  <Link
                    href="/bitakSahebRrdji"
                    className={menuClass("/bitakSahebRrdji")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MoonStar size={24} />
                    {/* <Image src="/ic_shrirrdji2.png" alt="ic_shrirrdji2" height={34} width={34} /> */}
                    <span className="text-base mt-2 line-clamp-1 text-center">प्रेम का चाँद</span>
                  </Link>

                  <Link
                    href="/bitakSaheb"
                    className={menuClass("/bitakSaheb")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpenCheck size={24} />
                    {/* <Image src="/ic_bitaksaheb.png" alt="ic_bitaksaheb" height={34} width={34} /> */}
                    <span className="text-base mt-2 line-clamp-2 text-center">बीतक साहेब</span>
                  </Link>

                  <Link
                    href="/gamesnquiz"
                    className={menuClass("/gamesnquiz")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar size={24} />
                    <span className="text-base mt-2">क्विज़</span>
                  </Link>

                  <Link
                    href="/balkendra"
                    className={menuClass("/balkendra")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Baby size={24} />
                    <span className="text-base mt-2">आत्मदर्शनम्</span>
                  </Link>

                  <Link
                    href="/mandirseva"
                    className={menuClass("/mandirseva")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <University size={24} />
                    <span className="text-base mt-2">मंदिर</span>
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

                  {loggedIn ? (
                    <>
                      <Link
                        href="/dashboard"
                        className={menuClass("/dashboard")}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Search size={24} />
                        <span className="text-base mt-2">चौपाइ खोजें</span>
                      </Link>
                      <button
                        className={menuClass("/logout")}
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                      >
                        <CirclePower size={24} />
                        <span className="text-base mt-2">लॉगआउट</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className={menuClass("/login")}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Key size={24} />
                      <span className="text-base mt-2"> लॉगिन </span>
                    </Link>
                  )}
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
        <div className="grid grid-cols-[repeat(5,minmax(0,auto))]  h-16">
          <Link href="/" className={tabmenuClass("/")}>
            <Home size={20} />
            <span className="text-sm mt-1">होम</span>
          </Link>
          <Link href="/satguru" className={tabmenuClass("/satguru")}>
            <Users size={20} />
            <span className="text-sm mt-1">परमहंस</span>
          </Link>
          <Link href="/gamesnquiz" className={tabmenuClass("/gamesnquiz")}>
            <BookOpenCheck size={20} />
            <span className="text-sm mt-1">क्विज़</span>
          </Link>
          <Link href="/balkendra" className={tabmenuClass("/balkendra")}>
            <Baby size={20} />
            <span className="text-sm mt-1">आत्मदर्शनम्</span>
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
