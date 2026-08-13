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
import { Ripple } from "@/components/ui/ripple";



export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Chapter {
  id: number;
  questions: Question[];
}

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
  process.env.NODE_ENV === "production" ? "" : "";

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [offsetY, setOffsetY] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [randomChopai, setRandomChopai] = useState<ChopaiItem | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);


  const parseQuizText = (text: string): Chapter[] => {
    const chapterBlocks = text.split(/——————————————/);

    return chapterBlocks
      .map((block, index) => {
        // Split by Q followed by a number
        const questionBlocks = block.split(/Q\d+\./).filter(q => q.trim().length > 5);

        const questions: Question[] = questionBlocks.map((qBlock, qIdx) => {
          const lines = qBlock.trim().split("\n");
          const questionText = lines[0].trim();

          let detectedCorrectAnswer = "";

          const options = lines
            .filter(line => /^[A-D]\./.test(line.trim()) || line.trim().includes("✔️"))
            .map(line => {
              let cleanLine = line.trim();

              // 1. Check if this specific line is marked as correct
              if (cleanLine.includes("✔️")) {
                // 2. Extract the actual text value before we clean it
                // We remove the emoji, the stars, and the "A. " prefix
                const value = cleanLine
                  .replace("✔️", "")
                  .replace(/\*\*/g, "")
                  .replace(/^[A-D]\.\s*/, "")
                  .trim();

                detectedCorrectAnswer = value;
                cleanLine = cleanLine.replace("✔️", "").replace(/\*\*/g, "");
              }

              // 3. Clean all options of A. B. C. D. prefixes for the button labels
              return cleanLine.replace(/^[A-D]\.\s*/, "").trim();
            });

          // 4. Fallback: If no ✔️ was found, look for the "Correct Answer:" line
          if (!detectedCorrectAnswer) {
            const answerMatch = qBlock.match(/Correct Answer:\s*(.*)/);
            detectedCorrectAnswer = answerMatch ? answerMatch[1].trim() : "";
          }

          return {
            id: qIdx + 1,
            question: questionText,
            options,
            correctAnswer: detectedCorrectAnswer,
          };
        });

        return { id: index + 1, questions };
      })
      .filter(chapter => chapter.questions.length > 0);
  };

  const currentChapter = chapters.find(c => c.id === activeChapterId);

  const handleSelect = (chapterId: number, questionId: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [`${chapterId}-${questionId}`]: option }));
  };

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
      Khilvat: "खिलवत",
      Kirantan: "किरन्तन",
      Parikrama: "परिकरमा",
      Singaar: "सिनगार",
      Hindustani: "हिन्दुस्तानी",
      Sagar: "सागर",
      Sanandh: "सनन्ध",
      Khataruti: "खटरुती",
      Kayamatnama: "कयामतनामा",
      Khulasa: "खुलासा",
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

    const fetchData = async () => {
      try {
        const response = await fetch(`${basePath}/allvani/quiz-data.txt`); // Ensure this matches your filename
        const text = await response.text();
        const parsed = parseQuizText(text);
        setChapters(parsed);
        if (parsed.length > 0) setActiveChapterId(parsed[0].id);
      } catch (error) {
        console.error("Error loading quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
      <section className="relative max-w-7xl mx-auto px-6 py-10 overflow-hidden pt-0 font-arya ">

        {/* 🔶 कार्यक्रम */}
        <div className=" relative flex h-[500px] w-full flex-col items-center justify-center text-center " id="game">

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            <TextAnimate animation="blurInUp" startOnView delay={0.3}>
              लाइव, गूगल, गेम क्विज़ेज़  &nbsp;
            </TextAnimate>{"  "}
            <span className="text-orange-500">
              <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                व ब्रह्मवाणी अंताक्षरी
              </TextAnimate>
            </span>
          </h2>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.3}
            segmentClassName="block" startOnView className="mt-4 text-muted-foreground text-xl  mb-12">
            {`ज्ञान, मनोरंजन और आध्यात्मिक सीख से भरपूर खेल एवं गतिविधियाँ`}
          </TextAnimate>
          <Ripple />
        </div>
        {/* 🔶 गेम्स & क्विज़  */}
        <div className="mt-[-100px]" >
          <div className="max-w-7xl mx-auto py-12 pt-0 text-start">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
              {/* Heading */}
              <h2 className="text-3xl font-bold text-black mb-8" >
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
                          className="group  h-full bg-white rounded-3xl transition-all duration-300  cursor-pointer cardCustome !p-0"
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

        <div className="max-w-7xl mx-auto py-12 pt-32 text-start" id="google">
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
                        className="group bg-white rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer cardCustome"
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
        <div className="max-w-7xl mx-auto py-12 pt-32 text-start" id="live">
          <div className="min-h-screen">
            {/* Container with requested Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

              {/* --- Sidebar (Left: 1 Column on Desktop) --- */}
              <div className="sticky top-24 h-fit">
                <aside className="lg:col-span-1 space-y-4 ">
                  <div className="bg-white p-6 rounded-3xl  ">
                    <h2 className="text-xl text-center font-bold text-black mb-4 border-b border-orange-50 pb-2">
                      श्री बीतक साहेब क्विज़
                    </h2>
                    <nav className="grid grid-cols-4 lg:grid-cols-3 gap-2">
                      {chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          onClick={() => setActiveChapterId(chapter.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl  cursor-pointer transition-all duration-200 border-2 ${activeChapterId === chapter.id
                            ? 'bg-orange-500 border-2 border-black text-white shadow-md'
                            : 'bg-white hover:bg-orange-100 border-2 border-transparent'
                            }`}
                        >
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${activeChapterId === chapter.id ? "bg-white/20" : "bg-orange-100 text-orange-600"
                            }`}>
                            {chapter.id}
                          </span>
                          <span className="hidden lg:inline font-medium">क्विज़</span>
                        </button>
                      ))}
                    </nav>
                  </div>


                </aside>
              </div>

              {/* --- Main Section (Right: 2 Columns on Desktop) --- */}
              <main className="lg:col-span-2 bg-white rounded-3xl p-6 w-full max-w-full overflow-hidden">
                {currentChapter ? (
                  <>
                    <h1 className="text-2xl font-bold mb-6 text-gray-700 pb-2 border-b border-gray-100">
                      क्विज़: {currentChapter.id}
                    </h1>


                    <div className="space-y-8">
                      {currentChapter.questions.map((q) => {
                        const selection = userAnswers[`${currentChapter.id}-${q.id}`];
                        const isCorrect = selection === q.correctAnswer;

                        return (
                          <div key={q.id} className="border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed flex gap-4">
                              <span className="text-orange-600">Q{q.id}.</span>
                              {q.question}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {q.options.map((option, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSelect(currentChapter.id, q.id, option)}
                                  className={`p-4 rounded-xl text-left border-2 transition-all duration-200 group ${selection === option
                                    ? isCorrect
                                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                      : "bg-orange-50 border-orange-600 text-orange-700"
                                    : "bg-slate-50 border-transparent hover:border-orange-200 hover:bg-orange-50/50"
                                    }`}
                                >
                                  <span className="font-bold text-orange-600 mr-3 group-hover:scale-110 transition-transform inline-block">
                                    {String.fromCharCode(65 + idx)}.
                                  </span>
                                  {option}
                                </button>
                              ))}
                            </div>

                            {selection && (
                              <div className={`mt-6 p-4 rounded-xl border-l-4 font-medium animate-in fade-in slide-in-from-top-2 ${isCorrect
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                : "bg-orange-50 border-orange-600 text-orange-800"
                                }`}>
                                {isCorrect ? (
                                  <div className="flex items-center gap-2">
                                    <span>✨</span> सही उत्तर! बहुत बढ़िया।
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-tighter opacity-70">सही उत्तर</span>
                                    <span className="text-lg font-bold">{q.correctAnswer}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-white rounded-3xl border-2 border-dashed border-orange-100 text-orange-300 italic">
                    अध्याय का चयन करें
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 pt-32 text-start" id="antakshari">
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