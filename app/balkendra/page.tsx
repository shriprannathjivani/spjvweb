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

    if (filtered.length === 0) {
      addAIMessage("इस अक्षर से कोई नाम उपलब्ध नहीं है।");
    } else {
      addAIMessage(


        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-3 gap-2 items-start">
          {filtered.map((item) => (
            <div className="relative" key={item.id}>
              <div className="card-circle !bg-orange-100">{item.id}</div>
              <div className="group !bg-orange-100 rounded-2xl !p-4 !px-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer cardCustome">

                <div className="flex items-start justify-start gap-2">
                  <img src={item.babyG === "b" ? "/babyboy.png" : "/babygirl.png"} width="60px" className="scale-x-[-1]"/>
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
      <section className="relative max-w-7xl mx-auto px-6 py-10 overflow-hidden pt-0 font-arya ">



        {/* 🔶 कार्यक्रम */}
        <div className=" relative flex h-[500px] w-full flex-col items-center justify-center text-center ">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">खेलें, सीखें, बढ़ें: <br /><span className="text-orange-500">उज्ज्वल भविष्य यहीं से शुरू होता है।</span></h2>
          <p className="mt-4 text-muted-foreground text-xl  mb-12">इंटरएक्टिव पाठ, रोचक खेल और व्यक्तिगत शिक्षण मार्ग।</p>
          <Ripple />
        </div>
        <div className="mt-[-100px]">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-[20%_60%_20%] gap-10 items-center">

            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  'बाल आत्मदर्शनम्' <br />
                  हर रविवार की दिव्य दोपहर:
                </h3>
                <p className="mt-3 text-gray-600 text-sm md:text-base">
                  हर रविवार हमारी कक्षा में एक नई यात्रा है। हम रोमांचक बीतक कॉमिक्स की खोज करेंगे।
                </p>
              </div>

              <div className="">
                <p className="text-xl text-orange-900 mt-0 mb-4">इस साल 400+ से ज्यादा बाल इसमें हिस्सा ले चुके हैं।</p>
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/ramratandasji.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/sarkarshree.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="relative">
              <img
                src="/balkendraAD.png"
                alt="बच्चा पढ़ाई करते हुए"
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
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-gray-600 text-sm md:text-base">
                ‘आत्मदर्शनम्’ एक ऐसा अनोखा मंच है, जो आपको आत्मा की गहराई तक ले जाकर इन सवालों के उत्तर खोजने में मदद करता है।
              </p>
              <Button
                variant="outline"
                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                शुरुआत करें
              </Button>
            </div>
          </div>
        </div>
        <div className="py-8 my-16">

          <div className="grid md:grid-cols-1 gap-2 items-start mb-16">
            {/* Left */}
            <h2 className="text-3xl font-bold text-black mb-1">
              नित्य प्रार्थना संदेश
            </h2>
            <p className="text-xl text-gray-500">
              ‘आत्मदर्शनम्’ एक ऐसा अनोखा मंच है, <br />जो आपको आत्मा की गहराई तक ले जाकर इन सवालों के उत्तर खोजने में मदद करता है।
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 */}
            <div className="bg-lime-200 rounded-3xl p-6 pb-0">
              <h3 className="text-xl text-lime-900  font-bold mb-3">
                क्या आपने इन सवालों पर सोचा है?
              </h3>

              <p className="text-gray-700 text-base mb-6">
                ✔️ मैं वास्तव में कौन हूँ? <br />
                ✔️ जीवन का सच्चा उद्देश्य क्या है? <br />
                ✔️ स्थायी शांति और आनंद कहाँ मिलते हैं? <br />
                ✔️ क्योंकि सच्चा सुख और शांति बाहरी दुनिया में नहीं, बल्कि आपके भीतर है। <br />
                ✔️ आत्मदर्शनम् आपको इस अनमोल सच्चाई का अनुभव कराता है।
              </p>

              <div className="relative">
                <img
                  src="/AD_dyk.png"
                  alt="Learning"
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  आत्मदर्शनम्
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  ध्यान / चितवन
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  श्री बाल बीतक साहेब
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-200 rounded-3xl p-6 pb-0">
              <h3 className="text-xl text-purple-700 font-bold mb-3">
                आत्मदर्शनम् में क्या मिलेगा ??
              </h3>

              <p className="text-gray-700 text-base mb-6">
                ✔️ ध्यान और साधना के माध्यम से मन की शांति का अनुभव। <br />
                ✔️ भीतर छिपी अनंत शक्ति और दिव्यता को जागृत करना। <br />
                ✔️ जीवन को एक नई दृष्टि और स्पष्टता के साथ देखना। <br /><br /><br /><br />
              </p>

              <div className="relative">
                <img
                  src="/AD_wug.png"
                  alt="Learning"
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  आत्मदर्शनम्
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  ध्यान / चितवन
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  श्री बाल बीतक साहेब
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-pink-200 rounded-3xl p-6 pb-0">
              <h3 className="text-xl text-pink-700  font-bold mb-3">
                आत्मदर्शनम् से कैसे जुड़े ??
              </h3>

              <p className="text-gray-700 text-base mb-6">
                📅 दिन: हर रविवार <br /> 🕒 समय: दोपहर 2:30 से 4:00 बजे <br /> 📍 स्थान: ज़ूम पर ऑनलाइन <br /><br />
                📞 संपर्क करें:<br />
                ✔️ कमलेश भाई पटेल: +91 96386 35307 <br />
                ✔️ प्रवीण भाई पटेल: +91 89802 03794
              </p>

              <div className="relative">
                <img
                  src="/AD_htc.png"
                  alt="Learning"
                  className="rounded-2xl w-full object-cover"
                />

                {/* Tags */}
                <span className="absolute top-4 left-32 bg-yellow-300 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  आत्मदर्शनम्
                </span>

                <span className="absolute bottom-4 right-4 bg-purple-200 text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  ध्यान / चितवन
                </span>

                <span className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full animate-bounce">
                  श्री बाल बीतक साहेब
                </span>
              </div>
            </div>

          </div>
        </div>
        {/* Cards Carousel */}
        <div className="mt-20 relative">

          <div className="grid md:grid-cols-1 gap-2 items-start mb-16">
            {/* Left */}
            <h2 className="text-3xl font-bold text-black mb-1">
              सीखने, खेलने और विकास के पल
            </h2>
            <p className="text-xl text-gray-500">
              हमारी आनंदमय कक्षाओं, रोचक गतिविधियों और पोषणपूर्ण आत्मदर्शनम् वातावरण की एक झलक।
            </p>
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
                  className="pl-4 md:basis-1/4 basis-[85%]"
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
                      className="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Title overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white text-lg font-semibold whitespace-pre-line">
                        {card.title}
                      </p>
                      <Link className="text-white flex items-center justify-end gap-4 mt-4 w-full" href={card.link}>
                        लाइव सेशन देखें <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white-500 text-white-500 cursor-pointer hover:bg-orange-600 hover:text-white">
                          <ArrowUpRight size={20} />
                        </span>
                      </Link>
                    </div>
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


        <div className="relative mt-20 pt-0">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-3">
              <span className="text-red-600 text-xl block mb-4">ब्रह्मवाणी और वर्णमाला से प्रेरित</span>
              शिशु नाम  <span className="text-orange-500"> और उनके अर्थ सूची </span>

            </h2>

            <p className="text-muted-foreground text-xl mb-24">
              बच्चे का नया नाम चुनना आसान और मज़ेदार लग सकता है, लेकिन ऐसा नाम ढूँढ़ना जो आपके दिल को छू जाए, इसके लिए समय चाहिए।  <br />
              इसलिए, आपकी मदद करने के लिए, हमने लड़कियों और लड़कों के लिए कुछ अनोखे भारतीय बेबी नेम खोजे हैं। इन भारतीय बेबी नेम का उल्लेख उनके अर्थों के साथ किया गया है, जिससे आपके लिए सही नाम चुनना आसान हो जाएगा।
            </p>
          </div>

          <div className="bg-white rounded-3xl flex flex-col max-h-[85vh] overflow-hidden">

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#fcf3fc]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 animate-fadeIn ${msg.role === "ai" ? "justify-start" : "justify-end"
                    }`}
                >
                  {msg.role === "ai" && (
                    <div className="w-20 h-20 overflow-hidden ">
                      <img src="/Cute Tiger.gif" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] px-5 py-3 text-xl   ${msg.role === "ai"
                      ? "bg-white text-gray-800 rounded-e-2xl rounded-tl-2xl"
                      : "bg-orange-200 text-gray-800 rounded-s-2xl rounded-tr-2xl"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-12 h-12  overflow-hidden bg-white rounded-full ">
                      <img src="/profile_girl.png"  />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src="/Cute Tiger.gif" />
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