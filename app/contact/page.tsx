"use client";

import Image from "next/image"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle, MessageCircleHeart, Phone, PhoneCall, WheatIcon, Youtube } from "lucide-react";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
const socialLinks = [
  {
    name: "फेसबुक",
    href: "#",
    className: "bg-blue-600 hover:bg-blue-600 hover:text-white",
    icon: Facebook,
  },
  {
    name: "व्हाट्सएप चैनल",
    href: "#",
    className: "bg-green-600 hover:bg-green-600 hover:text-white",
    icon: MessageCircle,
  },
  {
    name: "इंस्टाग्राम",
    href: "#",
    className: " bg-pink-600 hover:bg-pink-600 hover:text-white",
    icon: Instagram,
  },
  {
    name: "यूट्यूब",
    href: "#",
    className: " bg-red-600 hover:bg-red-600 hover:text-white",
    icon: Youtube,
  },
];

export default function Page() {

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-24 pt-25">
        <DynamicBreadcrumb/>
        <div className="text-start">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">हमसे <span className="text-orange-500">संपर्क करें</span></h2>
          <p className="mt-2 text-muted-foreground text-xl  mb-12">श्री प्राणनाथ जी की वाणी को समझने में मार्गदर्शन हेतु या किसी भी सुझाव के लिए कृपया हमसे संपर्क करें।</p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT — CONTACT FORM */}
          <div className="rounded-3xl bg-white p-8 ">

            <form className="space-y-4">
              <label className="mb-2 flex">नाम*</label>
              <Input
                type="text"
                placeholder="पूरा नाम*"
                className="w-full rounded-xl border px-4 py-6  focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label className="mb-2 flex">ईमेल</label>
              <Input
                type="email"
                placeholder="ईमेल"
                className="w-full rounded-xl border px-4 py-6  focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label className="mb-2 flex">मोबाइल नंबर</label>
              <Input
                type="tel"
                placeholder="नंबर"
                className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label className="mb-2 flex">संदेश</label>
              <Textarea
                placeholder="अपना संदेश लिखें"
                rows={4}
                className="w-full rounded-xl border px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <Button
                variant="outline"
                type="submit"
                className="rounded-full mt-4 border-2 border-black px-12 py-5 text-sm font-xl text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                संदेश भेजें
              </Button>
            </form>
          </div>

          {/* RIGHT — INFO PANEL */}
          <div className="space-y-12">

            {/* BUSINESS HOURS */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">🕒</span>
                <h3 className="text-2xl font-semibold">कार्य समय</h3>
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

            {/* FAQ */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">❓</span>
                <h3 className="text-2xl font-semibold">अक्सर पूछे जाने वाले प्रश्न</h3>
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

            {/* FOLLOW US */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">📢</span>
                <h3 className="text-2xl font-semibold">हमसे जुड़ें</h3>
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
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 pt-0 py-24 ">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-3">
          हमसे जुड़ने के अन्य संपर्क विकल्प
        </h2>
        <p className="text-muted-foreground text-xl max-w-3xl mb-12">

        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


          {/* Call us */}
          <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <Phone className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call us</h3>
            <p className="text-lg font-medium text-gray-800 mb-2">
              +91 0000 0000 00
            </p>
            <p className="text-sm text-gray-500">Available 10 AM – 7 PM</p>
          </div>

          {/* Write to us */}
          <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
              <Mail className="text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Write to us</h3>
            <p className="text-lg font-medium text-orange-600 mb-2">
              shriprannathjivani@gmail.com
            </p>
            <p className="text-sm text-gray-500">We reply within 24 hours</p>
          </div>

          {/* WhatsApp */}
          <div className="rounded-3xl bg-white p-8 transition hover:-translate-y-1">
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
          </div>
        </div>
      </div>
    </>
  )
}