"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import React from "react";
import { CarouselDots } from "./carousel-dots";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
const basePath =
    process.env.NODE_ENV === "production" ? "" : "";
export default function PrannathCTA() {
    const [api, setApi] = React.useState<CarouselApi>()

    return (
        <section className="relative overflow-hidden ">
            <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute w-100 h-100  bottom-0 top-0 left-0 z-10 motion-safe:animate-wiggle w-[70px] h-auto
                      sm:w-[11vw] sm:h-auto" />
            <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute w-100 h-100  bottom-0 right-0 z-10 motion-safe:animate-wiggle w-[70px] h-auto
                      sm:w-[11vw] sm:h-auto rotate-[3.142rad]" />
            {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-1"
            >
                <source src={`${basePath}/satgurubg.mp4`} type="video/mp4" />
            </video> */}
            <div className="absolute inset-0 w-full h-full object-cover z-1 bg-[#4b2440]"></div>
            {/* Overlay (important for readability) */}
            <div className="absolute inset-0 bg-[#fde9dc]/80 backdrop-blur-sm"></div>

            <div className="relative max-w-370 mx-auto px-4 lg:px-8 py-10 md:py-0 grid md:grid-cols-2 gap-10 items-center z-10">
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3
                    }}
                >
                    {/* LEFT CONTENT */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-snug text-white">
                            हमारे प्रेरणास्रोत 
                            <span className="font-normal inline-flex ms-2 text-orange-300 opacity-80 text-shadow-2xs ">परमहंस</span>
                        </h2>

                        <p className="mt-4 text-xl text-gray-500  max-w-lg text-white">
                            जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं। वे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex gap-4">
                            <a href="/bitakSahebRrdji">
                            <Button
                                variant="outline"
                                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                            >
                                जीवनी पढ़ें
                            </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
                {/* RIGHT IMAGE */}
                <div className="flex justify-center md:flex hidden">
                    <div className="relative rounded-3xl overflow-hidden">
                        <Image
                            src="/cta_img.png"
                            alt="ramratandasji"
                            width={500}
                            height={500}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}
