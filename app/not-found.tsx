"use client";

import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Testimonials from "@/public/Testimonials.json";
import Lottie from "lottie-react";
import { Info, Link, MessageSquareQuote } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import EmptyState from "@/public/Empty State.json"

const basePath =
    process.env.NODE_ENV === "production" ? "" : "";
export default function notFound() {
    return (
        <>
            <section className="notfound-bg">
                <div className="max-w-370 mx-auto px-4 lg:px-8 ">
                    <div className="min-h-screen grid grid-cols-1 gap-12">

                        {/* 🔐 LEFT: LOGIN */}
                        <div className="flex items-center justify-center text-center">
                            <div className="w-full ">
                                <div className="flex flex-col items-center justify-center text-center sm:py-20 py-6 sm:px-0 px-4 min-h-[70vh]">
                                    {/* ICON */}
                                    <Lottie
                                        animationData={EmptyState}
                                        loop={true}
                                        className="w-full sm:w-100 h-80"
                                    />
                                    <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-orange-600">
                                        <span className="text-black"> पेज नहीं </span>
                                       मिला
                                    </h2>
                                    <p className="max-w-md text-gray-500 text-sm md:text-xl mb-6">
                                        क्षमा करें, जिस पेज को आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।
                                    </p>
                                    <a href="/">
                                        <Button variant="outline" className="rounded-full border-2 px-6 py-5 text-sm border-black font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"> होम पेज पर जाएं</Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}