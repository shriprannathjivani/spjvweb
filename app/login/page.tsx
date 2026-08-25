"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Testimonials from "@/public/Testimonials.json";
import Lottie from "lottie-react";
import {
    Carousel,
    CarouselContent,
    CarouselApi,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Info, Link, MessageSquareQuote } from "lucide-react";
import { CarouselDots } from "@/components/carousel-dots"
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PASSWORD_HASH } from "@/lib/auth";
import { TextAnimate } from "@/components/ui/text-animate";
const Quotes = [
    {
        text: "ध्यान, वाणी मन्थन और सेवा ही सुन्दरसाथ की आत्मिक सम्पति है",
        name: "श्री राजन स्वामी जी",
        image: "/rajan_swamiji 2.png",
        tag: "श्री कुलजम स्वरूप"
    },
    {
        text: "वाणी मंथन, चितवन और रहनी का कोई विकल्प नहीं",
        name: `"सरकार श्री" जगदीश चन्द्र जी`,
        image: "/sarkarshree.png",
        tag: "श्री कुलजम स्वरूप"
    },
    {
        text: "सदगुरु की महिमा बड़ी, बड़ी हैं उनकी बात। हो समानता किस तरह, बड़ी है उनकी जात।।",
        name: "परमहंस 108 श्री राम रतन दास जी महाराज",
        image: "/ramratandasji.png",
        tag: "श्री कुलजम स्वरूप"
    },
    {
        text: "जो निज नाम ध्यावे, सो भवसागर तर जावे।। श्री प्राणनाथ जी की वाणी अमृत समान है।",
        name: "महामति जी",
        image: "/satguruthree.jpg",
        tag: "श्री कुलजम स्वरूप"
    }
]
const basePath =
    process.env.NODE_ENV === "production" ? "" : "";
export default function LoginPage() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const autoplay = useRef(
        Autoplay({
            delay: 6000,
            stopOnInteraction: false,
        })
    );
    // 🔐 hash function
    async function hash(text: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    // 🔁 already logged in
    useEffect(() => {
        const auth = sessionStorage.getItem("auth");
        const expiry = sessionStorage.getItem("expiry");

        if (auth && expiry && Date.now() < Number(expiry)) {
            window.location.href = `${basePath}/dashboard`;
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!password.trim()) {
            setError("आई डी आवश्यक है");
            return;
        }

        const hashed = await hash(password);

        if (hashed === PASSWORD_HASH) {
            sessionStorage.setItem("auth", "true");

            sessionStorage.setItem(
                "expiry",
                (Date.now() + 24 * 60 * 60 * 1000).toString()
            );

            window.location.href = `${basePath}/dashboard`;
        } else {
            setError("गलत आई डी");
        }
    };

    return (
        <>
            <section className="max-w-370 mx-auto px-4 lg:px-8">
                <div className="min-h-screen grid grid-cols-1 gap-12 lg:grid-cols-[4fr_6fr]">

                    {/* 🔐 LEFT: LOGIN */}
                    <div className="flex items-center justify-center text-center">
                        <div className="w-full rounded-3xl bg-white p-8 py-16 border backdrop-blur-sm border-gray-200">
                            {/* Title */}
                            <div className="flex flex-col gap-0 text-center text-neut-darkest mb-8">
                                <h1 className="text-3xl font-bold mb-2">लॉगिन विथ स.स.ओ</h1>
                                <p className="text-gray-500 text-lg ">
                                    इस सेवा तक पहुँचने के लिए आई डी दर्ज करें
                                </p>
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {/* Input */}
                                <div className="space-y-2">
                                    <label className="text-left text-gray-600 text-lg flex">
                                        स.स.ओ आई डी
                                    </label>

                                    <input
                                        autoFocus
                                        type="password"
                                        placeholder="आई डी"
                                        className={`w-full px-4 py-3 rounded-xl border-2 ${error ? "border-red-500" : "border-black"
                                            }`}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError("");
                                        }}
                                    />

                                    {error && (
                                        <p className="text-red-800 text-sm text-left flex gap-2 items-center"><Info size={16} />{error}</p>
                                    )}
                                </div>

                                {/* Button */}
                                <Button
                                    type="submit"
                                    disabled={!password.trim()}
                                    className="rounded-full  border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    लॉगिन करें
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* 🌿 RIGHT: IMAGE + QUOTE */}
                    <div className="hidden lg:flex items-center justify-center p-10 ">
                        <div className="max-w-lg text-center space-y-6">

                            <Carousel
                                setApi={setApi}
                                opts={{
                                    align: "start",
                                    loop: false,
                                }}
                                plugins={[autoplay.current]}
                            >
                                <CarouselContent>
                                    {Quotes.map((Quote, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="pl-4 md:basis-1/1 relative"
                                        >
                                            <motion.div
                                                key={index}
                                                initial={{ y: 60, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 0.2
                                                }}
                                                className="h-full"
                                            >
                                                <div className="mt-10 max-w-7xl flex flex-col items-center justify-center mx-auto text-center relative px-6">
                                                    {/* ICON */}
                                                    <Lottie
                                                        animationData={Testimonials}
                                                        loop={true}
                                                        className="sm:w-16 h-16 mb-2 "
                                                    />
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
                                                                segmentClassName="block" startOnView className="text-3xl leading-12 md:text-3xl text-[#7a2f18] font-medium">
                                                                {Quote.text}
                                                            </TextAnimate>
                                                            {/* Author */}
                                                            <div className="flex flex-col items-center gap-2 mt-8">
                                                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400">
                                                                    <Image
                                                                        src={Quote.image}
                                                                        alt={Quote.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className="text-base font-semibold text-gray-600">
                                                                        {Quote.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>

                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                            </Carousel>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}