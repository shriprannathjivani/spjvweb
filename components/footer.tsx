"use client";

import Image from "@/components/BaseImage";
import Link from "next/link"
import Testimonials from "@/public/Testimonials.json"
import {
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Mail,
  MessageSquareQuote,
  MessageCircleHeart,
  AtSign,
  Copyright,
} from "lucide-react"
import Lottie from "lottie-react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#4b2440] text-white overflow-hidden">
      {/* Decorative patterns */}
      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute w-100 h-100  bottom-0 top-0 left-0 z-10 motion-safe:animate-wiggle w-[70px] h-auto
                            sm:w-[8vw] sm:h-auto" />
      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute w-100 h-100  bottom-0 right-0 z-10 motion-safe:animate-wiggle w-[70px] h-auto
                            sm:w-[11vw] sm:h-auto rotate-[3.142rad]" />
      {/* <div className="absolute top-0 left-0 w-60 h-60 bg-[url('/halfflower.png')] bg-contain bg-no-repeat " />
      <div className="absolute bottom-0 right-0 z-0 w-100 h-100 bg-[url('/halfflower.png')] bg-no-repeat rotate-[3.142rad]" /> */}

      <div className="relative w-full max-w-[1480px] mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-[60%_20%_20%] gap-8 md:gap-12">

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
            className="col-span-2 md:col-span-1"
          >
            {/* LEFT: LOGO + TEXT */}
            <div className="flex items-center gap-4 sm:gap-16">
              <Image
                src="/footer_logo.svg"
                alt="Shri Prannath Ji Vani"
                width={125}
                height={156}
              />
              <div className="mt-6 text-orange-300 text-sm">
                {/* ICON */}
                <Lottie
                  animationData={Testimonials}
                  loop={true}
                  className="w-full sm:w-10 h-10 mb-2"
                />
                <p className="sm:text-3xl text-xl leading-relaxed text-orange-300 font-medium opacity-80 ">
                  सुंदरसाथ द्वारा, <br />
                  सुंदरसाथ के लिए, सुंदरसाथ को समर्पित
                </p>
              </div>
            </div>


            <p className="mt-8 text-base text-white/80 leading-relaxed">
              तारतम वाणी सिर्फ पढ़ने की चीज़ नहीं है—यह खुद को समझने और जीवन को बेहतर तरीके से जीने की राह दिखाती है। श्री प्राणनाथ जी की वाणी आत्मा, सृष्टि, परम सत्य और हमारे परम प्रियतम से जुड़े गहरे सवालों के जवाब सरलता से समझाती है। साथ ही, यह अलग-अलग धर्मों और पवित्र ग्रंथों के सत्य को एक साथ समझने की सुंदर दृष्टि देती है।
              <br /> हमारा प्रयास है कि यह ज्ञान सिर्फ किताबों तक सीमित न रहे, बल्कि YouTube, Zoom और डिजिटल माध्यमों के जरिए आज की पीढ़ी और दुनिया भर के लोगों तक सरल भाषा में पहुँचे।
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="md:border-l md:border-white/20 md:pl-10"
          >
            <h4 className="text-2xl mb-4">क्विक लिंकस</h4>
            <ul className="space-y-2 text-lg text-white/80">
              <li><Link href="/satguru" className="hover:text-orange-500">परमहंस</Link></li>
              <li><Link href="/gamesnquiz" className="hover:text-orange-500">क्विज़</Link></li>
              <li><Link href="/shrijigame" className="hover:text-orange-500">श्री जी गेम</Link></li>
              <li><Link href="/balkendra" className="hover:text-orange-500">आत्मदर्शनम्</Link></li>
              <li><Link href="/mandirseva" className="hover:text-orange-500">मंदिर</Link></li>
              <li><Link href="/gyanbhandar" className="hover:text-orange-500">ज्ञान भंडार</Link></li>
              {/* <li><Link href="/karyakram" className="hover:text-orange-500">कार्यक्रम</Link></li> */}
            </ul>
          </motion.div>
          {/* MIDDLE: QUICK LINKS */}

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}
          >
            {/* RIGHT: OTHER LINKS */}
            <h4 className="text-2xl mb-4">अन्य लिंकस </h4>
            <ul className="space-y-2 text-lg text-white/80">
              <li><Link href="/privacypolicy" className="hover:text-orange-500">प्राइवेसी पॉलिसी</Link></li>
              <li><Link href="/faq" className="hover:text-orange-500">अक्सर पूछे जाने वाले सवाल</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500">संपर्क करें</Link></li>
              <li><Link href="/login" className="hover:text-orange-500">लॉगिन</Link></li>
            </ul>
          </motion.div>

        </div>

        {/* SOCIAL + EMAIL */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.4
          }}
          className="md:mt-12 mt-5 pt-6 border-t border-white/20 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[auto_auto_auto_auto_1fr] gap-2 md:gap-16">
            {/* Facebook */}
            <Link
              href="https://www.facebook.com/ShriPrannathJiVani/"
              target="_blank"
              className="group flex flex-row items-center gap-2 text-start transition transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white 
      group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                <Facebook size={16} />
              </div>
              <span className="text-base leading-snug text-white/80 group-hover:text-orange-400">
                फेसबुक<p className="text-xs flex mt-1 text-white/60">7700K + सब्सक्राइबर्स</p>
              </span>
            </Link>

            {/* YouTube */}
            <Link href="https://www.youtube.com/@ShriPrannathJiVani/videos" target="_blank" className="group flex flex-row items-center gap-2 text-start transition">
              <div className="flex h-8 w-8  items-center justify-center rounded-full bg-white/10
      group-hover:bg-rose-500 group-hover:scale-110 transition-all">
                <Youtube size={16} />
              </div>
              <span className="text-base text-white/80 group-hover:text-orange-400">
                यूट्यूब<p className="text-xs flex mt-1 text-white/60">45000k+ फॉलोअर्स</p>
              </span>
            </Link>

            {/* Instagram */}
            <Link href="https://www.instagram.com/shriPrannathJiVani/" target="_blank" className="group flex flex-row items-center gap-2 text-start transition">
              <div className="flex h-8 w-8  items-center justify-center rounded-full bg-white/10
      group-hover:bg-pink-600 group-hover:scale-110 transition-all">
                <Instagram size={16} />
              </div>
              <span className="text-base text-white/90 group-hover:text-orange-400">
                इंस्टाग्राम<p className="text-xs flex mt-1 text-white/60">1500+ फॉलोअर्स</p>
              </span>
            </Link>

            {/* WhatsApp */}
            <Link href="#" target="_blank" className="group flex flex-row items-center gap-2 text-start transition">
              <div className="flex h-8 w-8  items-center justify-center rounded-full bg-white/10
      group-hover:bg-green-600 group-hover:scale-110 transition-all">
                <MessageCircleHeart size={16} />
              </div>
              <span className="text-base text-white/80 group-hover:text-green-400">
                व्हाट्सएप चैनल<p className="flex mt-1 text-white/60 text-xs">24k+ फॉलोअर्स </p>
              </span>
            </Link>

            {/* Email */}
            <Link
              href="mailto:shriprannathjivani@gmail.com"
              className="group flex flex-row items-center gap-2 text-start transition col-span-2 md:col-span-1"
            >
              <div className="flex h-8 w-8  items-center justify-center rounded-full bg-white/10
      group-hover:bg-red-500 group-hover:scale-110 transition-all">
                <Mail size={16} />
              </div>
              <span className="text-base text-white/80 group-hover:text-orange-400 break-all">
                shriprannathjivani@gmail.com
                <p className="flex mt-1 text-xs text-white/60">मार्गदर्शन हेतु या किसी भी सुझाव</p>
              </span>
            </Link>
          </div>
          <Link href="#" className="text-sm text-white/60 text-center md:text-start">
            <Copyright size={14} className="flex inline-flex" /> {year} spjv. made with love. <p className="md:flex inline-flex mt-1 text-white/60">All rights reserved.</p>
          </Link>
        </motion.div>
      </div>
    </footer>
  )
}
