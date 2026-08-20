"use client";

import { useState, useRef, useEffect } from "react";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";
import { Marquee } from "@/components/ui/marquee";
import { babynames } from "@/lib/babynames"; //
type BabyLetter = keyof typeof babynames;
{/* <Marquee pauseOnHover className="[--duration:20s]"><>content</></Marquee> */ }
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
import { ArrowUpRight, Timer, User2Icon } from "lucide-react";
import Link from "next/link";
import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "framer-motion";

export type BabyGender = "b" | "g";

export interface BabyNameItem {
  id: string;
  babyName: string;
  babyG: BabyGender;
  meaningH: string;
  meaningE: string;
}

type Letter =
  | "अ" | "आ" | "इ" | "ई" | "उ" | "ऊ" | "ए" | "ऐ" | "ओ" | "औ"
  | "क" | "ख" | "ग" | "च" | "ज" | "त" | "न" | "प" | "र" | "स" | "ह";

type Message = {
  id: string;
  role: "ai" | "user";
  content: React.ReactNode;
};

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [messages, setMessages] = useState<Message[]>([]);
  const [gender, setGender] = useState<BabyGender | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const initialized = useRef(false);
  const chatRef = useRef<HTMLDivElement>(null);
  /* ============================
     SMOOTH SCROLL
  ============================ */

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /* ============================
     MESSAGE HELPERS
  ============================ */

  const addMessage = (role: "ai" | "user", content: React.ReactNode) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, content },
    ]);
  };

  const addAIMessage = (content: React.ReactNode) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage("ai", content);
      setIsTyping(false);
    }, 700);
  };

  const addOptionMessage = (
    text: string,
    options: { id: string; label: string; onClick: () => void }[]
  ) => {
    addAIMessage(
      <div className="space-y-4">
        <p className="text-xl">{text}</p>

        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isDisabled = disabledOptions.includes(opt.id);

            return (
              <button
                key={opt.id}
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  setDisabledOptions((prev) => [...prev, opt.id]);
                  opt.onClick();
                }}
                className={`px-4 py-2 rounded-full text-sm transition border  
                  ${isDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-orange-500 hover:text-white"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* ============================
     FLOW
  ============================ */

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    addOptionMessage("नमस्ते 🙏 कृपया चुनें:", [
      {
        id: "boy",
        label: "👦 लड़का",
        onClick: () => handleGender("b"),
      },
      {
        id: "girl",
        label: "👧 लड़की",
        onClick: () => handleGender("g"),
      },
    ]);
  }, []);

  const handleGender = (value: BabyGender) => {
    setGender(value);
    addMessage("user", value === "b" ? "👦 लड़का" : "👧 लड़की");

    addOptionMessage(
      "कृपया पहला अक्षर चुनें:",
      (Object.keys(babynames) as Letter[]).map((letter) => ({
        id: letter,
        label: letter,
        onClick: () => handleLetter(letter, value),
      }))
    );
  };

  const handleLetter = (letter: Letter, selectedGender: BabyGender) => {
    addMessage("user", letter);

    const namesForLetter: BabyNameItem[] = babynames[letter] ?? [];

    const filtered = namesForLetter.filter(
      (item) => item.babyG === selectedGender
    );

    const validNames = filtered.filter(
  (item) => item.babyName !== "There are no names available."
);

    if (validNames.length === 0) {
      addAIMessage(
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 max-w-md">
          <p className="text-lg font-semibold text-yellow-800 mb-2">
            इस अक्षर से अभी कोई नाम उपलब्ध नहीं है।
          </p>
          <p className="text-sm text-gray-500 mt-3">
            कृपया कोई दूसरा अक्षर चुनें।
          </p>
        </div>
      );
    } else {
      addAIMessage(
        <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,minmax(270px,1fr))] gap-2 items-stretch">
          {filtered.map((item, index) => (
            <div className="relative h-full  bg-orange-100 rounded-3xl!" key={item.id}>
              <div className="card-circle bg-orange-100!">{index + 1}</div>
              <div className="bg-orange-100 rounded-3xl! !p-4 !px-6 transition-all duration-300  cursor-pointer ">

                <div className="flex items-start justify-start gap-2">
                  <Image alt={item.babyG} src={item.babyG === "b" ? "/babyboy.png" : "/babygirl.png"} width={60} height={60} className="scale-x-[-1]" />
                  <div className="text-start">
                    {/* Tag */}
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full inset-ring ${item.babyG === "g"
                        ? "text-red-600 bg-ring-50  inset-ring-red-500/10"
                        : "text-purple-600 bg-purple-50   inset-ring-purple-500/10"
                        }`}
                    >{item.babyG === "b" ? " लड़का" : "लड़की"}</span>
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800  line-clamp-2">
                      {item.babyName}
                    </h3>
                  </div>
                </div>
                {/* Bottom Meta */}
                <div className="flex text-sm text-gray-500 flex-col gap-1 mt-1">
                  <span className=" text-base">अर्थ : {item.meaningH}</span>
                  <span className=" text-base">मीनिंग : {item.meaningE}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 🔥 After result, restart flow
    setTimeout(() => {
      setDisabledOptions([]);
      setGender(null);

      addOptionMessage("क्या आप फिर से नाम देखना चाहते हैं? कृपया चुनें:", [
        {
          id: "boy",
          label: "👦 लड़का",
          onClick: () => handleGender("b"),
        },
        {
          id: "girl",
          label: "👧 लड़की",
          onClick: () => handleGender("g"),
        },
      ]);
    }, 1000);
  };
  /* ============================
     UI
  ============================ */

  return (
    <>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.4s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #555;
          border-radius: 50%;
          animation: cbounce 1.4s infinite ease-in-out both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes cbounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
      <section className="relative max-w-370 mx-auto px-4 lg:px-8 py-10 overflow-hidden pt-0 font-arya ">

        {/* 🔶 कार्यक्रम */}
        <div className=" relative flex h-[500px] w-full flex-col items-center justify-center text-center ">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            <TextAnimate animation="blurInUp" startOnView delay={0.3}>
             आत्मदर्शनम्:&nbsp;
            </TextAnimate>{"  "}
            <span className="text-orange-500">
              <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                वाणी, संस्कार और प्रेम का प्रकाश
              </TextAnimate>
            </span>
          </h2>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.3}
            segmentClassName="block" startOnView className="mt-4 text-muted-foreground text-xl  mb-12">
            {`जहाँ ज्ञान रोचक बनता है, संस्कार सहज बनते हैं और वाणी हृदय में उतरती है।`}
          </TextAnimate>
          <Ripple />
        </div>
        <div className="sm:mt-[-100px] mt-[-160px]">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-[auto_60%_auto] gap-10 items-center">

            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <TextAnimate animation="blurInUp" by="line"
                  delay={0.3}
                  segmentClassName="block" startOnView className="text-xl md:text-2xl font-semibold">
                  {`'बाल आत्मदर्शनम्'\nहर रविवार की दिव्य दोपहर:`}
                </TextAnimate>
                <TextAnimate animation="blurInUp" startOnView delay={0.3} className="mt-3 text-gray-600 text-sm md:text-base">
                 श्री प्राणनाथ जी वाणी द्वारा बाल एवं युवा आत्मदर्शनम् एक ऐसी सुंदर पहल है, जिसका उद्देश्य बच्चों और युवा सुंदरसाथ जी को धनी की वाणी तथा निजानंद के संस्कारों से सहज, सरल और आनंदमय रूप में जोड़ना है।
                </TextAnimate>
              </div>

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

            {/* Center Image */}
            <div className="relative">
              <Image
                src="/balkendraAD.png"
                alt="बच्चा पढ़ाई करते हुए"
                height={416}
                width={739}
                className=" w-full object-cover "
              />
              {/* Badge Top */}
              <span className="absolute top-48 animate-bounce left-6 bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                ध्यान / चितवन
              </span>

              {/* Badge Bottom */}
              <span className="absolute bottom-10  animate-bounce right-48 bg-pink-300 text-pink-900 text-xs md:text-sm px-4 py-2 rounded-full shadow">
                धर्म के लक्षण
              </span>

              {/* Badge Bottom */}
              <span className="absolute top-10  animate-bounce right-32 bg-violet-300 text-violet-900 text-xs md:text-sm px-4 py-2 rounded-full shadow">
                योग्य मार्गदर्शक
              </span>
            </div>

            {/* Right Content */}
            <div className="space-y-5 text-center lg:text-left">
              <div  className="text-gray-600 text-sm md:text-base">
                हम निरंतर ऐसे नए और <br />रचनात्मक प्रयासों के माध्यम से अधिक से अधिक बच्चों एवं युवाओं को<br /> इस सुंदर संगति से जोड़ने और <br />भावी पीढ़ी के हृदय में <br />निजानंद के संस्कारों को पुष्पित करने के लिए प्रयासरत हैं।
              </div>
              <a
                 target="_blank"  href="https://www.youtube.com/@SPJVAatmaDarshanam/featured" 
                  className="rounded-full  border-2 border-black px-5 py-2  text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                >
                  लाइव सेशन
                </a>
            </div>
          </div>
        </div>
        <div className="py-8 sm:my-16 my-8">

          <div className="grid md:grid-cols-1 gap-2 items-start sm:mb-16 mb-8 ">
            {/* Left */}
            <TextAnimate animation="blurInUp" by="line"
              delay={0.3}
              segmentClassName="block" startOnView className="text-3xl font-bold text-black mb-1">
              {`आत्मदर्शनम्`}
            </TextAnimate>
            <TextAnimate by="line"
              delay={0.3}
              segmentClassName="block" animation="blurInUp" startOnView className="text-xl text-gray-500">
              {`जहाँ वाणी से ज्ञान, संस्कारों से जीवन और प्रेम से आत्मा का जागरण होता है। \n ‘आत्मदर्शनम्’ केवल आध्यात्मिक ज्ञान की यात्रा नहीं, बल्कि बच्चों और युवाओं को वाणी, \nसंस्कार, प्रेम और सेवा से जोड़कर एक सुंदर, सदाचारी और आनंदमय जीवन की नींव रखने का प्रयास है। 💖`}
            </TextAnimate>
          </div>

          <div className="grid gap-8  md:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 */}
            <div className="bg-lime-200 rounded-3xl p-6 pb-0">
              <TextAnimate animation="blurInUp" by="line"
                delay={0.1}
                segmentClassName="block" startOnView className="text-xl text-lime-900  font-bold mb-3">
                {`क्या आपने इन सवालों पर सोचा है?`}
              </TextAnimate>

              <TextAnimate by="line" as="p" delay={0.6}
                animation="fadeIn" startOnView className="text-gray-700 text-base mb-6 text-start">
                {`✔️ मैं वास्तव में कौन हूँ? \n✔️ श्री प्राणनाथ जी की वाणी मेरे जीवन को क्या सिखाती है? \n✔️ प्रेम, सेवा, सदाचार और संस्कारों को जीवन में कैसे उतारें? \n✔️ आत्मदर्शनम् आपको अपनी आत्मिक पहचान और निजानंद के संस्कारों से जुड़ने का अवसर देता है।`}
              </TextAnimate>

              <div className="relative">
                <Image
                  src="/AD_dyk.png"
                  alt="Learning"
                  height={232}
                  width={341}
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  मैं कौन हूँ
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  जीवन का उद्देश्य
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  श्री प्राणनाथ जी
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-200 rounded-3xl p-6 pb-0">
              <TextAnimate animation="blurInUp" by="line"
                delay={0.1}
                segmentClassName="block" startOnView className="text-xl text-purple-700 font-bold mb-3">
                {`आत्मदर्शनम् में क्या मिलेगा ??`}
              </TextAnimate>

              <TextAnimate by="line" as="p" delay={0.6}
                animation="fadeIn" startOnView className="text-gray-700 text-base mb-6 h-42 text-start whitespace-pre-line">
                {`✔️ श्री प्राणनाथ जी की वाणी और बीतक से सहज परिचय। \n✔️ रोचक कॉमिक्स, चित्रावली, खेल और प्रश्नोत्तरी के माध्यम से सीखने का आनंद। \n✔️ प्रेम, सेवा, सदाचार और अच्छे संस्कारों को जीवन में अपनाने की प्रेरणा। \n✔️ आत्मदर्शनम् — ज्ञान, संस्कार और आनंद से जुड़ने की एक सुंदर यात्रा।`}
              </TextAnimate>

              <div className="relative">
                <Image
                  src="/AD_wug.png"
                  alt="Learning"
                  height={232}
                  width={341}
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  श्री बीतक साहेब
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  बाल आत्मदर्शनम्
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  युवा आत्मदर्शनम्
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-pink-200 rounded-3xl p-6 pb-0">
              <TextAnimate animation="blurInUp" by="line"
                delay={0.1}
                segmentClassName="block" startOnView className="text-xl text-pink-700  font-bold mb-3">
                {`आत्मदर्शनम् से कैसे जुड़े ??`}
              </TextAnimate>

              <TextAnimate by="line" as="p" delay={0.6}
                animation="fadeIn" startOnView className="text-gray-700 text-base mb-6 text-start  h-42">
                {` 📅 दिन: हर रविवार \n🕒 समय: दोपहर 2:30 से 4:00 बजे \n 📍 स्थान: ज़ूम पर ऑनलाइन
                \n\n📞 संपर्क करें:\n✔️ कमलेश भाई पटेल: +91 96386 35307 \n✔️ प्रवीण भाई पटेल: +91 89802 03794`}
              </TextAnimate>

              <div className="relative">
                <Image
                  src="/AD_htc.png"
                  alt="Learning"
                  height={232}
                  width={341}
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  ज़ूम कार्यक्रम
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  निजानंद
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  हर रविवार
                </span>
              </div>
            </div>

          </div>
        </div>
        {/* Cards Carousel */}
        <div className="sm:mt-20 mt-0 relative">

          <div className="grid md:grid-cols-1 gap-2 items-start mb-16">
            {/* Left */}
            <TextAnimate animation="blurInUp" by="line"
              delay={0.1}
              segmentClassName="block" startOnView className="text-3xl font-bold text-black mb-1">
              {`वाणी, संस्कार और प्रेम के पल`}
            </TextAnimate>
            <TextAnimate by="line"
              delay={0.3}
              segmentClassName="block" animation="blurInUp" startOnView className="text-xl text-gray-500">
              {`जहाँ ज्ञान रोचक बनता है, संस्कार सहज बनते हैं और वाणी हृदय में उतरती है।`}
            </TextAnimate>
          </div>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                { title: "बाल आत्मदर्शनम्", img: "/adimg1.png", link: '' },
                { title: "बीतक कॉमिक्स", img: "/adimg2.png", link: '' },
                { title: "बीतक पात्र वेश", img: "/adimg3.png", link: '' },
                { title: "बाल आत्मदर्शनम्", img: "/adimg1.png", link: '' },
                { title: "बाल आत्मदर्शनम्", img: "/prayer1.png", link: '' },
                { title: "बाल आत्मदर्शनम्", img: "/Picture 7.png", link: '' },
              ].map((card, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/3 basis-[85%]"
                >
                  <motion.div
                    key={i}
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.2
                    }}
                    className="h-full"
                  >
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-4xl bg-white shadow-md"
                    >
                      <Image
                        src={card.img}
                        alt={card.title}
                        width={500}
                        height={500}
                        className="h-62.5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0  bg-linear-to-t from-[#4b2440] via-[#4b2440]/60 to-transparent  p-6">
                        <p className="text-white text-lg font-semibold whitespace-pre-line">
                          {card.title}
                        </p>
                        
                      </div>
                    </div>
                  </motion.div>
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


        <div className="relative sm:mt-20 mt-8 pt-0">
          <div className="mb-4 text-center">
            <TextAnimate animation="blurInUp" by="line"
              delay={0.1}
              segmentClassName="block" startOnView className="text-red-600 text-xl block mb-4">
              {` ब्रह्मवाणी और वर्णमाला से प्रेरित`}
            </TextAnimate>
            <h2 className="flex flex-row justify-center  text-3xl text-center md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-3">
              <TextAnimate animation="blurInUp" startOnView delay={0.3}>
                शिशु नाम&nbsp;
              </TextAnimate>{"  "}
              <TextAnimate animation="blurInUp" startOnView delay={0.5} className="text-orange-500">
                और उनके अर्थ सूची
              </TextAnimate>
            </h2>
            <TextAnimate by="line"
              delay={0.3}
              segmentClassName="block" animation="blurInUp" startOnView className="text-muted-foreground text-xl sm:mb-24 mb-0">
              {`बच्चे का नया नाम चुनना आसान और मज़ेदार लग सकता है, लेकिन ऐसा नाम ढूँढ़ना जो आपके दिल को छू जाए, इसके लिए समय चाहिए।\n इसलिए, आपकी मदद करने के लिए, हमने लड़कियों और लड़कों के लिए कुछ अनोखे भारतीय बेबी नेम खोजे हैं। इन भारतीय बेबी नेम का उल्लेख उनके अर्थों के साथ किया गया है, जिससे आपके लिए सही नाम चुनना आसान हो जाएगा।
            `}
            </TextAnimate>

          </div>

          <div className="bg-white rounded-3xl flex flex-col max-h-[85vh] overflow-hidden">

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto sm:px-6 sm:py-6 p-4 space-y-6 bg-[#fcf3fc]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 animate-fadeIn ${msg.role === "ai" ? "justify-start" : "justify-end"
                    }`}
                >
                  {msg.role === "ai" && (
                    <div className="sm:w-20 sm:h-20 w-12 h-12 rounded-full bg-white overflow-hidden sm:bg-[#fcf3fc]">
                      <Image src="/Cute Tiger.gif"
                        height={80}
                        width={80}
                        alt="Cute"
                      />
                    </div>
                  )}

                  <div
                    className={` px-5 py-3 text-xl   ${msg.role === "ai"
                      ? "bg-white text-gray-800 rounded-e-2xl rounded-tl-2xl max-w-[85%] sm:max-w-[75%]"
                      : "bg-orange-200 text-gray-800 rounded-s-2xl rounded-tr-2xl max-w-[75%]"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-12 h-12  overflow-hidden bg-white rounded-full ">
                      <Image src="/profile_girl.png"
                        height={80}
                        width={80}
                        alt="Cute"
                      />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image src="/Cute Tiger.gif"
                      height={80}
                      width={80}
                      alt="Cute"
                    />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl flex gap-1">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>




      </section>
    </>
  );
}