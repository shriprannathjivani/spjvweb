"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots"
import React from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const events = [
  {
    title: "18वें वार्षिकोत्सव में श्री प्राणनाथ जी वाणी स्टॉल",
    location: "श्री प्राणनाथ ज्ञानपीठ, सटसवा",
    date: "Jan 31, 2026",
    image: "/event5.png",
  },
  {
    title: "परमहंस श्री रामरतन दास महाराज जी की बीतक",
    location: "श्री प्राणनाथ जी वाणी ज़ूम",
    date: "Feb 10, 2026",
    image: "/event2.png",
  },
  {
    title: "श्री कृष्ण त्रिधा लीला पुस्तक वितरण",
    location: "श्री प्राणनाथ जी वाणी ज़ूम",
    date: "Mar 05, 2026",
    image: "/event3.png",
  },
  {
    title: "‘अष्ट प्रहर-आत्माओं की रहनी’ डायरी वितरण",
    location: "श्री प्राणनाथ जी वाणी ज़ूम",
    date: "Mar 05, 2026",
    image: "/event4.png",
  },
];

export default function Events() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);


  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            आगामी इवेंट
            <p className="text-xl text-gray-500">
              श्री प्राणनाथ जी वाणी ज़ूम इवेंट की कुछ झलकियाँ
            </p>
          </h2>

          {/* Right */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xl text-orange-900 mt-0 mb-2">इस साल 600+ से ज्यादा सुंदरसाथ इसमें हिस्सा ले चुके हैं।</p>
              <Button
                variant="outline"
                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
              >
                सभी इवेंट देखें
              </Button>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
              <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
              <img src="/ramratandasji.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
              <img src="/sarkarshree.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
              <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </div>
          </div>
        </div>


        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ================= LEFT IMAGE ================= */}
          <div className="lg:col-span-1 relative rounded-2xl overflow-hidden h-90">
            <Image
              key={events[activeIndex].image}
              src={events[activeIndex].image}
              alt={events[activeIndex].title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-opacity duration-700"
            />

            <div className="absolute bottom-4 left-4 text-white text-xl font-medium">
              {events[activeIndex].title}
            </div>
          </div>

          {/* ================= RIGHT EVENT LIST ================= */}
          <div className="flex flex-col divide-y ">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  "flex items-center justify-between py-4 text-left transition cursor-pointer",
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80"
                )}
              >
                <div className="text-base text-gray-800">
                  

                 <p className="text-xl text-orange-900 mt-0 mb-2">{event.title}</p> 
                 {event.location}
                </div>
                <div className="text-orange-700 font-medium text-xl">
                  {event.date}
                </div>
              </button>
            ))}
          </div>
        </div>



        {/* Cards Carousel */}
        <div className="mt-20 relative">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            महोत्सव गैलरी
          </h2>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                {
                  title: "श्री प्राणनाथ जी की शिक्षा",
                  img: "/gallery1.png",
                },
                {
                  title: "एसपीजेवी कार्यक्रम",
                  img: "/gallery2.png",
                },
                {
                  title: "व्यक्तिगत कोचिंग",
                  img: "/gallery3.png",
                },
                {
                  title: "व्यक्तिगत कोचिंग",
                  img: "/gallery3.png",
                },
                {
                  title: "व्यक्तिगत कोचिंग",
                  img: "/gallery3.png",
                },
                {
                  title: "व्यक्तिगत कोचिंग",
                  img: "/gallery3.png",
                }
              ].map((card, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/3 basis-[85%]"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-lg">
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={500}
                      height={300}
                      className="h-56 w-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* title */}
                    <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                      {card.title}
                    </h3>
                  </div>
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
                 text-gray-500 hover:bg-orange-50 hover:text-orange-500  cursor-pointer"
                />
                <CarouselNext
                  className="static h-10 w-10 mt-5 rounded-full border border-orange-500
                 text-orange-500 hover:bg-orange-50  cursor-pointer"
                />
              </div>
            </div>
          </Carousel>
        </div>

      </div>
    </section>
  );
}


