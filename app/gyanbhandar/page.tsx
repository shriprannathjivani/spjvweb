"use client";
import Link from "next/link";
import Testimonials from "@/public/Testimonials.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpenCheck, Briefcase, Calendar, CircleUserRound, Eye, Gamepad2, Gauge, Globe, Hourglass, MapPin, MapPinHouse, MessageCircleQuestionMark, Phone, PhoneCall, PlayCircleIcon, School, Speech, Sun, Timer, UsersRound } from "lucide-react";
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
import { TextAnimate } from "@/components/ui/text-animate";
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

  // State for video category dropdown filtering
  const [selectedTag, setSelectedTag] = useState("All");

  // Generate unique tags dynamically from your video data
  const videoTags = ["All", ...new Set(VIDEO_CATEGORIES.map((job) => job.title || job.by))];

  // Filtered videos based on dropdown selection
  const filteredVideos = selectedTag === "All"
    ? VIDEO_CATEGORIES
    : VIDEO_CATEGORIES.filter((job) => (job.title || job.by) === selectedTag);


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

      <div className="relative max-w-370 mx-auto px-8 py-10 overflow-hidden pt-30 text-center font-arya ">

        <section className="relative  pt-0">
          <div className="max-w-370 mx-auto  text-start">
            {/* Heading */}
            <TextAnimate animation="blurInUp" startOnView delay={0.1} className="text-3xl font-bold text-black mb-2">
              पुस्तकालय &nbsp;
            </TextAnimate>
            <TextAnimate animation="blurInUp" by="line"
              delay={0.3}
              segmentClassName="block" startOnView className="text-xl text-gray-500 mb-8">
              {`एक कदम अखंड आनंद की ओर`}
            </TextAnimate>

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
                    className="pl-4 md:basis-1/5 basis-[85%] relative"
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
                        <h3 className="font-semibold text-base text-center text-black mb-2">
                          {book.title}
                        </h3>

                        {/* <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                          {book.desc}
                        </p> */}

                        {/* <p className="text-sm text-orange-900 font-medium mb-1">
                          {book.author}
                        </p> */}

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
                    </motion.div>
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
                {/* ICON */}
                <Lottie
                  animationData={Testimonials}
                  loop={true}
                  className="w-full sm:w-16 h-16 mb-2"
                />
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
                  <TextAnimate animation="blurInUp" by="line"
                    delay={0.6}
                    segmentClassName="block" startOnView className="text-3xl md:text-4xl leading-relaxed text-[#7a2f18] font-medium mb-8">
                    {quotes[index].text}
                  </TextAnimate>

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

        <section className="max-w-370 mx-auto py-12 mt-16">
          {/* Heading */}
          <TextAnimate animation="blurInUp" startOnView delay={0.1} className="text-3xl font-bold text-black mb-2 text-start">
            ब्रह्मवाणी ऑडियो &nbsp;
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.3}
            segmentClassName="block" startOnView className="text-xl text-gray-500 mb-8 text-start">
            {`ब्रह्मवाणी की अखण्ड धारा`}
          </TextAnimate>
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

        {/* ================= VIDEOS SECTION WITH TAG FILTER & 4-COLUMN GRID ================= */}
        <section className="max-w-370 mx-auto py-12 mt-16">
          {/* Tag Filter Row */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="">
              {/* Heading */}
              <TextAnimate animation="blurInUp" startOnView delay={0.1} className="text-3xl font-bold text-black mb-2 text-start">
                ब्रह्मवाणी वीडियो &nbsp;
              </TextAnimate>
              <TextAnimate animation="blurInUp" by="line"
                delay={0.3}
                segmentClassName="block" startOnView className="text-xl text-gray-500 mb-8 text-start">
                {`ब्रह्मवाणी वीडियो की अखण्ड धारा और\nजिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं।`}
              </TextAnimate>
            </div>
            <div className="relative flex flex-col sm:h-12 h-auto sm:w-72 w-auto">
              <span className="flex mb-2">वीडियो श्रेणियां</span>
              <div className="relative">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium shadow-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-pointer appearance-none transition-all"
                >
                  {videoTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag === "All" ? "सभी श्रेणियां (All Categories)" : tag}
                    </option>
                  ))}
                </select>
                {/* Dropdown Arrow Icon Indicator */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Grid View */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-370 mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col text-start"
                >
                  {/* Video Player */}
                  <div className="relative aspect-video w-full bg-gray-900">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/videoseries?list=${job?.vid}`}
                      allowFullScreen
                      title={job?.title}
                    />
                  </div>
                  {/* CHANNEL + META */}
                  <div className="flex flex-col justify-between h-full gap-4 p-4">
                    {/* Top Row: Title & Watch Live Button */}
                    <div className="flex items-center justify-between w-full  gap-4">
                      <a
                        href={`https://www.youtube.com/playlist?list=${job?.vid}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full "
                      >
                        <h2 className="text-lg md:text-xl font-semibold hover:underline ">{job?.title}</h2>
                      </a>
                    </div>
                    <hr className="border-gray-200" />
                    {/* Bottom Row: Channel Info & Subscribe Button */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {/* Left: Avatar & Details */}
                      <div className="flex items-center gap-3">
                        <div>
                          <Image
                            src="/channelsspjv.jpg"
                            width={40}
                            height={40}
                            alt="channel name"
                            className="w-10 h-10 rounded-full object-cover border-2 border-orange-600"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium">श्री प्राणनाथ जी वाणी</p>
                          <p className="text-xs text-gray-500">
                            👁 47.2K + सब्सक्राइबर्स
                          </p>
                        </div>
                      </div>
                      {/* Right: Subscribe Button */}
                      <a
                        href="https://www.youtube.com/@ShriPrannathJiVani"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 text-sm whitespace-nowrap bg-orange-900 text-white rounded-full hover:scale-105 transition border-2 border-orange-600 cursor-pointer"
                      >
                        सब्सक्राइबर्स
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </>
  );
}


