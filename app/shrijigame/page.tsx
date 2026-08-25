"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Binoculars, BookOpenText, Calendar, Clock, Gauge, Globe, MapPin, MessageCircleQuestionMark, MessageSquareQuote, Timer } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import React, { useEffect, useMemo, useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { gamesList, sahiyogitaList } from "@/lib/gamesnquiz"
import data from '@/public/allvani/chopai.json';



const basePath =
  process.env.NODE_ENV === "production" ? "/" : "";

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [offsetY, setOffsetY] = useState(0);
 


  return (
    <>
      <div className="p-9 bg-white/4"></div>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">

        {/* ================= BACKGROUND LAYERS ================= */}
        <div className="absolute inset-0 -z-10">

          {/* PARALLAX BG */}
          <div className="absolute inset-0 scale-110 animate-[slowZoom_20s_linear_infinite]">
            {/* <Image
              src="/shrijigame/unnamed.png"
              fill
              alt=""
              className="object-cover"
            /> */}

            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover"
            >
              <source src={`${basePath}/shrijigame/343929_large.mp4`} type="video/mp4" />
            </video>
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* GRADIENT LIGHT */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-transparent to-[#4b2440]" />
        </div>

        {/* ================= BADGES ================= */}
        <div className="relative z-20 flex flex-wrap justify-center gap-4 mb-0 mt-8">
          {[
            { icon: <Globe size={20} />, text: "3D World", rotate: "-rotate-3" },
            { icon: <Binoculars size={20} />, text: "Epic Quests", rotate: "rotate-2" },
            { icon: <BookOpenText size={20} />, text: "Ancient Lore", rotate: "-rotate-1" }
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 ${item.rotate} hover:rotate-0 hover:scale-110 transition-all duration-300`}
            >
              {item.icon}
              <span className="font-bold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-20 text-center max-w-5xl px-6 py-8">

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl font-black  mb-6 
              [text-shadow:0_4px_20px_rgba(0,0,0,0.8),0_0px_40px_rgba(255,200,0,0.3)]">
            श्री जी <br />
            <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(255,200,0,0.8)]">
              3D वर्ल्ड गेम
            </span>
          </h1>

          {/* SUBTEXT */}
          <TextAnimate animation="blurInUp" by="line"
            delay={0.5}
            segmentClassName="p" startOnView className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            एक दिव्य 3D अनुभव, जहाँ खेल-खेल में खोजें ज्ञानकेन्द्र और जानें श्री जी की अद्भुत लीलाओं का इतिहास। ✨
          </TextAnimate>

          <div className="flex gap-4 items-start justify-center">
            {/* ================= AVATAR ================= */}
            <div className="relative mb-8 group flex justify-center sm:shrink-0">

              <div className="absolute -inset-4 bg-amber-400/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              </div>
              {/* IMAGE */}
              <Image
                src={`/shrijigame/bitaksearch_avtar.png`}
                alt=""
                width={320}
                height={320}
                className="relative z-10 drop-shadow-[0_50px_60px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="space-y-6 text-center lg:text-left mb-16">
                <div>
                  <TextAnimate animation="blurInUp" startOnView delay={0.3} className="mt-3 text-xl md:text-2xl text-white/80">
                    आइए खेलें एक दिव्य खेल और पाएं श्री जी का ज्ञान!

                    अब तक हमने श्री जी की लीलाओं को सुना, समझा और विश्वास किया…
                    लेकिन अब समय है उसे महसूस करने का
                  </TextAnimate>
                </div>

                <TextAnimate animation="blurInUp" by="line"
                  delay={0.5}
                  segmentClassName="p" startOnView className=" text-xl md:text-2xl text-white/80 mb-4">
                  इस 3D दुनिया में बच्चे:
                  ✨ ज्ञानकेन्द्र खोजेंगे
                  ✨ श्री जी की लीलाओं को जानेंगे
                  ✨ खेल-खेल में दिव्य ज्ञान प्राप्त करेंगे
                </TextAnimate>

              </div>
              {/* ================= BUTTON ================= */}
              <a target="_blank" href={`${basePath}/shrijigame/shrijiworld`} className="group group-hover:scale-110 inline-flex relative px-14 text-2xl 2xl overflow-hidden mb-12 cursor-pointer bg-linear-to-b from-[#ffd166] to-[#f7a400] text-[#422006] font-black py-4 rounded-3xl shadow-[0_4px_0_#b37700] active:translate-y-1 active:shadow-none transition-all  uppercase tracking-wider ">
                {/* ⚡ SHINE SWEEP */}
                <span className="absolute inset-0 
                bg-linear-to-r from-transparent via-white/50 to-transparent 
                translate-x-[-120%] group-hover:translate-x-[120%] 
                transition-transform duration-1000">
                </span>

                {/* 📝 TEXT */}
                <span className="relative z-10 text-[#422006] ">
                  3D गेम शुरू करें
                </span>
              </a>
              {/* <a href={`${basePath}/gamesnquiz/Khadokali`} className="ms-4 group group-hover:scale-110 inline-flex relative px-14 text-2xl 2xl overflow-hidden mb-12 cursor-pointer bg-linear-to-b from-[#ffd166] to-[#f7a400] text-[#422006] font-black py-4 rounded-3xl shadow-[0_4px_0_#b37700] active:translate-y-1 active:shadow-none transition-all  uppercase tracking-wider ">
                
                <span className="absolute inset-0 
                bg-linear-to-r from-transparent via-white/50 to-transparent 
                translate-x-[-120%] group-hover:translate-x-[120%] 
                transition-transform duration-1000">
                </span>

                <span className="relative z-10 text-[#422006] ">
                  खडोकली
                </span>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}