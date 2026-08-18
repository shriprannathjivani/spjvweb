"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "@/components/BaseImage";
import { Plus, ArrowUpRight, Calendar, Calendars, CalendarPlus } from "lucide-react";
import { Button } from "./ui/button";
import { TextAnimate } from "./ui/text-animate";

const events = [
  {
    id: 1,
    dateLabel: "सोमवार – शुक्रवार",
    date: "2026-07-30",
    time: "04:30 AM",
    endTime: "06:00",
    title: "चितवन",
    description:
      "श्री प्राणनाथ जी वाणी के साथ दिव्य चितवन और आत्मचिंतन से जुड़ें।",
    image: "/livesession1.png",
    color: "bg-pink-50",
    featured: true,
  },
  {
    id: 2,
    dateLabel: "सोमवार – शुक्रवार",
    date: "2026-08-03",
    time: "06:00 AM",
    endTime: "07:00",
    title: "श्री बीतक मंथन",
    description:
      "ब्रह्मज्ञान की अमूल्य धारा से जुड़ें।",
    image: "/livesession2.png",
    color: "bg-blue-50",
  },
  {
    id: 3,
    dateLabel: "सोमवार – शुक्रवार",
    date: "2026-08-03",
    time: "07:00 AM",
    endTime: "07:30",
    title: "श्री तारतम वाणी चर्चा",
    description:
      "आत्मचिंतन और आध्यात्मिक ज्ञान के साथ जुड़ें।",
    image: "/livesession3.png",
    color: "bg-green-50",
  },
  {
    id: 4,
    dateLabel: "रविवार",
    date: "2026-08-02",
    time: "03:00 PM",
    endTime: "04:00",
    title: "बाल आत्मदर्शनम्",
    description:
      "बच्चों के लिए ज्ञान और संस्कार से जुड़ा विशेष कार्यक्रम।",
    image: "/balad.png",
    color: "bg-red-50",
  },
];

function formatICSDate(date: string, time: string) {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  return `${year}${month}${day}T${hours}${minutes}00`;
}

function downloadICS(event: any) {
  const start = formatICSDate(
    event.date,
    event.time
      .replace(" AM", "")
      .replace(" PM", "")
  );

  const end = formatICSDate(
    event.date,
    event.endTime
  );

  const uid = `${event.id}-${Date.now()}@shriprannathjivani.com`;

  const icsContent = `BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Shri Prannath Ji Vani//Events//EN
        CALSCALE:GREGORIAN
        METHOD:PUBLISH
        BEGIN:VEVENT
        UID:${uid}
        DTSTAMP:${formatICSDate(
    new Date().toISOString().split("T")[0],
    new Date().toTimeString().slice(0, 5)
  )}
        DTSTART:${start}
        DTEND:${end}
        SUMMARY:${event.title}
        DESCRIPTION:${event.description}
        LOCATION:Online
        STATUS:CONFIRMED
        END:VEVENT
        END:VCALENDAR`;

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${event.title.replace(/\s+/g, "-")}.ics`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export default function Events() {
  return (
    <section className="relative overflow-hidden py-10 ">
      {/* Decorative gradient bg-[radial-gradient(circle_at_top_left,rgba(255,128,0,0.35),transparent_70%)] */}
      <div className="absolute left-0 top-0 h-48 w-48 " />
      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute top-1 left-0 z-0 motion-safe:animate-wiggle w-17.5 h-auto sm:w-37.5 sm:h-auto" />
      <div className="relative max-w-370 mx-auto px-8">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
          <div className="max-w-370">
            <TextAnimate
              animation="blurInUp"
              startOnView
              by="line"
              delay={0.3}
              segmentClassName="block"
              className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4"
            >
              {`श्री प्राणनाथ जी वाणी \nके साथ लाइव सेशन`}
            </TextAnimate>
          </div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3
            }}>
            <a target="_blank" href="https://www.youtube.com/@ShriPrannathJiVani/streams">
              <Button
                variant="outline"
                className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
              >
                सभी लाइव सेशन देखें
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {events.map((event, index) => (

            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-[0_10px_35px_rgba(0,0,0,0.06)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]

                ${event.featured
                  ? "sm:col-span-2 sm:row-span-2"
                  : ""
                }
              `}
            >


              {/* Background Image */}
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />



              {/* Gradient */}
              <div
                className="
                 absolute inset-0 bg-linear-to-t from-[#4b2440]/90 via-[#4b2440]/30 to-transparent
                "
              />

              {/* Calendar */}
              <Button
                onClick={() => downloadICS(event)}
                variant="outline"
                className=" absolute top-2 right-2 rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
              >
                <CalendarPlus size={17} />
                {/* 
                  <span>
                    कैलेंडर में जोड़ें
                  </span> */}
              </Button>



              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">

                <div className="mb-2 flex items-center gap-2">


                  <span className="text-sm font-medium text-white/80 ">
                    {event.dateLabel} - {event.time}
                  </span>

                </div>

                <h3
                  className={`
                    font-bold
                    leading-tight
                    text-white
                    ${event.featured
                      ? "text-2xl sm:text-3xl"
                      : "text-lg"
                    }
                  `}
                >
                  {event.title}
                </h3>





              </div>
            </motion.div>
          ))}

        </div>
      </div>

    </section>
  );
}