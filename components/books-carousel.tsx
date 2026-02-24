"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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

const BOOKS = [
  {
    title: "प्रेम रसायन ",
    desc: "आत्मिक प्रेम और चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book1.png",
  },
  {
    title: "श्री कृष्ण त्रिगुण लीला",
    desc: "चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book2.png",
  },
  {
    title: "आत्माओं की रखी – अक्षर पुरुष",
    desc: "चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book3.png",
  },
  {
    title: "श्री कृष्ण त्रिगुण लीला",
    desc: "चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book2.png",
  },
  {
    title: "प्रेम रसायन ",
    desc: "आत्मिक प्रेम और चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book1.png",
  },
  {
    title: "श्री कृष्ण त्रिगुण लीला",
    desc: "चर्चा का अमूल्य संकलन",
    author: "चर्चा – श्री राजन स्वामी जी (SPJIN)",
    publisher: "द्वारा: श्री प्राणनाथ जी वाणी सेवा परिवार",
    image: "/book2.png",
  }
];

export default function BooksCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  return (
    <section className="relative py-24 pt-0">

      <div className="absolute bottom-0 right-0 z-0 w-100 h-100 bg-[url('/halfflower.png')] bg-no-repeat rotate-[3.142rad] " />
      <div className="max-w-7xl mx-auto px-6">
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
                className="pl-4 md:basis-1/4 basis-[85%] relative"
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

                  {/* Text */}
                  <h3 className="font-semibold text-lg text-black mb-2">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-800 mb-2">
                    {book.desc}
                  </p>

                  <p className="text-sm text-orange-900 font-medium mb-1">
                    {book.author}
                  </p>

                  {book.publisher && (
                    <p className="text-xs text-muted-foreground mb-6">
                      {book.publisher}
                    </p>
                  )}

                  {/* Button */}
                  <Button
                    variant="outline"
                                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                  >
                    डाउनलोड करें
                  </Button>
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
        <div className="mt-20 max-w-4xl">
          <MessageSquareQuote size={76} className="text-orange-500 mb-4" />
          <p className="text-4xl leading-relaxed text-[#7a2f18] font-medium">
            यामें अपनी बीतक सब है, श्री देवचन्द्र को मेरो तेरो नाम। <br/> जा दिन जो बीती हम तीनों में, सो सब लिखी तमाम।।
          </p>
        </div>
      </div>
    </section>
  );
}
