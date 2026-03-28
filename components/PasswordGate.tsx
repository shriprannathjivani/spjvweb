"use client";

import { useState, useEffect } from "react";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import {
    Carousel,
    CarouselContent,
    CarouselApi,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Info, Link, MessageSquareQuote } from "lucide-react";
import { CarouselDots } from "@/components/carousel-dots"
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TextAnimate } from "./ui/text-animate";

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

export default function PasswordGate({ children }: any) {
    const router = useRouter();
    const [api, setApi] = React.useState<CarouselApi>()
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("auth") === "true") {
            setIsAuthorized(true);
        }
    }, []);

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 4000); // 4 sec

        return () => clearInterval(interval);
    }, [api]);

    const handleSubmit = async () => {
        const res = await fetch("/api/check-password", {
            method: "POST",
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            localStorage.setItem("auth", "true");
            setIsAuthorized(true);

            // 🔥 Redirect to dashboard
            router.push("/dashboard"); // change route if needed
        } else {
            setError("गलत आई डी");
        }
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">

                {/* 🔐 LEFT: LOGIN */}
                <div className="flex items-center justify-center px-6 py-10 bg-white text-center">
                    <div className="w-full max-w-md space-y-6">

                        {/* Title */}
                        <div className="flex flex-col gap-0 text-center text-neut-darkest">
                            <h1 className="text-3xl font-bold mb-2">लॉगिन विथ स.स.ओ</h1>
                            <p className="text-gray-500 text-lg ">
                                इस सेवा तक पहुँचने के लिए आई डी दर्ज करें
                            </p>
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (!password.trim()) {
                                    setError("पासवर्ड आवश्यक है");
                                    return;
                                }

                                handleSubmit();
                            }}
                            className="space-y-4"
                        >
                            {/* Input */}
                            <div className="space-y-2">
                                <label className="text-left text-gray-600 text-lg flex">
                                    स.स.ओ आई डी
                                </label>

                                <input
                                    type="password"
                                    placeholder="आई डी"
                                    required
                                    minLength={4}
                                    onInvalid={(e: any) =>
                                        e.target.setCustomValidity("कृपया पासवर्ड दर्ज करें")
                                    }
                                    onInput={(e: any) => e.target.setCustomValidity("")}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition
                                    ${error
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-black focus:ring-orange-400"}
                                    focus:outline-none focus:ring-2`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError("");
                                    }}
                                />

                                {error && (
                                    <p className="text-red-800 text-sm text-left flex gap-2 items-center"><Info size={16}/>{error}</p>
                                )}
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                disabled={!password.trim()}
                                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >
                                लॉगिन विथ स.स.ओ
                            </Button>
                        </form>

                        {/* Info */}
                        <p className="text-lg text-gray-400">
                            यह सेवा सुरक्षित है। कृपया सही पासवर्ड दर्ज करें।
                        </p>
                    </div>
                </div>

                {/* 🌿 RIGHT: IMAGE + QUOTE */}
                <div className="hidden lg:flex items-center justify-center bg-[#f6ebe7] p-10">
                    <div className="max-w-lg text-center space-y-6">

                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
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
                                            <div className="mt-10 max-w-4xl mx-auto text-center relative px-6">


                                                <div className="text-orange-500 text-[76px] mb-1 leading-6">❝</div>


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
                                                            segmentClassName="block" startOnView className="text-3xl leading-8 md:text-2xl text-[#7a2f18] font-medium">
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
        );
    }

    return children;
}