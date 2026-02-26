"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Briefcase, Calendar, CircleUserRound, Gauge, Globe, Hourglass, MapPin, MapPinHouse, MessageCircleQuestionMark, Phone, PhoneCall, PlayCircleIcon, School, Speech, Timer, UsersRound } from "lucide-react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { BOOKS, quotes, songs, VIDEO_CATEGORIES, sahiyogitaList } from "@/lib/gyankendra"
import { articles } from "@/lib/articles";
import useEmblaCarousel from "embla-carousel-react"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import {
  File, Search, Settings, Heart,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Play,
  Pause,
  CirclePlay,
} from "lucide-react"
import Image from "@/components/BaseImage";
import {
  Carousel,
  CarouselContent,
  CarouselApi,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import { MessageSquareQuote, QuoteIcon } from "lucide-react";
import LetterGlitch from '../../components/LetterGlitch';
type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: string;
  cover: string;
  audio: string;
};

const basePath =
  process.env.NODE_ENV === "production" ? "/spjvweb" : "";

export default function Gyanbhandar() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = songs[currentIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [likedSongs, setLikedSongs] = useState<number[]>([]);

  const [displayJobs, setDisplayJobs] = useState(VIDEO_CATEGORIES);
  const CENTER_INDEX = Math.floor(displayJobs.length / 2);


  // Always keep center index fixed
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayJobs((prev) => {
        const updated = [...prev];
        updated.push(updated.shift()!);
        return updated;
      });
    }, 19000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleItemClick = (clickedIndex: number) => {
    setDisplayJobs((prev) => {
      const updated = [...prev];

      const diff = clickedIndex - CENTER_INDEX;

      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          updated.push(updated.shift()!);
        }
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) {
          updated.unshift(updated.pop()!);
        }
      }

      return updated;
    });
  };

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("likedSongs");
    if (stored) {
      setLikedSongs(JSON.parse(stored));
    }
  }, []);
  const toggleLike = (id: number) => {
    const updated = likedSongs.includes(id)
      ? likedSongs.filter((songId) => songId !== id)
      : [...likedSongs, id];

    setLikedSongs(updated);
    sessionStorage.setItem("likedSongs", JSON.stringify(updated));
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const heights = Array.from({ length: 40 }).map(
      () => Math.random() * 100
    );
    setWaveHeights(heights);
  }, [currentIndex]);
  // Load song smoothly
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (hasInteracted) {
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  }, [currentIndex]);

  // Autoplay next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlaying) {
        await audioRef.current.play();
        setHasInteracted(true);
      } else {
        audioRef.current.pause();
      }

      setIsPlaying(!isPlaying);
    } catch (err) {
      console.log("Playback prevented:", err);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const formatTime = (time: number) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercent =
    duration > 0 ? (progress / duration) * 100 : 0;
  const handleShare = async () => {
    const shareData = {
      title: currentSong.title,
      text: `Listening to ${currentSong.title} by ${currentSong.artist}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  return (
    <>
      {!isMobile ? (
        <LetterGlitch
          glitchSpeed={50}
          centerVignette
          outerVignette
          smooth
          glitchColors={["#ff6b00", "#ff0000", "#c713d7"]}
          characters="श्री प्राणनाथ जी वाणी परिवार"
          fontFamily="font-arya"
        />
      ) : (
        <></>
      )}

      <div className="relative max-w-7xl mx-auto px-6 py-10 overflow-hidden pt-30 text-center font-arya ">

        <section className="relative  pt-0">
          <div className="max-w-7xl mx-auto  text-start">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-black mb-8">
              पुस्तकालय
              <p className="mt-2 text-xl text-gray-500">एक कदम अखंड आनंद की ओर</p>
            </h2>

            {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
              <OrbitingCircles>
                {quotes.map((quotes, index) => (
                  <p key={index} className="w-[500px]">
                    {quotes.text}
                  </p>
                ))}
              </OrbitingCircles>
            </div> */}

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
                      <span className="relative mb-1 rounded-full inline-flex items-center bg-white px-2 py-1 text-xs font-xl inset-ring text-red-600  inset-ring-red-500/10">
                        {book.languages}
                      </span>
                      {/* Text */}
                      <h3 className="font-semibold text-lg text-black mb-2">
                        {book.title}
                      </h3>

                      <p className="text-sm text-gray-800 mb-2 line-clamp-2">
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
                      <div className="flex gap-2">
                        {/* Button */}
                        <Link href={`/gyanbhandar/book/${book.id}`}>
                          <Button
                            variant="outline"
                            className="rounded-full  border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                          >
                            इसे पढ़ें
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                        >
                          डाउनलोड करें
                        </Button>
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
            <div className="mt-10 max-w-4xl mx-auto text-center relative px-6">

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <MessageSquareQuote size={76} className="text-orange-500 mb-6" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  {/* Quote */}
                  <p className="text-3xl md:text-4xl leading-relaxed text-[#7a2f18] font-medium mb-8">
                    {quotes[index].text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400">
                      <Image
                        src={quotes[index].image}
                        alt={quotes[index].name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="text-left">
                      <p className="text-lg font-semibold text-[#7a2f18]">
                        {quotes[index].name}
                      </p>
                      <p className="text-sm text-gray-500">आध्यात्मिक वाणी</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-12 mt-16">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-black mb-8 text-start">
            ब्रह्मवाणी ऑडियो
            <p className="mt-2 text-xl text-gray-500">ब्रह्मवाणी की अखण्ड धारा</p>
          </h2>
          <div className="grid lg:grid-cols-3 gap-12 mt-8 items-start">

            {/* LEFT PLAYER */}
            <div className="backdrop-blur-xl bg-white border border-white/30 rounded-3xl p-8 relative lg:col-span-1 transition-all duration-500">

              <div className="flex justify-between mb-8">
                <Heart onClick={() => toggleLike(currentSong.id)}
                  className={`cursor-pointer hover:text-orange-500 ${likedSongs.includes(currentSong.id)
                    ? "text-red-500 fill-red-500"
                    : "hover:text-red-400"
                    }`} />
                <Share2 onClick={handleShare}
                  className="cursor-pointer hover:text-orange-500" />
              </div>

              {/* Animated Cover */}
              <div className="flex justify-center">
                <motion.img
                  key={currentSong.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={isPlaying ? `${basePath}/old_record.png` : `${basePath}${currentSong.cover}`}
                  alt={currentSong.title}
                  className={`w-52 h-52 rounded-full object-cover shadow-2xl ${isPlaying ? "animate-spin-slow" : ""
                    }`}
                />
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm">{currentSong.artist}</p>
                <h2 className="text-2xl font-semibold mt-1">
                  {currentSong.title}
                </h2>
                <p className="text-gray-400 mt-1">
                  {currentSong.album} • {currentSong.year}
                </p>
              </div>

              {/* Apple-style Animated Waveform */}
              <div className="flex items-end justify-center gap-[3px] h-16 mt-8">
                {mounted &&
                  waveHeights.map((height, i) => (
                    <div
                      key={i}
                      className={`w-[3px] rounded-full ${isPlaying ? "bg-black animate-wave" : "bg-gray-300"
                        }`}
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
              </div>

              {/* Time */}
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Progress Bar */}
              <div
                className="h-2 bg-gray-200 rounded-full cursor-pointer mt-2"
                onClick={(e) => {
                  if (!audioRef.current) return;
                  const rect =
                    (e.target as HTMLDivElement).getBoundingClientRect();
                  const percent =
                    (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime =
                    percent * duration;
                }}
              >
                <div
                  className="h-full bg-black rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-8 mt-8">

                <Shuffle className="cursor-pointer text-orange-500" />

                <SkipBack
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? songs.length - 1 : prev - 1
                    )
                  }
                />

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>

                <SkipForward
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % songs.length)
                  }
                />

                <Repeat className="cursor-pointer" />
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={`${basePath}${currentSong.audio}`} />
              </audio>
            </div>

            {/* RIGHT SONG LIST */}
            <div className="lg:col-span-2 space-y-1 max-h-[688px] overflow-y-auto scroll-smooth ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
                {songs.map((song, index) => {
                  const isActive = index === currentIndex;

                  return (
                    <motion.div
                      key={song.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex items-center justify-between gap-4 p-4  rounded-3xl cursor-pointer transition-all 
                      ${isActive
                          ? "bg-orange-100 "
                          : "hover:bg-gray-100 bg-white"
                        }`}
                    >
                      <div className="flex gap-4 items-center w-full">
                        <Image
                          src={song.cover}
                          alt={song.title}
                          height={64}
                          width={64}
                          className={`w-14 h-14 object-cover rounded-lg ${isActive && isPlaying
                            ? "animate-pulse"
                            : ""
                            }`}
                        />
                        <div className="text-start flex-auto">
                          <span
                            className={`relative mb-1 rounded-full inline-flex items-center bg-white px-2 py-1 text-xs font-xl inset-ring ${song.album === "चितवन"
                              ? "text-red-600  inset-ring-red-500/10"
                              : "text-purple-600  inset-ring-purple-500/10"
                              }`}>
                            {song.album}
                          </span>
                          <h2 className="text-lg font-semibold">
                            {song.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {song.artist}
                          </p>
                        </div>
                        <div className="text-orange-600 flex flex-col items-center gap-1">
                          <PlayCircleIcon />
                          <span>प्ले वाणी</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-12 mt-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-3">
              <span className="text-red-600 text-xl block mb-4">|| श्री जी वचन कहे बेसुमार ||</span>
              ब्रह्मवाणी वीडियो <span className="text-orange-500"> और  <br />ई-मंथन लेखन सूची </span>

            </h2>

            <p className="text-muted-foreground text-xl  mb-24">
              ब्रह्मवाणी वीडियो की अखण्ड धारा और <br />जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं।
            </p>
          </div>
          <div className="w-full grid lg:grid-cols-2 gap-12">
            {/* ================= LEFT ROTATING LIST ================= */}
            <div className="relative h-[420px] overflow-hidden flex items-start">
              <motion.ul
                key={displayJobs.map((j) => j?.id).join("-")}
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4 w-full"
              >
                {displayJobs.map((job, index) => {
                  const CENTER_INDEX = Math.floor(displayJobs.length / 2);
                  const isActive = index === CENTER_INDEX;

                  return (
                    <motion.li
                      key={`${job?.id}-${index}`}
                      layout
                      onClick={() => handleItemClick(index)}
                      className={`list-none rounded-xl p-2 px-5 border transition-all duration-300 cursor-pointer
                        ${isActive
                          ? "border-orange-500 border-4"
                          : "bg-white border-gray-200  opacity-60 hover:opacity-100  scale-[0.9] opacity-25"
                        }`}
                    >
                      <div className="py-2 sm:py-2">
                        <div className="flex items-center gap-2">
                          <div className="shrink-0">
                            <Image height={64} width={64} className="w-16 h-16 rounded-full bg-orange-200" src="/channel_spjv.jpg" alt="" />
                          </div>
                          <div className="flex-1 min-w-0 ms-0 ">
                            <h3 className="text-xl flex gap-4 items-start mb-2">
                              {job?.title}
                            </h3>
                            <p className="text-base flex items-start text-gray-500 flex gap-2  whitespace-pre-line">
                              <Speech size={14} className="mr-1 text-orange-600" />{job?.by}
                            </p>
                          </div>
                          <div className="inline-flex items-start  text-gray-500 font-medium text-heading">
                            <UsersRound size={14} className="mr-1 text-orange-600" /> {job?.authore}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Fade Top */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fdf2ed] to-transparent" />

              {/* Fade Bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fdf8f9] to-transparent" />
            </div>

            {/* ================= RIGHT DETAIL CARD ================= */}
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayJobs[Math.floor(displayJobs.length / 2)]?.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-3xl"
                >
                  {(() => {
                    const activeJob =
                      displayJobs[Math.floor(displayJobs.length / 2)];

                    return (
                      <>
                        <div className="bg-[#ffffff] p-6 rounded-3xl">
                          <div className="max-w-4xl mx-auto">
                            {/* VIDEO CONTAINER */}
                            <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl">
                              <iframe
                                className="w-full h-[320px]"
                                src={`https://www.youtube.com/embed/videoseries?list=${activeJob?.vid}`}
                                allowFullScreen
                              />
                              <span className="absolute bottom-2 animate-bounce flex left-4 bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                                <Speech size={14} className="mr-1 " />{activeJob?.by}
                              </span>

                            </div>

                            {/* BOTTOM INFO SECTION */}
                            <div className="flex justify-between items-start mt-6 px-2">
                              <div className="text-start">

                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                  <span className="text-sm text-gray-500">प्लेलिस्ट नाम : </span><br /> {activeJob?.title}
                                </h2>
                                <div className="flex items-center text-gray-500 mb-4 space-x-4 text-sm">
                                  <div className="flex items-center text-base text-gray-500">
                                    <UsersRound size={14} className="mr-1 text-orange-600" />
                                    यूट्यूब चैनल : <span className="text-base text-red-500 ms-2"> {activeJob?.authore}</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-gray-600 text-sm">
                                <a className="text-orange-600 flex items-center justify-end gap-4 w-full" target="_blank" href={`https://www.youtube.com/embed/videoseries?list=${activeJob?.vid}`}>
                                  <Button
                                    variant="outline"
                                    className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                                  >
                                    लाइव प्लेलिस्ट देखें
                                  </Button>
                                </a>

                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-12 mt-16 text-start">
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
                      className="md:basis-1/2 basis-[85%] relative"
                    >
                      <div className="card-circle">{index + 1}</div>
                      <div
                        key={index}
                        className="flex gap-4 bg-white/60 rounded-3xl items-center cardCustome !p-0"
                      >

                        <div className="flex-1 ">
                          <Image height={342} width={608}
                            src={article.image}
                            alt={article.title}
                            className="rounded-l-2xl rounded-b-0 object-cover"
                          />

                          <div className="p-8">
                            <span className="animate-bounce mb-4 inline-block bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                              {article.tag}
                            </span>
                            <h3 className="text-2xl leading-snug line-clamp-1 ">
                              {article.title}
                            </h3>

                            <p className="mt-2 text-base text-muted-foreground">
                              टीका – {article.tikaName}
                              <br />
                              लेखक – {article.writer}
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


        <section className="max-w-7xl mx-auto py-12 pt-8 text-start">
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
                        <Link href={`/gyanbhandar/quiz/${sahiyog.id}`}>
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
        </section>
      </div>
    </>
  );
}