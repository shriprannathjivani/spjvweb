"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import Testimonials from "@/public/Testimonials.json";
import Lottie from "lottie-react";
import {
  Carousel,
  CarouselContent,
  CarouselApi,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MessageSquareQuote } from "lucide-react";
import { CarouselDots } from "@/components/carousel-dots"
import React from "react";

import { BOOKS } from "@/lib/gyankendra"
import Link from "next/link";
import { motion } from "framer-motion";


export default function BooksCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  return (
    <section className="relative py-10 sm:py-20 sm:pt-0 pt-0">

      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute top-1 right-0 z-0 motion-safe:animate-wiggle w-[70px] h-auto
          sm:w-[150px] sm:h-auto rotate-[3.142rad]" />
      <div className="max-w-370 mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-14">
          पुस्तकालय
          <p className="text-lg mt-2 text-gray-600">एक कदम अखंड आनंद की ओर</p>
        </h2>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          className=""
        >
          <CarouselContent>
            {BOOKS.map((book, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/5 basis-[85%] relative"
              >
                <motion.div
                  key={index}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2
                  }}
                  className="h-full"
                >
                  <div className="card-circle">{index + 1}</div>
                  <div className="h-full rounded-3xl bg-white p-8 flex flex-col items-center text-center cardCustome ">

                    {/* Image */}
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={130}
                      height={180}
                      className="mb-6 object-contain"
                    />
                    <span className="relative mb-1 rounded-full inline-flex items-center bg-white px-2 py-1 text-xs font-xl inset-ring text-red-600  inset-ring-red-500/10">
                      {book.languages}
                    </span>
                    {/* Text */}
                    <h3 className="font-semibold text-base text-center text-black mb-2">
                      {book.title}
                    </h3>

                    {/* <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                      {book.desc}
                    </p> */}

                    {/* <p className="text-sm text-orange-900 font-medium mb-1">
                      {book.author}
                    </p> */}

                    {book.publisher && (
                      <p className="text-xs text-muted-foreground mb-6">
                        {book.publisher}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {/* Button */}
                      <Link href={`/gyanbhandar/book/${book.id}`}>
                        <Button
                          variant="outline"
                          className="rounded-full  border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                        >
                          इसे पढ़ें
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                      >
                        डाउनलोड करें
                      </Button>
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

        {/* Quote */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.3
          }}
        >
          <div className="mt-10 sm:mt-20 max-w-4xl">
            {/* ICON */}
            <Lottie
              animationData={Testimonials}
              loop={true}
              className="w-full sm:w-16 h-16 mb-2"
            />
            <p className="text-2xl sm:text-4xl text-center sm:text-left  leading-relaxed text-[#7a2f18] ">
              तूं आपे न्यारी होत है, पिउ नहीं तुझ से दूर। <br />परदा तूं ही करत है, अंतर न आडे नूर।।
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
