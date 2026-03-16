"use client";

import Image from "next/image"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle, MessageCircleHeart, Phone, PhoneCall, WheatIcon, Youtube } from "lucide-react";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"
import Lottie from "lottie-react"
import successAnimation from "@/public/Email icon animation.json"
import doneAnimation from "@/public/Success Icon.json"
import { toast } from "sonner"

const socialLinks = [
  {
    name: "फेसबुक",
    href: "https://www.facebook.com/ShriPrannathJiVani/",
    className: "bg-blue-600 hover:bg-blue-600 hover:text-white",
    icon: Facebook,
  },
  {
    name: "इंस्टाग्राम",
    href: "https://www.instagram.com/shriPrannathJiVani/",
    className: " bg-pink-600 hover:bg-pink-600 hover:text-white",
    icon: Instagram,
  },
  {
    name: "यूट्यूब",
    href: "https://www.youtube.com/@ShriPrannathJiVani/videos",
    className: " bg-red-600 hover:bg-red-600 hover:text-white",
    icon: Youtube,
  },
];

export default function Page() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      tel: formData.get("tel"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    setLoading(false);

    if (result.success) {
      setIsSuccess(true);

      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } else {
      toast.error("संदेश भेजने में समस्या हुई.", { position: "top-right" });
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-24 pt-32">
        <div className="text-start">
          <h2 className="text-4xl flex-row flex font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            <TextAnimate animation="blurInUp" startOnView delay={0.3}>
              हमसे&nbsp;
            </TextAnimate>{"  "}
            <span className="text-orange-500">
              <TextAnimate animation="blurInUp" startOnView delay={0.5}>
                संपर्क करें
              </TextAnimate>
            </span>
          </h2>
          <TextAnimate animation="blurInUp" by="line"
            delay={0.3}
            segmentClassName="block" startOnView className="mt-2 text-muted-foreground text-xl  mb-12">
            {`श्री प्राणनाथ जी की वाणी को समझने में मार्गदर्शन हेतु या किसी भी सुझाव के लिए कृपया हमसे संपर्क करें।`}
          </TextAnimate>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT — CONTACT FORM */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
          >
            <div className="rounded-3xl bg-white p-8 ">

              {isSuccess ? (

                <div className="flex flex-col items-center justify-center py-16 text-center">

                  <div className="w-40">
                    <Lottie
                      animationData={successAnimation}
                      loop={false}
                    />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    संदेश सफलतापूर्वक भेजा गया
                  </h3>

                  <p className="text-gray-600">
                    हम शीघ्र ही आपसे संपर्क करेंगे 🙏
                  </p>

                </div>

              ) : (

                <form onSubmit={handleSubmit} className="space-y-4">

                  <label className="mb-2 flex">नाम*</label>
                  <Input
                    type="text"
                    name="name"
                    required
                    placeholder="पूरा नाम*"
                    className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <label className="mb-2 flex">ईमेल</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="ईमेल"
                    className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <input type="text" name="company" className="hidden" />

                  <label className="mb-2 flex">मोबाइल नंबर</label>
                  <Input
                    type="tel"
                    name="tel"
                    placeholder="नंबर"
                    className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <label className="mb-2 flex">संदेश</label>
                  <Textarea
                    name="message"
                    rows={4}
                    placeholder="अपना संदेश लिखें"
                    className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <Button
                    variant="outline"
                    type="submit"
                    disabled={loading}
                    className="rounded-full mt-4 border-2 border-black px-12 py-5 text-sm font-xl text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                  >
                    {loading ? "भेजा जा रहा है..." : "संदेश भेजें"}
                  </Button>

                </form>
              )}
            </div>
          </motion.div>


          {/* RIGHT — INFO PANEL */}
          <div className="space-y-12">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
            >
              {/* BUSINESS HOURS */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <TextAnimate animation="blurInUp" by="line"
                    delay={0.3}
                    segmentClassName="block" startOnView className="text-2xl font-semibold">
                    {`🕒 चर्चा व मंथन समय`}
                  </TextAnimate>
                </div>

                <ul className="space-y-2 text-lg">
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">चितवन </span>
                    <span className="w-1/4">सोमवार – शुक्रवार</span>
                    <span className="w-1/3">04:45 AM से 05:45 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">श्री बीतक साहेब चर्चा</span>
                    <span className="w-1/4">सोमवार – शुक्रवार</span>
                    <span className="w-1/3">06:00 AM से 07:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">श्री सिंधी मंथन</span>
                    <span className="w-1/4">सोमवार – शुक्रवार</span>
                    <span className="w-1/3">07:00 AM से 07:30 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">मीठी बतियाँ </span>
                    <span className="w-1/4">सोमवार – शुक्रवार</span>
                    <span className="w-1/3">07:30 AM से 08:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">चितवन </span>
                    <span className="w-1/4">शनिवार </span>
                    <span className="w-1/3">06:00 AM से 07:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-900 w-1/3">श्री प्राणनाथ ज्ञानपीठ ई-गोष्ठी</span>
                    <span className="w-1/4">रविवार</span>
                    <span className="w-1/3">09:45 AM से 11:00 AM</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4
              }}
            >
              {/* FAQ */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <TextAnimate animation="blurInUp" by="line"
                    delay={0.3}
                    segmentClassName="block" startOnView className="text-2xl font-semibold">
                    {`❓ अक्सर पूछे जाने वाले प्रश्न`}
                  </TextAnimate>
                </div>

                <p className="mb-4 text-gray-600">
                  यहाँ आपको सामान्य प्रश्नों के उत्तर मिलेंगे जो हमें अक्सर प्राप्त होते हैं।
                </p>

                <a
                  href="/faq"
                  className="inline-flex items-center gap-2 border-b-2 border-orange-600 pb-1 text-orange-600 hover:opacity-80"
                >
                  सभी प्रश्न देखें →
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              {/* FOLLOW US */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <TextAnimate animation="blurInUp" by="line"
                    delay={0.3}
                    segmentClassName="block" startOnView className="text-2xl font-semibold">
                    {`📢 हमसे जुड़ें`}
                  </TextAnimate>
                </div>

                <p className="mb-4 text-gray-600">
                  आध्यात्मिक अपडेट, सत्संग और विशेष जानकारी के लिए जुड़े रहें
                </p>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        href={item.href}
                        key={item.name}
                        className={`flex items-center gap-2 bg-white rounded-full px-5 py-2 text-sm  ${item.className}`}
                      >
                        <Icon size={16} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 pt-0 py-24 ">
        {/* Heading */}
        <TextAnimate animation="blurInUp" by="line"
          delay={0.3}
          segmentClassName="block" startOnView className="text-3xl font-bold text-black mb-8 flex">
          {`हमसे जुड़ने के अन्य संपर्क विकल्प`}
        </TextAnimate>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


          {/* Call us */}
          {/* <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <Phone className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call us</h3>
            <p className="text-lg font-medium text-gray-800 mb-2">
              +91 0000 0000 00
            </p>
            <p className="text-sm text-gray-500">Available 10 AM – 7 PM</p>
          </div> */}

          {/* Write to us */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6
            }}
          >
            <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                <Mail className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">हमसे लिखकर संपर्क करें</h3>
              <p className="text-lg font-medium text-orange-600 mb-2">
                shriprannathjivani@gmail.com
              </p>
              <p className="text-sm text-gray-500">हम आपको 24 घंटों के भीतर उत्तर देंगे। ✨</p>
            </div>
          </motion.div>


          {/* WhatsApp */}
          {/* <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <MessageCircleHeart className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-lg font-medium text-gray-800 mb-2">
              Start new chat
            </p>
            <p className="text-sm text-gray-500">
              Instant messaging support
            </p>
          </div> */}
        </div>
      </div>
    </>
  )
}