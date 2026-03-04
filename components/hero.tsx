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
    title: "जागिए। उठिए। ",
    highlight: "पहचानिए अपना सत्य।",
    description: `
    श्री प्राणनाथ जी द्वारा आवेशित तारतम वाणी आत्मा को उसके शाश्वत प्रियतम से जोड़ती है और सभी धर्मों के मूल सत्य को एक सूत्र में पिरोती है। हमारे सतगुरु तारतम वाणी से असंख्य हृदयों को जागृत कर रहे हैं। उनके चरणों का अनुसरण करते हुए, 'श्री प्राणनाथ जी वाणी' SPJV से जुड़े सभी सुंदरसाथ जी ज़ूम मीटिंग्स, यूट्यूब चैनल्स और सोशल मीडिया के माध्यम से वाणी की सुगंध का प्रसार कर रहे हैं और सबको प्रेम, सेवा और आत्म-जागृति के मार्ग पर चलने के लिए प्रेरित कर रहे हैं।
    `,
    image: "/sliderimg1.png",
  },
  {
    title: "बाल/युवा ",
    highlight: "आत्मदर्शनम्",
    description:
      `श्री प्राणनाथ जी की तारतम वाणी शताब्दियों पुरानी होते हुए भी आज की पीढ़ी के लिए उतनी ही प्रासंगिक है। यह धर्म बदलने का संदेश नहीं देती बल्कि सब धर्मों के उपदेशों को एक करके दृष्टि बदलने का आह्वान करती है।
    
आज का युवा प्रश्न करता है।
और वाणी उत्तर देती है - तर्क के साथ, अनुभव के साथ, प्रमाण के साथ।`,
    image: "/sliderimg3.png",
  },
];

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    if (!api) return;
  }, [api]);

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 py-20 pb-10 lg:py-20 lg:py-30 lg:pb-10">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>

                {/* MOBILE OVERLAY VERSION */}
                <div className="relative lg:hidden rounded-3xl overflow-hidden">

                  {/* Background Image */}
                  <Image
                    src={slide.image}
                    alt={slide.highlight}
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Text Content */}
                  <div className="absolute bottom-0 p-6 text-white">
                    <h1 className="text-2xl font-bold leading-snug">
                      {slide.title}{" "}
                      <span className="text-orange-400">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-3 text-sm text-gray-200">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex gap-4">
                      <Button
                        variant="outline"
                        className="rounded-full border-2 border-orange px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                      >
                        प्रवचन देखें
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full border-2 border-orange text-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                      >
                        जीवनी पढ़ें
                      </Button>
                    </div>
                  </div>
                </div>

                {/* DESKTOP VERSION */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-14 items-center">

                  {/* LEFT */}
                  <div>
                    <h1 className="text-5xl font-bold leading-tight">
                      {slide.title}{" "}
                      <span className="text-orange-500">
                        {slide.highlight}
                      </span>
                    </h1>

                    <p className="mt-6 text-gray-700 text-lg max-w-xl">
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
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={slide.image}
                      alt={slide.highlight}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <CarouselDots api={api} />

            <div className="hidden lg:flex gap-3">
              <CarouselPrevious className="static mt-5 h-10 w-10 rounded-full border border-gray-300 text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer" />
              <CarouselNext className="static mt-5 h-10 w-10 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}