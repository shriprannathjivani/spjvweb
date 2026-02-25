"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "@/components/BaseImage";
import Autoplay from "embla-carousel-autoplay";
import { CarouselDots } from "@/components/carousel-dots";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "जानिए श्री प्राणनाथ जी का",
    highlight: "स्वरूप और शिक्षाएँ",
    description:
      "श्री प्राणनाथ जी का स्वरूप ज्ञान की दोपहरी का वह सूरज है, जिसके उग जाने पर अध्यात्म जगत में किसी भी प्रकार का अन्धकार रूपी संशय नहीं रहता।",
    image: "sliderimg1.png",
  },
  {
    title: "जानिए सेवा, साधना",
    highlight: "और समर्पण",
    description:
      "श्री प्राणनाथ जी का स्वरूप ज्ञान की दोपहरी का वह सूरज है, जिसके उग जाने पर अध्यात्म जगत में किसी भी प्रकार का अन्धकार रूपी संशय नहीं रहता।",
    image: "sliderimg3.png",
  },
];

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // 🔵 Sync dots with Embla
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    onSelect();
  }, [api]);

  return (
    // bg-gradient-to-r from-[#fde6da] via-[#f3e9ff] to-[#fdebe1]
    <section className="relative ">
      <div className="max-w-7xl mx-auto px-6 py-10  pt-30">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                  {/* LEFT */}
                  <div className="">
                    <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
                      {slide.title}{" "}
                      <span className="text-orange-500">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-6 text-gray-700 text-2xl max-w-xl">
                      {slide.description}
                    </p>

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

                  {/* RIGHT */}
                  <div className="rounded-3xl overflow-hidden shadow-xl bg-white relative">
                    <Image
                      src={slide.image}
                      alt={slide.highlight}
                      height={392}
                      width={588}
                      className="top-0 left-0  rounded-md bg-white/5 ring-1 ring-white/10"
                    />
                  </div>
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
                className="static mt-5 h-10 w-10 rounded-full border border-gray-300
                 text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer"
              />
              <CarouselNext
                className="static mt-5 h-10 w-10 rounded-full border border-orange-500
                 text-orange-500 hover:bg-orange-50 cursor-pointer"
              />
            </div>
          </div>
        </Carousel>

      </div>
    </section>
  );
}
