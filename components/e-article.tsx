"use client"

import Image from "@/components/BaseImage";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/articles";
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
import { motion } from "framer-motion";

export default function Earticle() {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <section className="max-w-7xl mx-auto py-20 pb-0 px-6 text-start">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            ई-मंथन लेखन
            <p className="text-xl text-gray-500 mt-4">
              जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं। वे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।
            </p>
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="mt-12  gap-6">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
            className=""
          >
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/4 basis-[85%] relative"
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
                    <div
                      key={index}
                      className="flex gap-4 h-full bg-white/60 rounded-3xl items-center cardCustome !p-0"
                    >

                      <div className="flex-1 h-full ">
                        <Image height={342} width={608}
                          src={article.image}
                          alt={article.title}
                          className="rounded-l-2xl rounded-b-0 object-cover"
                        />

                        <div className="p-8 ">
                          <span className="animate-bounce mb-4 inline-block bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                            {article.tag}
                          </span>
                          <h3 className="text-xl leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="mt-2 text-base text-muted-foreground">
                            {article.tikaName}
                            <br />
                            {article.writer}
                          </p>

                          <div className="mt-4 flex items-center justify-between text-base text-muted-foreground">
                            <span>{article.date}</span>

                            <Link href={`/gyanbhandar/article/${article.id}`}>
                              <Button
                                variant="outline"
                                className="rounded-full  border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                              >
                                लेख पढ़ें
                              </Button>
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>

                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Controls */}
            <div className="mt-4 flex items-center justify-between">
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
  )
}
