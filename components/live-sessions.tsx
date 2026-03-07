"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselApi,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots"
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TextAnimate } from "./ui/text-animate";
import { motion } from "framer-motion";

const liveSession = [
  {
    title: "चितवन",
    img: "/livesession1.png",
    day: "सोमवार – शुक्रवार",
    time: "04:45 AM से 05:45 AM",
    link: "https://www.youtube.com/@ShriPrannathJiVani/streams"
  },
  {
    title: "श्री बीतक साहेब यात्रा",
    img: "/livesession2.png",
    day: "सोमवार – शुक्रवार",
    time: "06:00 AM से 07:00 AM",
    link: "https://www.youtube.com/@ShriPrannathJiVani/streams"
  },
  {
    title: "श्री सिद्ध मंथन",
    img: "/livesession3.png",
    day: "सोमवार – शुक्रवार",
    time: "07:00 AM से 07:30 AM",
    link: "https://www.youtube.com/@ShriPrannathJiVani/streams"
  },
  {
    title: "बाल आत्मदर्शनम्",
    img: "/balad.png",
    day: "रविवार",
    time: "03:00 PM से 04:00 PM",
    link: "https://www.youtube.com/@ShriPrannathJiVani/streams"
  }
]

export default function LiveSessions() {
  const [api, setApi] = React.useState<CarouselApi>()
  return (
    <section className="relative  py-10 ">
      {/* Decorative gradient bg-[radial-gradient(circle_at_top_left,rgba(255,128,0,0.35),transparent_70%)] */}
      <div className="absolute left-0 top-0 h-48 w-48 " />
      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute top-1 left-0 z-0 motion-safe:animate-wiggle w-17.5 h-auto sm:w-37.5 sm:h-auto" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div className="max-w-7xl">
            <TextAnimate
              animation="blurInUp"
              startOnView
              by="line"
              delay={0.3}
              segmentClassName="block"
              className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4"
            >
              {`श्री प्राणनाथ जी वाणी \nके साथ लाइव सेशन`}
            </TextAnimate>
          </div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}>
            <Button
              variant="outline"
              className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
            >
              सभी लाइव सेशन देखें
            </Button>
          </motion.div>
        </div>

        {/* Cards */}
        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          className=""
        >
          <CarouselContent>
            {liveSession.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/4 basis-[85%] relative"
              >
                <motion.div
                  key={index}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2
                  }}

                >
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-4xl bg-white shadow-md"
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Title overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white text-lg font-semibold whitespace-pre-line">
                        {item.title}
                      </p>
                      <p className="text-sm text-white">{item.day}</p>
                      <p className="text-sm text-white" >{item.time}</p>
                      {/* Button */}
                      <Link target="_blank" className="text-white flex items-center justify-end gap-4 mt-4 w-full" href={item.link}>
                        लाइव सेशन देखें <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white-500 text-white-500 cursor-pointer hover:bg-orange-600 hover:text-white">
                          <ArrowUpRight size={20} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Controls */}
          <div className="mt-6 flex items-center justify-between">
            <CarouselDots api={api} />

            {/* Arrows */}
            <div className="flex gap-3">
              <CarouselPrevious
                className="static h-10 w-10 mt-5 rounded-full border border-gray-300
                                   text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer"
              />
              <CarouselNext
                className="static h-10 w-10 mt-5 rounded-full border border-orange-500
                                   text-orange-500 hover:bg-orange-50 cursor-pointer"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
