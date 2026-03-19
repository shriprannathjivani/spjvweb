"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { CarouselDots } from "@/components/carousel-dots"
import React, { useEffect, useRef, useState } from "react";
import { BookOpenCheck, CircleQuestionMark, CircleUserRound, Clock, Eye, Gamepad2, Info, Mail, Sun, User, UsersRound } from "lucide-react";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { TextAnimate } from "@/components/ui/text-animate";
import { Ripple } from "@/components/ui/ripple";
import { bitakSahebList } from "@/lib/bitaksaheb"
import { motion, AnimatePresence } from "framer-motion";
export function getYouTubeId(url: string) {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:.*v=|embed\/)|youtu\.be\/)([^?&]+)/;

  const match = url.match(regExp);
  return match ? match[1] : "";
}
export default function Faq() {
  const [active, setActive] = useState(bitakSahebList[0]);
  const videoId = getYouTubeId(active.link);
  return (
    <section className="max-w-7xl relative  mx-auto px-6 py-10 pt-0  font-arya ">
      <div className=" relative flex h-125 w-full overflow-hidden flex-col items-center justify-center text-center">
        <TextAnimate animation="blurInUp" by="line"
          delay={0.1}
          segmentClassName="block" startOnView className="text-red-600 text-xl block mb-4">
          {`|| प्रीतम मेरे प्राण के सुंदरसाथ जी ||`}
        </TextAnimate>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-3">
          <TextAnimate animation="blurInUp" startOnView delay={0.3}>
            श्री बीतक साहेब  &nbsp;
          </TextAnimate>{"  "}
          <TextAnimate animation="blurInUp" startOnView delay={0.5} className="text-orange-500">
            का अद्भुत सिलसिला
          </TextAnimate>
        </h2>
        <TextAnimate animation="blurInUp" by="line"
          delay={0.3}
          segmentClassName="block" startOnView className="text-muted-foreground text-xl  mb-24">
          {`क्या हम तैयार हैं अपनी रहनी (आचरण) में 30 सकारात्मक बदलावों के लिए?`}
        </TextAnimate>
        <Ripple />
      </div>
      <div className="mx-auto mt-[-140]">

        <div className="mx-auto grid lg:grid-cols-3 gap-6">

          {/* 🔥 LEFT: MAIN VIDEO (STICKY) */}
          <div className="lg:col-span-2 min-h-[500px]">

            <div className="lg:sticky lg:top-24  space-y-4">

              {/* Video */}
              <div className="relative rounded-3xl overflow-hidden bg-black shadow">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-[220px] sm:h-[350px] lg:h-[460px]"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
                {/* TITLE */}
                <h1 className="text-lg md:text-xl font-semibold mb-2">
                  {active.title}
                </h1>
                <span className="mb-4 inline-flex text-xs text-gray-500">
                  <CircleUserRound size={16} className="text-xs text-orange-500 me-2" />{active.speaker} <Sun size={16} className="text-xs text-orange-500 ms-2 me-2" />{active.date.day} {active.date.month} {active.date.year}</span>
              </div>
              {/* CHANNEL + META */}
              <div className="flex items-center justify-between flex-wrap gap-4 mt-2">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                  {/* Avatar */}
                  <div className="">
                    <Image src="/channelsspjv.jpg" width={50} height={50} alt="chennal name" className="w-12 h-12 rounded-full object-cover border-2 border-orange-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">श्री प्राणनाथ जी की वाणी</p>
                    <p className="text-xs text-gray-500">
                      👁 28.8K + सब्सक्राइबर्स
                    </p>
                  </div>

                  {/* Subscribe */}
                  <a href={`https://www.youtube.com/@ShriPrannathJiVani`}
                    target="_blank" className="ml-3 px-4 py-1.5  text-sm bg-orange-900 text-white rounded-full hover:scale-105 transition border-2 border-orange-400 cursor-pointer">
                    सब्सक्राइबर्स
                  </a>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-2 flex-wrap">

                  {/* Quiz */}
                  {active.qa?.link && (
                    <a
                      href={active.qa.link}
                      target="_blank"
                      className="px-3 py-1.5 text-sm inline-flex items-center rounded-full bg-white border-2 cursor-pointer border-black hover:scale-105 transition"
                    >
                      <BookOpenCheck size={16} className="text-xs text-orange-500 me-2" /> क्विज़
                    </a>
                  )}

                  {/* Game */}
                  {active.game?.link && (
                    <a
                      href={active.game.link}
                      target="_blank"
                      className="px-3 py-1.5 text-sm inline-flex items-center rounded-full bg-white cursor-pointer border-2 border-black hover:scale-105 transition"
                    >
                      <Gamepad2 size={16} className="text-xs text-orange-500 me-2" />  गेम
                    </a>
                  )}

                  {/* Subscribe */}
                  <a href={active.link}
                    target="_blank" className="ml-3 px-4 py-1.5 inline-flex items-center  text-sm bg-orange-600 text-white rounded-full hover:scale-105 transition border-2 border-black cursor-pointer">
                    <Eye size={16} className="text-xs text-white me-2" /> लाइव देखें
                  </a>
                </div>
              </div>

              {/* QUOTE + SANDESH */}
              <div className="grid  gap-4 mt-4">

                {/* Quote */}
                {active.quote?.text && (
                  <div className="border-t-1  p-4 text-sm ">
                    “{active.quote.text}”
                    <p className="text-xs text-gray-500 mt-2 text-left">
                      – {active.quote.author}
                    </p>
                  </div>
                )}
                
              </div>
            </div>
          </div>

          {/* 🎬 RIGHT: PLAYLIST (STICKY) */}
          <div className="pr-1 space-y-3 z-10">

            {bitakSahebList.map((item: any, index: number) => {
              const isActive = active === item;
              const videoId = getYouTubeId(item.link);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              return (
                <motion.div
                  key={index}
                  onClick={() => setActive(item)}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.0
                  }}
                  className={`flex gap-3 p-2 rounded-3xl cursor-pointer transition border
                    ${isActive
                      ? "bg-orange-50 border-orange-300"
                      : "hover:bg-orange-50 hover:border-orange-300 border-transparent"
                    }
                  `}
                >

                  {/* Thumbnail */}
                  <div className="relative w-42 h-30 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={thumbnail}
                      className="w-full h-full object-cover"
                    />

                    {item.time && (
                      <span className="absolute bottom-1 right-1 text-[10px] bg-black/80 text-white px-1 rounded">
                        {item.time}
                      </span>
                    )}
                    {/* Now Playing */}
                    {isActive && (
                      <p className="absolute bottom-1 left-1 text-[10px] text-[10px] rounded-full px-3 py-1  mb-2 inset-ring text-white bg-rose-600   inset-ring-rose-500/10 mt-1 font-medium">
                        ▶ देख रहे
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-2 inset-ring  text-rose-600 bg-rose-50   inset-ring-rose-500/10">Day: {index}</span>
                    <h3 className="text-base font-medium line-clamp-3">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-gray-500 mt-1 inline-flex">
                      <CircleUserRound size={14} className="text-xs text-gray-500 me-1" />{item.speaker}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}