// <section className="max-w-370 mx-auto py-12 mt-16 text-start">
//         <div className="max-w-370 mx-auto">
//           {/* Header */}
//           <div className=" gap-10 items-start">
//             {/* Left */}
//             <TextAnimate animation="blurInUp" startOnView delay={0.1} className="text-3xl font-bold text-black mb-2">
//               ई-मंथन लेखन &nbsp;
//             </TextAnimate>
//             <TextAnimate animation="blurInUp" by="line"
//               delay={0.3}
//               segmentClassName="block" startOnView className="text-xl text-gray-500 mb-8">
//               {`जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं।\nवे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।`}
//             </TextAnimate>
//           </div>

//           {/* Articles Grid */}
//           <div className="mt-12  gap-6">
//             <Carousel
//               setApi={setApi}
//               opts={{
//                 align: "start",
//               }}
//               className=""
//             >
//               <CarouselContent>
//                 {articles.map((article, index) => (
//                   <CarouselItem
//                     key={index}
//                     className="md:basis-1/3 basis-[85%] relative"
//                   >
//                     <motion.div
//                       key={index}
//                       initial={{ y: 60, opacity: 0 }}
//                       whileInView={{ y: 0, opacity: 1 }}
//                       transition={{
//                         duration: 0.6,
//                         delay: index * 0.2
//                       }}
//                       className="h-full"
//                     >
//                       <div className="card-circle">{index + 1}</div>
//                       <div
//                         key={index}
//                         className="flex gap-4 bg-white/60 rounded-3xl items-center cardCustome !p-0"
//                       >

//                         <div className="flex-1 ">
//                           <Image height={342} width={608}
//                             src={article.image}
//                             alt={article.title}
//                             className="rounded-l-2xl rounded-b-0 object-cover"
//                           />

//                           <div className="p-8">
//                             <span className="animate-bounce mb-4 inline-block bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
//                               {article.tag}
//                             </span>
//                             <h3 className="text-2xl leading-snug line-clamp-1 ">
//                               {article.title}
//                             </h3>

//                             <p className="mt-2 text-base text-muted-foreground">
//                               टीका – {article.tikaName}
//                               <br />
//                               लेखक – {article.writer}
//                             </p>

//                             <div className="mt-4 flex items-center justify-between text-base text-muted-foreground">
//                               <span>{article.date}</span>

//                               <Link href={`/gyanbhandar/article/${article.id}`}>
//                                 <Button
//                                   variant="outline"
//                                   className="rounded-full  border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
//                                 >
//                                   लेख पढ़ें
//                                 </Button>
//                               </Link>
//                             </div>
//                           </div>

//                         </div>
//                       </div>
//                     </motion.div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               {/* Custom Controls */}
//               <div className="mt-4 flex items-center justify-between">
//                 <CarouselDots api={api} />

//                 {/* Arrows */}
//                 <div className="flex gap-3">
//                   <CarouselPrevious
//                     className="static h-10 w-10 mt-5 rounded-full border border-gray-300
//                          text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer"
//                   />
//                   <CarouselNext
//                     className="static h-10 w-10 mt-5 rounded-full border border-orange-500
//                          text-orange-500 hover:bg-orange-50 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </Carousel>
//           </div>
//         </div>
// </section>
