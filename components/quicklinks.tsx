"use client";

import React from "react";
import Link from "next/link";
import Image from "@/components/BaseImage";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { quickLinks } from "@/lib/quicklinks";

export default function QuickLinksCarousel() {
    return (
        <section className="relative py-0">
            <div className="max-w-7xl mx-auto px-4">

                {/* Wrapper with side spacing */}
                <div className="relative px-0 pb-8 sm:px-10 sm:py-8">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                    >
                        <CarouselContent>
                            {quickLinks.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/5 sm:basis-1/4 md:basis-1/8 pl-2"
                                >
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            href={item.link}
                                            className="flex flex-col items-center justify-center "
                                        >
                                            {/* Icon */}
                                            <div className="mb-2 sm:mb-3">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    height={60}
                                                    width={60}
                                                    className="w-12 h-12 sm:w-20 sm:h-20  object-contain"
                                                />
                                            </div>

                                            {/* Name */}
                                            <p className="text-[11px] sm:text-sm text-center font-medium text-gray-700 leading-tight line-clamp-2">
                                                {item.name}
                                            </p>
                                        </Link>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Left Arrow */}
                        <CarouselPrevious
                            className="absolute -left-2 sm:-left-10 top-1/2 -translate-y-1/2 z-10 
          h-10 w-10  bg-white 
           hover:bg-orange-50 hover:text-orange-500 cursor-pointer hidden sm:flex"
                        />
                        {/* Right Arrow */}
                        <CarouselNext
                            className="absolute -right-2 sm:-right-10 top-1/2 -translate-y-1/2 z-10 
          h-10 w-10  border-orange-500 bg-white 
          text-orange-500 hover:bg-orange-50 cursor-pointer hidden sm:flex"
                        />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}