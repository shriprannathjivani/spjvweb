"use client";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Gauge, MapPin, MessageCircleQuestionMark, MessageSquareQuote, Timer } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import React from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { gamesList, sahiyogitaList } from "@/lib/gamesnquiz"
import { Ripple } from "@/components/ui/ripple";

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  return (
    <>
      <section className="relative max-w-7xl mx-auto px-6 py-10 overflow-hidden pt-0 text-center font-arya ">
        <div className=" relative flex h-125 w-full flex-col items-center justify-center ">
          <h2 className="text-4xl flex flex-row font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            <TextAnimate animation="blurInUp" startOnView delay={0.3}>
              गेम्स&nbsp;
            </TextAnimate>{"  "}
            <span className="text-orange-500">
              <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                & क्विज़
              </TextAnimate>
            </span>
          </h2>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.3}
            segmentClassName="block" startOnView className="mt-4 text-muted-foreground text-xl  mb-4">
            {`हम 'बाल आत्मदर्शनम्' कार्यक्रम में नए और मजेदार गेम लेकर आए हैं, जहां खेलते-खेलते मिलेगा ज्ञान! \n🕹️ खेल के माध्यम से बच्चे धर्म को रोचक तरीके से जानेंगे और समझेंगे।\n✔️ धर्म और जीवन में इसके अनमोल महत्व को जानें और आत्मा की गहराई में खो जाने का अनुभव करें।`}
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.5}
            segmentClassName="p" startOnView className="text-xl text-orange-900 mb-4">
            इस साल 12000+ से ज्यादा बाल/सुंदरसाथ इसमें हिस्सा ले चुके हैं।
          </TextAnimate>
          <div className="flex -space-x-2">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
            >
              <Image height={40} width={40} src="/psbimg1.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
            >
              <Image height={40} width={40} src="/psbimg2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3
              }}
            >
              <Image height={40} width={40} src="/psbimg3.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4
              }}
            >
              <Image height={40} width={40} src="/psbimg4.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
            >
              <Image height={40} width={40} src="/psbimg5.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <Image height={40} width={40} src="/psbimg6.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
            </motion.div>
          </div>
          <Ripple />
        </div>
        {/* 🔶 गेम्स & क्विज़  */}
        <div className="">
          <div className="max-w-7xl mx-auto py-12 pt-8 text-start">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
              {/* Heading */}
              <h2 className="text-3xl font-bold text-black mb-8">
                गेम्स
                <p className="mt-2 text-xl text-gray-500">बच्चों के लिए रचनात्मक खेल</p>

              </h2>
              {/* Responsive Grid */}
              <ul className="space-y-3 text-xl text-gray-500">
                <li className="space-y-3">
                  <TextAnimate animation="blurInUp" by="line"
                    delay={0.4}
                    segmentClassName="p" startOnView className="mt-2 text-sm text-gray-500">
                    {`🎮 गेम कैसे खेलें? \n✔️ इनपुट बॉक्स के अंदर "अपना नाम दर्ज करें ।\n✔️ खेल शुरू करने के लिए "स्टार्ट" बटन पर क्लिक करें।`}
                  </TextAnimate>

                </li>
              </ul>
            </div>

            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
              }}
              className=""
            >
              <CarouselContent>
                {gamesList.map((game, index) => (
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
                      <div className="relative h-full">
                        <div className="card-circle">{index + 1}</div>
                        <div
                          key={index}
                          className="group  h-full bg-white rounded-2xl transition-all duration-300  cursor-pointer cardCustome !p-0"
                        >

                          <Image height={342} width={608}
                            src={game.img}
                            alt={game.gameName}
                            className="rounded-l-2xl rounded-b-0 object-cover"
                          />
                          <div className="p-8">
                            <div className="flex items-start justify-start gap-2 ">
                              <div className="text-start">
                                {/* Tag */}
                                <span
                                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-2 inset-ring  text-rose-600 bg-rose-50   inset-ring-rose-500/10`}
                                >{game.linkname}</span>
                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-800  mb-4 line-clamp-2">
                                  {game.gameName}
                                </h3>
                              </div>
                            </div>
                            {/* Bottom Meta */}
                            <div className="flex items-center justify-between text-sm text-gray-500 ">
                              <span className="flex gap-2 items-center"><Timer size={16} /> {game.duration}</span>
                              <span className="flex gap-2 items-center"><MessageCircleQuestionMark size={16} /> {game.questions}</span>
                              <span className={`font-medium 0 flex gap-2 items-center ${game.level === "सरल"
                                ? "text-green-600"
                                : "text-red-600"
                                } ${game.level === "मध्यम" ? 'text-yellow-600' : ''}`}
                              >
                                <Gauge size={16} /> {game.level}
                              </span>
                            </div>
                            <div className="flex text-center justify-center mt-4">
                              <Link href={`/gamesnquiz/game/${game.id}`}>
                                <Button
                                  variant="outline"
                                  className="rounded-full border-2 border-black px-4 py-2 text-sm font-xs text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                                >
                                  गेम्स खेलें
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

        <div className="max-w-7xl mx-auto py-12 pt-8 text-start">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-black mb-8">
            गूगल क्विज़
            <p className="mt-2 text-xl text-gray-500">ब्रह्मवाणी की अखण्ड धारा से प्रेरित</p>
          </h2>
          {/* Responsive Grid */}

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
            className=""
          >
            <CarouselContent>
              {sahiyogitaList.map((sahiyog, index) => (
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
                    <div className="relative">
                      <div className="card-circle">{index + 1}</div>
                      <div
                        key={index}
                        className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer cardCustome"
                      >
                        <div className="flex items-start justify-start gap-2">
                          <Image height={60} width={60} alt="question icon" src="/question.gif" />
                          <div className="text-start">
                            {/* Tag */}
                            <span
                              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-2 inset-ring ${sahiyog.tag === "श्री बीतक साहिब"
                                ? "text-red-600 bg-ring-50  inset-ring-red-500/10"
                                : "text-purple-600 bg-purple-50   inset-ring-purple-500/10"
                                }`}
                            >{sahiyog.tag}</span>
                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-800  mb-4 line-clamp-2">
                              {sahiyog.name}
                            </h3>
                          </div>
                        </div>
                        {/* Bottom Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex gap-2 items-center"><Timer size={16} /> {sahiyog.duration}</span>
                          <span className="flex gap-2 items-center"><MessageCircleQuestionMark size={16} /> {sahiyog.questions}</span>
                          <span className={`font-medium 0 flex gap-2 items-center ${sahiyog.level === "सरल"
                            ? "text-green-600"
                            : "text-red-600"
                            } ${sahiyog.level === "मध्यम" ? 'text-yellow-600' : ''}`}
                          >
                            <Gauge size={16} /> {sahiyog.level}
                          </span>
                        </div>
                        <div className="flex text-center justify-center mt-4">
                          <Link href={`/gamesnquiz/quiz/${sahiyog.id}`}>
                            <Button
                              variant="outline"
                              className="rounded-full border-2 border-black px-4 py-2 text-sm font-xs text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                            >
                              क्विज खेलें
                            </Button>
                          </Link>
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


      </section>
    </>
  )
}