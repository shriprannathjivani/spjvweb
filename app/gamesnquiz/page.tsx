"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Binoculars, BookOpenText, Calendar, Clock, Gauge, Globe, MapPin, MessageCircleQuestionMark, MessageSquareQuote, Timer } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import React, { useEffect, useMemo, useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import { gamesList, sahiyogitaList } from "@/lib/gamesnquiz"
import data from '@/public/allvani/chopai.json';


export type ChopaiItem = {
  text: string;
  chapter: string;
};

export type LetterGroup = {
  letter: string;
  chopai: ChopaiItem[];
};

// 🎨 Pastel colors
const colors = [
  'from-pink-200 via-rose-100 to-yellow-100',
  'from-green-200 via-lime-100 to-emerald-100',
  'from-blue-200 via-indigo-100 to-purple-100',
  'from-yellow-200 via-orange-100 to-pink-100',
];

const chopaiData = data as LetterGroup[];

const basePath =
  process.env.NODE_ENV === "production" ? "/spjvweb" : "";

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [offsetY, setOffsetY] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [randomChopai, setRandomChopai] = useState<ChopaiItem | null>(null);

  function formatChopai(text: string) {
    const parts = text.split("।");

    if (parts.length >= 2) {
      return parts[0] + "।\n" + parts.slice(1).join("।");
    }

    return text;
  }
  function formatChapter(input: string) {
    if (!input) return "";

     // 🔹 Language mapping (English → Hindi)
  const langMap: Record<string, string> = {
    Raas: "रास",
    Sindhi: "सिन्धी",
    Gujarati: "गुजराती",
    Prakash: "प्रकाश",
    Kalash: "कलश",
    Khilvat:"खिलवत",
    Kirantan:"किरन्तन",
    Parikrama: "परिकरमा",
    Singaar: "सिनगार",
    Hindustani: "हिन्दुस्तानी",
    Sagar:"सागर",
    Sanandh:"सनन्ध",
    Khataruti:"खटरुती",
    Kayamatnama:"कयामतनामा",
    Khulasa:"खुलासा",
  };

//   1. रास
// 2. प्रकास (गुजराती व हिन्दुस्तानी)
// 3. खटरुती
// 4. कलस (गुजराती व हिन्दुस्तानी)
// 5. सनन्ध
// 6. किरन्तन
// 7. खुलासा
// 8. खिलवत
// 9. परिकरमा
// 10. सागर
// 11. सिनगार
// 12. सिन्धी
// 13. मारफत सागर
// 14. कयामतनामा (छोटा व बड़ा)

    // 🔹 1. Extract chapter info from END (Raas_8_22)
    const match = input.match(/([A-Za-z]+)_(\d+)_(\d+)$/);

    let lang = "";
    let chapter = "";
    let chopai = "";

    if (match) {
      lang = match[1];
      chapter = match[2];
      chopai = match[3];
    }
    const langHindi = langMap[lang] || lang;
    // 🔹 2. Remove chapter part from string
    let textPart = input.replace(/([A-Za-z]+)_(\d+)_(\d+)$/, "");

    // 🔹 3. Remove Hindi numbering like ।।२२।।
    textPart = textPart
      .replace(/।।\s*[०-९]+\s*।।/g, "")
      .replace(/।\s*[०-९]+\s*।/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // 🔹 4. Remove leftover underscores
    textPart = textPart.replace(/_/g, " ").trim();

    // ✅ Final output
    return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600">
        {langHindi} • प्र: {chapter} • चौपाई: {chopai}
      </span>
    </div>
  );
  }

  // 🎲 Random chopai for idle state
  useEffect(() => {
    const all = chopaiData.flatMap(l => l.chopai);
    const random = all[Math.floor(Math.random() * all.length)];
    setRandomChopai(random);
  }, []);

  const currentChopai: ChopaiItem[] = selectedLetter
    ? chopaiData.find(l => l.letter === selectedLetter)?.chopai || []
    : [];

  // 🌌 Parallax Effect
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="p-8 bg-white"></div>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">

        {/* ================= BACKGROUND LAYERS ================= */}
        <div className="absolute inset-0 -z-10">

          {/* PARALLAX BG */}
          <div className="absolute inset-0 scale-110 animate-[slowZoom_20s_linear_infinite]">
            {/* <Image
              src="/shrijigame/unnamed.png"
              fill
              alt=""
              className="object-cover"
            /> */}

            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover"
            >
              <source src={`${basePath}/shrijigame/343929_large.mp4`} type="video/mp4" />
            </video>
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* GRADIENT LIGHT */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-transparent to-[#fcf0ea]" />
        </div>

        {/* ================= BADGES ================= */}
        <div className="relative z-20 flex flex-wrap justify-center gap-4 mb-0 mt-8">
          {[
            { icon: <Globe size={20} />, text: "3D World", rotate: "-rotate-3" },
            { icon: <Binoculars size={20} />, text: "Epic Quests", rotate: "rotate-2" },
            { icon: <BookOpenText size={20} />, text: "Ancient Lore", rotate: "-rotate-1" }
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 ${item.rotate} hover:rotate-0 hover:scale-110 transition-all duration-300`}
            >
              {item.icon}
              <span className="font-bold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-20 text-center max-w-5xl px-6 py-8">

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl font-black  mb-6 
              [text-shadow:0_4px_20px_rgba(0,0,0,0.8),0_0px_40px_rgba(255,200,0,0.3)]">
            श्री जी <br />
            <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(255,200,0,0.8)]">
              3D वर्ल्ड गेम
            </span>
          </h1>

          {/* SUBTEXT */}
          <TextAnimate animation="blurInUp" by="line"
            delay={0.5}
            segmentClassName="p" startOnView className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            एक दिव्य 3D अनुभव, जहाँ खेल-खेल में खोजें मंदिर और जानें श्री जी की अद्भुत लीलाओं का इतिहास। ✨
          </TextAnimate>

          <div className="flex gap-4 items-start justify-center">
            {/* ================= AVATAR ================= */}
            <div className="relative mb-8 group flex justify-center sm:shrink-0">

              <div className="absolute -inset-4 bg-amber-400/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              </div>
              {/* IMAGE */}
              <Image
                src={`/shrijigame/bitaksearch_avtar.png`}
                alt=""
                width={320}
                height={320}
                className="relative z-10 drop-shadow-[0_50px_60px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="space-y-6 text-center lg:text-left mb-16">
                <div>
                  <TextAnimate animation="blurInUp" startOnView delay={0.3} className="mt-3 text-xl md:text-2xl text-white/80">
                    आइए खेलें एक दिव्य खेल और पाएं श्री जी का ज्ञान!

                    अब तक हमने श्री जी की लीलाओं को सुना, समझा और विश्वास किया…
                    लेकिन अब समय है उसे महसूस करने का
                  </TextAnimate>
                </div>

                <TextAnimate animation="blurInUp" by="line"
                  delay={0.5}
                  segmentClassName="p" startOnView className=" text-xl md:text-2xl text-white/80 mb-4">
                  इस 3D दुनिया में बच्चे:
                  ✨ मंदिर खोजेंगे
                  ✨ श्री जी की लीलाओं को जानेंगे
                  ✨ खेल-खेल में दिव्य ज्ञान प्राप्त करेंगे
                </TextAnimate>

              </div>
              {/* ================= BUTTON ================= */}
              <a href={`${basePath}/gamesnquiz/shrijiworld`} className="group group-hover:scale-110 inline-flex relative px-14 text-2xl 2xl overflow-hidden mb-12 cursor-pointer bg-linear-to-b from-[#ffd166] to-[#f7a400] text-[#422006] font-black py-4 rounded-2xl shadow-[0_4px_0_#b37700] active:translate-y-1 active:shadow-none transition-all  uppercase tracking-wider ">
                {/* ⚡ SHINE SWEEP */}
                <span className="absolute inset-0 
                bg-linear-to-r from-transparent via-white/50 to-transparent 
                translate-x-[-120%] group-hover:translate-x-[120%] 
                transition-transform duration-1000">
                </span>

                {/* 📝 TEXT */}
                <span className="relative z-10 text-[#422006] ">
                  3D गेम शुरू करें
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="relative max-w-7xl mx-auto px-6 py-10 pt-0 text-center font-arya ">
        <div className=" relative flex h-125 w-full flex-col items-center justify-center ">
          <h2 className="text-4xl flex flex-row font-semibold tracking-tight text-balance text-gray-900 sm:mt-0 mt-25 sm:text-5xl">
            <TextAnimate animation="blurInUp" startOnView delay={0.3}>
              गेम्स&nbsp;
            </TextAnimate>{"  "}
            <span className="text-orange-500">
              <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                व क्विज़
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
                                >{game.tag}</span>
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


        <div className="max-w-7xl mx-auto py-12 pt-8 text-start">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-black mb-8">
            ब्रह्मवाणी अंताक्षरी
            <p className="mt-2 text-xl text-gray-500">वर्णानुसार श्री तारतम वाणी चौपाइयाँ</p>
          </h2>
          {/* Responsive Grid */}


          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* 🌍 LEFT - STICKY */}
              <div className="lg:col-span-1">

                {/* ✅ Sticky only on desktop */}
                <div className="sticky top-24">

                  <div className="bg-white rounded-3xl p-6">

                    <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
                      अक्षर
                    </h2>

                    {/* ✅ FIXED MOBILE SCROLL */}
                    <div className="
                        flex 
                        flex-nowrap flex-wrap   /* 🔥 key fix */
                        gap-2 
                       
                      ">

                      {chopaiData.map((item) => (
                        <button
                          key={item.letter}
                          onClick={() => setSelectedLetter(item.letter)}
                          className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${selectedLetter === item.letter
                            ? 'bg-orange-500 border-2 border-black text-white shadow-md'
                            : 'bg-white hover:bg-orange-100 border-2 border-transparent'
                            }`}
                        >
                          {item.letter}
                        </button>
                      ))}

                    </div>
                  </div>

                </div>
              </div>

              {/* 📜 RIGHT CONTENT */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-6 w-full max-w-full overflow-hidden">

                  {/* 🧘 Idle State */}
                  {!selectedLetter && randomChopai && (
                    <div className="blockquote-wrapper bg-transparant rounded-3xl">
                      <div className="blockquote w-full max-w-full overflow-hidden">
                        <h1 className="wrap-break-word whitespace-pre-line leading-normal font-poppins">
                          {formatChopai(randomChopai.text)}
                        </h1>
                        <h4 className="wrap-break-word">
                          &mdash; श्री तारतम वाणी <br />
                          <em>{formatChapter(randomChopai.chapter)}</em>
                        </h4>
                      </div>
                    </div>
                  )}

                  {/* 📖 Selected Letter */}
                  {selectedLetter && (
                    <>
                      <h2 className="text-2xl font-bold mb-6 text-gray-700 pb-2 border-b border-gray-100">
                        अक्षर: {selectedLetter}
                      </h2>

                      {/* ✅ FIX GRID FOR MOBILE */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

                        {currentChopai.map((item, i) => (
                          <div key={i} className="blockquote-wrapper bg-transparant rounded-3xl">
                            <div className="blockquote blockquote2 w-full max-w-full overflow-hidden wrap-break-word">

                              <h1 className="wrap-break-word whitespace-pre-line leading-normal text-base! font-poppins">
                                {formatChopai(item.text)}
                              </h1>

                              {/* ❌ removed ms-22! (was causing overflow) */}
                              <h4 className="wrap-break-word whitespace-pre-line text-sm!">
                                &mdash; श्री तारतम वाणी <br />
                                <em>{formatChapter(item.chapter)}</em>
                              </h4>

                            </div>
                          </div>
                        ))}

                      </div>
                    </>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>

      </section>
    </>
  )
}