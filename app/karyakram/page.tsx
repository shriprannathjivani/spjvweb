"use client";
import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, MapPin, MessageSquareQuote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import React from "react";


var calendarList = [
  {
    id: "1",
    name: 'अप्रैल 2025 / April 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "2",
    name: 'मई 2025 / May 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "3",
    name: 'जून 2025 / June 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "4",
    name: 'जुलाई 2025 / July 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "5",
    name: 'अगस्त 2025 / Agust 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "6",
    name: 'सितम्बर 2025 / September 2025',
    link: "/Spjv calendar April.png"
  },
  {
    id: "7",
    name: 'दिसंबर 2025 / December 2025',
    link: "/Spjv calendar April.png"
  }
]

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-20 pt-32">

        {/* 🔶 कार्यक्रम */}
        <div className="">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">कार्यक्रम <span className="text-orange-500 ">व कहानियाँ </span></h2>
          <p className="mt-4 text-muted-foreground text-xl  mb-4">हमारे विभिन्न आध्यात्मिक निःशुल्क कार्यक्रमों से जुड़ें श्री बीतक साहेब, श्री सिंधी मंथन कक्षाएँ, ऑनलाइन सत्र, व्यक्तिगत मार्गदर्शन, बच्चों के लिए संस्कार शिक्षा, मीठी बतियाँ ( मीठी बतियाँ / देश विदेश से सुंदरसाथ जी के भाव )।</p>
          <div className="space-y-0">
            <ul className="space-y-3 text-xl text-gray-500">
              <li className="">
                <h3 className="text-xl text-orange-900 mt-4 mb-4"> इस साल 25,000+ से ज्यादा सुंदरसाथ इसमें हिस्सा ले चुके हैं।</h3>
                <div className="flex -space-x-2 overflow-hidden">
                  <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/ramratandasji.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/sarkarshree.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <img src="/rajan_swamiji 2.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 mt-8">
            {[
              {
                title: "चितवन \nश्री राजन स्वामी जी",
                img: "/livesession1.png",
                details: 'सोमवार – शुक्रवार /n 04:45 AM से 05:45 AM',
                link: ''
              },
              {
                title: "श्री बीतक साहेब चर्चा",
                img: "/livesession2.png",
                details: 'सोमवार – शुक्रवार /n 06:00 AM से 07:00 AM',
                link: ''
              },
              {
                title: "श्री सिद्ध मंथन",
                img: "/livesession3.png",
                details: 'सोमवार – शुक्रवार /n 07:00 AM से 07:30 AM',
                link: ''
              },
              {
                title: "बाल आत्मदर्शनम्",
                img: "/balad.png",
                details: 'सोमवार – शुक्रवार /n 04:45 AM से 05:45 AM',
                link: ''
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-4xl bg-white shadow-md"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg font-semibold whitespace-pre-line">
                    {item.title}
                  </p>
                  <Link className="text-white flex items-center justify-end gap-4 mt-4 w-full" href={item.link}>
                    लाइव सेशन देखें <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white-500 text-white-500 cursor-pointer hover:bg-orange-600 hover:text-white">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔶 आगामी कार्यक्रम एवं उत्सव  */}
        <div className="mx-auto mb-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-3">
              आगामी कार्यक्रम एवं उत्सव
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mb-12">
              हमारे आने वाले आध्यात्मिक कार्यक्रमों और विशेष उत्सवों में शामिल होकर
              दिव्य आनंद और भक्ति का अनुभव करें।
            </p>
          </div>

          <div className="mx-auto mb-16">


            {/* 🔶 Featured Event */}
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* 🔸 Left Content */}
              <div className="order-2 md:order-1">

                <p className="text-orange-500 font-semibold mb-3">
                  उत्सव विशेष
                </p>

                <h3 className="text-2xl md:text-4xl font-bold mb-6">
                  गौरा पूर्णिमा महोत्सव
                </h3>

                {/* Location */}
                <div className="flex items-start gap-3 text-gray-700 mb-4">
                  <span className="text-orange-500 text-xl"><MapPin size={20} /></span>
                  <div>
                    <p className="font-semibold">स्थान</p>
                    <p>हरे कृष्ण मूवमेंट, मुंबई</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3 text-gray-700 mb-4">
                  <span className="text-orange-500 text-xl"><Calendar size={20} /></span>
                  <div>
                    <p className="font-semibold">तिथि</p>
                    <p>मंगलवार, 3 मार्च 2026</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3 text-gray-700 mb-6">
                  <span className="text-orange-500 text-xl"><Clock size={20} /></span>
                  <div>
                    <p className="font-semibold">समय</p>
                    <p>शाम 5:00 बजे – 6:00 बजे तक</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                  भगवान श्री चैतन्य महाप्रभु के प्राकट्य दिवस के पावन अवसर पर
                  इस दिव्य उत्सव में सम्मिलित हों। नाम संकीर्तन, कीर्तन एवं
                  भक्ति उत्सव के माध्यम से आध्यात्मिक आनंद का अनुभव करें।
                </p>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                >
                  प्रवचन देखें
                </Button>

              </div>

              {/* 🔸 Right Image */}
              <div className="order-1 md:order-2">
                <div className="rounded-4xl overflow-hidden ">
                  <img
                    src="/gallery1.png"
                    alt="गौरा पूर्णिमा"
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>

            </div>
          </div>


          {/* 🔶 Event Item */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Date Box */}
            <div className="w-23 rounded-3xl border border-orange-200 overflow-hidden text-center">
              <div className="bg-gradient-to-r from-purple-200 to-orange-200 py-3 font-semibold">
                मार्च
              </div>
              <div className="py-2">
                <p className="text-3xl font-bold">27</p>
                <p className="text-gray-500">2026</p>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                राम नवमी महोत्सव
              </h3>

              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <span className="text-orange-500 text-lg"><MapPin size={20} /></span>
                <p className="text-muted-foreground text-base">हरे कृष्ण मूवमेंट, मुंबई</p>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-orange-500 text-lg"><Clock size={20} /></span>
                <p className="text-muted-foreground text-base">शाम 5:00 बजे – 8:00 बजे तक</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-8" />

          {/* 🔶 Event Item 2 */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Date Box */}
            <div className="w-23 rounded-3xl border border-orange-200 overflow-hidden text-center ">
              <div className="bg-gradient-to-r from-purple-200 to-orange-200 py-3 font-semibold">
                अप्रैल
              </div>
              <div className="py-2">
                <p className="text-3xl font-bold">2</p>
                <p className="text-gray-500">2026</p>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                हनुमान जयंती उत्सव
              </h3>

              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <span className="text-orange-500 text-lg"><MapPin size={20} /></span>
                <p className="text-muted-foreground text-base">हरे कृष्ण मूवमेंट, मुंबई</p>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-orange-500 text-lg"><Clock size={20} /></span>
                <p className="text-muted-foreground text-base">शाम 5:00 बजे – 8:00 बजे तक</p>
              </div>
            </div>
          </div>

        </div>

        {/* 🔶 परिवर्तन की प्रेरक कहानियाँ */}
        <div className="mx-auto mb-16">

          {/* 🔶 Heading */}
          <h2 className="text-3xl font-bold text-black mb-12">
            परिवर्तन की प्रेरक कहानियाँ
          </h2>

          {/* 🔶 Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* 🔸 Card */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                श्री बीतक साहेब कक्षाएँ
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                श्री बीतक साहेब का नियमित अध्ययन और नामजप ने मेरे जीवन को नई दिशा दी।
                पहले मैं छोटी-छोटी बातों से परेशान हो जाता था, लेकिन अब मन में शांति
                और स्थिरता का अनुभव होता है।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">रूपा नाइक</p>
                  <p className="text-sm text-gray-500">
                    सामाजिक कार्यकर्ता, मुंबई
                  </p>
                </div>
              </div>
            </div>

            {/* 🔸 Card 2 */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                जिज्ञासा कोर्स
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                जिज्ञासा कोर्स ने मुझे श्री बीतक साहेब को सरल और व्यवस्थित रूप में समझने में
                सहायता की। जीवन की चुनौतियों का सामना करने का आत्मविश्वास मिला।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">रेश्मा वानरे</p>
                  <p className="text-sm text-gray-500">
                    उद्यमी, ठाणे
                  </p>
                </div>
              </div>
            </div>

            {/* 🔸 Card 3 */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                ऑनलाइन सत्र
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                ऑनलाइन श्री बीतक साहेब सत्रों से मुझे घर बैठे आध्यात्मिक ज्ञान प्राप्त हुआ।
                अब मैं अधिक संतुलित और सकारात्मक महसूस करता हूँ।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">शलाका लवानी</p>
                  <p className="text-sm text-gray-500">
                    आर्किटेक्ट, पुणे
                  </p>
                </div>
              </div>
            </div>

            {/* 🔸 Card 4 */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                नियमित अध्ययन
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                नियमित कक्षाओं ने मेरे जीवन में अनुशासन और संतुलन लाया। पहले तनाव
                अधिक रहता था, अब मन में प्रसन्नता और शांति बनी रहती है।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">शिल्पा कामथ</p>
                  <p className="text-sm text-gray-500">
                    शिक्षाविद्, नवी मुंबई
                  </p>
                </div>
              </div>
            </div>

            {/* 🔸 Card 5 */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                आध्यात्मिक सत्र
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                इन सत्रों ने मुझे जीवन के वास्तविक उद्देश्य को समझने में मदद की।
                व्यस्त जीवन में भी अब मैं स्वयं के लिए समय निकाल पाता हूँ।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">मनीष अग्रवाल</p>
                  <p className="text-sm text-gray-500">
                    वरिष्ठ प्रबंधक, मुंबई
                  </p>
                </div>
              </div>
            </div>

            {/* 🔸 Card 6 */}
            <div className="bg-white rounded-3xl p-8  transition duration-300">

              <div className="text-orange-500 text-3xl mb-4">❝</div>

              <h4 className="font-semibold text-lg mb-3">
                आध्यात्मिक परिवर्तन
              </h4>

              <p className="text-gray-700 mb-4  line-clamp-4  text-muted-foreground">
                इन कार्यक्रमों ने मेरे जीवन को सकारात्मक दिशा दी। अब मैं अधिक
                संतुष्ट, शांत और कृतज्ञ महसूस करता हूँ।
              </p>

              <button className="text-orange-500 font-medium mb-6 hover:underline">
                और पढ़ें
              </button>

              <div className="flex items-center gap-4">
                <img
                  src="/rajan_swamiji 2.png"
                  className="w-12 h-12 rounded-full object-cover"
                  alt="सदस्य"
                />
                <div>
                  <p className="font-semibold">अनिल अग्रवाल</p>
                  <p className="text-sm text-gray-500">
                    उद्योगपति, पुणे
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="relative  pt-0">
          <div className="max-w-7xl mx-auto  text-start">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-black mb-8">
              मासिक कैलेंडर डाउनलोड
              <p className="mt-2 text-xl text-gray-500">बुद्ध जी शाका 347 - 348</p>
            </h2>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
              }}
              className=""
            >
              <CarouselContent>
                {calendarList.map((calendar, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/4 basis-[85%] relative"
                  >
                    <div className="card-circle">{index + 1}</div>
                    <div className="h-full rounded-3xl bg-white p-8 flex flex-col items-center text-center cardCustome !p-0">

                      <div className="relative">
                        {/* Image */}
                        <img
                          src={calendar.link}
                          alt={calendar.link}
                          className="rounded-l-2xl rounded-b-0 object-cover"
                        />
                        <h3 className="animate-bounce  absolute bottom-2 left-5  bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                          {calendar.name}
                        </h3>
                      </div>
                      <div className="gap-2 p-4 text-center flex">
                        <span>{calendar.name}</span>
                        {/* Text */}
                        {/* Button */}
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
          </div>
        </div>
      </section>
    </>
  )
}