"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/BaseImage";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { LogOut, SearchAlertIcon } from "lucide-react";

export default function HeaderDashboard() {
 const pathname = usePathname()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    const expiry = sessionStorage.getItem("expiry");

    if (!auth || !expiry || Date.now() > Number(expiry)) {
      sessionStorage.clear();
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
    window.location.replace("/login");
  };

  if (loading) return null;
  return (
      <div className="w-full transition-all duration-300 ease-in-out bg-white backdrop-blur-sm border-b border-neut-darkest/15 sticky top-0 z-50 ">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
          >
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/spjv-logo.svg"
                alt="spjv logo"
                width={200}
                height={500}
                style={{ marginTop: -9 }}
              />
            </Link>
          </motion.div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9  rounded-full border-2 border-black bg-orange-100 flex items-center justify-center text-base font-bold text-orange-600">
                S
              </div>
              <div className="flex flex-col justify-start items-center">
                <span className="text-sm">सुंदरसाथ</span>
                <span className="relative rounded-full inline-flex items-center bg-white px-2 py-0 text-[10px] font-xl inset-ring text-violet-600 inset-ring-violet-500/10">एडमिन</span>
              </div>
            </div>
            {/* Logout */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full border-2 border-black px-4 py-4 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
            >
              लॉगआउट <LogOut size={20} />
            </Button>

          </div>
        </div>
      </div>
  )
}
