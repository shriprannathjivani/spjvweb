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
import React, { useState } from "react";
import { reviews } from "@/lib/reviewnew";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isHindiText = (text: any) => {
    // Unicode range for Devanagari script (Hindi characters)
    const devanagariRegex = /[\u0900-\u097F]/;
    return devanagariRegex.test(text);
  };

  return (
    <section className="relative py-10 sm:py-20 sm:p-0 ">
      <Image
        src="/halfflower.png"
        height={120}
        width={120}
        alt="halfflower"
        className="absolute bottom-1 md:top-1 left-0 z-0 motion-safe:animate-wiggle  h-auto
         sm:h-auto "
      />

      <div className="max-w-370 mx-auto px-4 lg:px-8 ">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-14">
          परिवर्तन की प्रेरक कहानियाँ
        </h2>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {reviews.map((review, index) => {
              const isExpanded = expandedIndex === index;

              return (
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
                    className="h-full"
                  >
                    <div className="card-circle">{index + 1}</div>

                    <div className="h-full rounded-3xl bg-white p-8 pb-4! sm:pb-6! pt-4! flex flex-col items-center justify-evenly text-center cardCustome">
                      <div className="bg-white rounded-3xl transition duration-300">
                        <Lottie
                          animationData={Testimonials}
                          loop={true}
                          className="w-full sm:w-8 h-8 mb-4"
                        />

                        {/* <span className="relative mb-3 rounded-full inline-flex items-center bg-white px-2 py-1 text-xs font-xl inset-ring text-violet-600 inset-ring-violet-500/10">
                          {review.tag}
                        </span> */}

                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            const isFilled = ratingValue <= (review.id + 2 || 5);

                            return (
                              <Star
                                key={index}
                                className={`w-5 h-5 ${isFilled
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                                  }`}
                              />
                            );
                          })}
                        </div>

                        <p
                          className={`text-gray-700 mb-4 wrap-break-word whitespace-pre-line transition-all duration-300 ${isHindiText(review.review) ? "" : "font-poppins"
                            } ${isExpanded ? "" : "line-clamp-6"}`}
                        >
                          {review.review}
                        </p>

                        {review.review.length > 150 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-orange-500 font-medium mb-6 hover:underline cursor-pointer"
                          >
                            {isExpanded ? "कम पढ़ें" : "और पढ़ें"}
                          </button>
                        )}

                        <div className="flex items-center gap-4">
                          <Image
                            src={review.image}
                            alt={review.name}
                            height={40}
                            width={40}
                            className="w-12 h-12 rounded-full object-cover opacity-10"
                          />
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-sm text-gray-500">
                              {review.group}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* <CarouselDots api={api} /> */}
            <div>&nbsp;</div>

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
