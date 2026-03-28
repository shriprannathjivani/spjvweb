"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/BaseImage";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { LogOut, SearchAlertIcon } from "lucide-react";
import HeaderDashboard from "../header";
export default function Dashboard() {
  const pathname = usePathname()
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const cards = [
    {
      title: "श्री बीतक साहेब खोज",
      desc: `अब आप "श्री बीतक साहेब" चोपाई को खोज सकते हैं या सभी अध्याय पढ़ सकते हैं।`,
      image: "/ic_bitaksaheb.png",
      link: "/bitaksearch",
    },
    {
      title: "श्री सागर खोज",
      desc: `अब आप "श्री सागर साहेब" चोपाई को खोज सकते हैं या सभी अध्याय पढ़ सकते हैं।`,
      image: "/ic_book_search.png",
      link: "/sagarsearch",
    },
    {
      title: "श्री सिंगार खोज",
      desc: `अब आप "श्री सिंगार साहेब" चोपाई को खोज सकते हैं या सभी अध्याय पढ़ सकते हैं।`,
      image: "/ic_book_open.png",
      link: "/singarsearch",
    },
  ];
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // ⏰ Time
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // 📅 Date
      setDate(
        now.toLocaleDateString("hi-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
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
    <section className="min-h-screen bg-gray-50 ">
      {/* 🔥 DASHBOARD NAV */}
      <HeaderDashboard />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Heading */}
        <div className="flex flex-row md:flex-row md:items-center md:justify-between gap-4 mb-6">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              सुप्रभात, सुंदरसाथ
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              आज का दिन आध्यात्मिक उन्नति के लिए एक नया अवसर है
            </p>
          </div>

          {/* RIGHT (DATE + TIME) */}
          <div className="text-left md:text-right shrink-0">
            <p className="text-lg font-semibold text-gray-900">
              {date}
            </p>
            <p className="text-sm text-gray-500">
              {time}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={card.link}
                className="relative group block rounded-2xl overflow-hidden border bg-linear-to-br from-gray-50 to-white p-5 transition"
              >

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm text-gray-500 w-[60%]">
                    {card.desc}
                  </p>

                  <button className="rounded-full border-2 mt-4 border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition cursor-pointer">
                    खोज शुरू करें
                  </button>
                </div>

                {/* Image */}
                <div className="absolute right-0 bottom-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}