"use client";

import Image from "next/image"
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

export default function PrannathCTA() {
    const [api, setApi] = React.useState<CarouselApi>()
    return (
        <section className="relative overflow-hidden">
            <div className="absolute bottom-0 top-0 left-0 z-10 w-100 h-100 bg-[url('/halfflower.png')] bg-no-repeat " />
            <div className="absolute bottom-0 right-0 z-10 w-100 h-100 bg-[url('/halfflower.png')] bg-no-repeat rotate-[3.142rad]" />
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-1"
            >
                <source src="/hero_loop_nonoise_1920.webm" type="video/webm" />
            </video>
            {/* Overlay (important for readability) */}
            <div className="absolute inset-0 bg-[#fde9dc]/80 backdrop-blur-sm"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center z-10">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-snug text-white">
                        हमारे प्रेरणास्रोत
                        <br />
                        <span className="font-normal">श्री सतगुरु व परमहंस</span>
                    </h2>

                    <p className="mt-4 text-xl text-gray-500  max-w-lg text-white">
                        जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं। वे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">
                        <Button
                            variant="outline"
                            className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                        >
                            प्रवचन देखें
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                        >
                            जीवनी पढ़ें
                        </Button>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 9000,
                            }),
                        ]}
                        orientation="vertical"
                        className="w-full "
                    >
                        <CarouselContent className="mt-1 h-[300px]">
                            {[
                                { title: "बाल आत्मदर्शनम्", img: "/satgurs.png" },
                                { title: "बीतक कॉमिक्स", img: "/satgurs.png" },
                                { title: "बीतक पात्र वेश", img: "/satgurs.png" },
                                { title: "बाल आत्मदर्शनम्", img: "/satgurs.png" },
                            ].map((card, i) => (
                                <CarouselItem
                                    key={i}
                                    className="pl-4 md:basis-1/3 "
                                >
                                    <div className="relative rounded-3xl overflow-hidden">
                                        <Image
                                            src={card.img}
                                            alt={card.title}
                                            width={500}
                                            height={300}
                                            className=" w-full "
                                        />

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                    </Carousel>

                </div>
            </div>
        </section>
    )
}
