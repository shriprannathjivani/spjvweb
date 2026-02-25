"use client";

import Image from "@/components/BaseImage";
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

export default function Aatmadarshan() {
    const [api, setApi] = React.useState<CarouselApi>()
    return (
        <section className="relative py-10 sm:py-24 overflow-hidden">
            {/* Decorative background */}
          
<Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute top-1 left-0 z-0 motion-safe:animate-wiggle w-[70px] h-auto
          sm:w-[150px] sm:h-auto" />
            <div className="relative max-w-7xl mx-auto px-6">
                {/* Top Content */}
                <div className="grid md:grid-cols-2 gap-5 sm:gap-10 items-start">
                    {/* Left */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">
                        'बाल आत्मदर्शनम्'<br />
                        हर रविवार की दिव्य दोपहर:
                    </h2>

                    {/* Right */}
                    <div className="space-y-4">
                        <p className="text-xl text-gray-500">
                            ‘आत्मदर्शनम्’ एक ऐसा अनोखा मंच है, जो आपको आत्मा की गहराई तक ले जाकर इन सवालों के उत्तर खोजने में मदद करता है।
                        </p>
                        <div className="flex items-center justify-between ">
                            <div className="">
                                <p className="text-xl text-orange-900 mt-0 mb-4">इस साल 400+ से ज्यादा बाल इसमें हिस्सा ले चुके हैं।</p>
                                <div className="flex -space-x-2 overflow-hidden">
                                    <Image height={40} width={40} src="/psbimg1.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                    <Image height={40} width={40} src="/psbimg2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                    <Image height={40} width={40} src="/psbimg3.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                    <Image height={40} width={40} src="/psbimg4.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                    <Image height={40} width={40} src="/psbimg5.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                    <Image height={40} width={40} src="/psbimg6.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                            >
                                सभी इवेंट देखें
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center mt-20 items-center">
                    {[
                        {
                            title: "प्रेरणादायक वीडियो",
                            desc: "वीडियो आपके हृदय को छूने वाला होगा, जिससे आप दिव्य अनुभवों और लीलाओं का आनंद लेंगे।",
                            img: "/adicon1.png"
                        },
                        {
                            title: "धर्म के लक्षण",
                            desc: "धर्म और जीवन में इसके अनमोल महत्व को जानें और आत्मा की गहराई में खो जाने का अनुभव करें।",
                            img: "/adicon2.png"
                        },
                        {
                            title: "बच्चों के लिए रचनात्मक खेल",
                            desc: "खेल-खेल में जीवन की महत्वपूर्ण शिक्षाएँ प्राप्त करें। बच्चों के लिए ज्ञानवर्धक और आनंदमयी अनुभव।",
                            img: "/adicon3.png"
                        },
                        {
                            title: "ध्यान और आत्म-आलोचन",
                            desc: "चितवन में खो जाइए, आत्मा के मिठास और शांति का अनुभव कीजिए। ध्यान में गहरे उतरें।",
                            img: "/adicon4.png"
                        },
                    ].map((item, i) => (
                        <div key={i} className="space-y-3 flex flex-col items-center text-center">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={120}
                                height={120}
                                className="transition-transform duration-500 group-hover:scale-300 sepia"
                            />
                            <h4 className="text-2xl text-orange-900 mb-4">{item.title}</h4>
                            <p className="text-lg text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Cards Carousel */}
                <div className="mt-20 relative">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {[
                                { title: "बाल आत्मदर्शनम्", img: "/adimg1.png" },
                                { title: "बीतक कॉमिक्स", img: "/adimg2.png" },
                                { title: "बीतक पात्र वेश", img: "/adimg3.png" },
                                { title: "बाल आत्मदर्शनम्", img: "/adimg1.png" },
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

                        {/* Controls */}
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
            </div>
        </section>
    );
}