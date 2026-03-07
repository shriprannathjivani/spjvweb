"use client";

import { useEffect, useState, useRef } from "react";
import Image from "@/components/BaseImage";
import { Briefcase, Calendar, Globe, Link, MapPin, MapPinHouse, Phone, PhoneCall, School } from "lucide-react";
import { temples } from "@/lib/temples";
import { Marquee } from "@/components/ui/marquee";
{/* <Marquee pauseOnHover className="[--duration:20s]"><>content</></Marquee> */ }
import { jobs } from "@/lib/jobs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Page() {
  const [selectedTemple, setSelectedTemple] = useState(temples[0]);
  const [displayJobs, setDisplayJobs] = useState(jobs);
  const CENTER_INDEX = Math.floor(displayJobs.length / 2);
  // Always keep center index fixed
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayJobs((prev) => {
        const updated = [...prev];
        updated.push(updated.shift()!);
        return updated;
      });
    }, 9000);

    return () => clearInterval(interval);
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

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 pt-32">
      {/* 🔶 Heading */}
      <h2 className="text-4xl flex flex-row font-semibold tracking-tight text-gray-900 sm:text-5xl">
        <TextAnimate animation="blurInUp" startOnView delay={0.3}>
          ज्ञान केंद्र / मंदिर &nbsp;
        </TextAnimate>{"  "}
        <span className="text-orange-500">
          <TextAnimate animation="blurInUp" startOnView delay={0.5}>
            व सेवा
          </TextAnimate>
        </span>
      </h2>
      <TextAnimate animation="blurInUp" by="line"
        delay={0.3}
        segmentClassName="block" startOnView className="mt-4 text-muted-foreground text-xl  mb-12">
        {`हमारे देश और विदेश भर में फैले ज्ञान केंद्र व मंदिर`}
      </TextAnimate>

      {/* 🔥 Main Layout */}
      <div className="grid lg:grid-cols-[55%_45%] gap-8">
        {/* ================= LEFT : CARD GRID ================= */}
        <div className="grid sm:grid-cols-2 gap-6">
          {temples.map((temple, index) => (
            <div
              key={temple.id}
              onClick={() => setSelectedTemple(temple)}
              className="cursor-pointer"
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
                {/* Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={temple.image}
                    alt={temple.name}
                    fill
                    className={`
                  ${selectedTemple.id === temple.id ? "border-orange-500" : "border-white"} object-container mb-8  border-4  rounded-[38px]`}
                  />

                  {/* Badge */}
                  {index === 0 && (
                    <span className="absolute top-4 right-4 bg-lime-300 text-black text-xs px-3 py-1 rounded-full">
                      नया
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl flex gap-4 items-center mb-2">
                    <School size={16} className="text-red-600" />{temple.name}
                  </h3>
                  <div className="text-base flex gap-4 items-start text-gray-500 whitespace-pre-line">
                    <MapPinHouse size={16} className="text-gray-600" />
                    {temple.address}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT : MAP ================= */}
        <motion.div
          key={selectedTemple.id}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.3
          }}
          className="sticky top-32 h-[500px] lg:h-[85vh] rounded-3xl overflow-hidden border-4 border-white bg-white"
        >
          <iframe
            key={selectedTemple.id}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="rounded-3xl"
            src={`https://maps.google.com/maps?q=${selectedTemple.lat},${selectedTemple.lng}&z=13&output=embed`}
          />
        </motion.div>
      </div>


      {/* sewakendra post */}
      <div className="mt-24">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-3">
          <TextAnimate animation="blurInUp" startOnView delay={0.3}>
            स्वयंसेवकों को धन्यवाद और&nbsp;
          </TextAnimate>{"  "}
          <span className="text-orange-500">
            <TextAnimate animation="blurInUp" startOnView delay={0.5}>
              सेवा कारखाना सूची
            </TextAnimate>
          </span>
        </h2>
        <TextAnimate animation="blurInUp" by="line"
          delay={0.3}
          segmentClassName="block" startOnView className="text-muted-foreground text-xl max-w-3xl mb-12">
          {` हम उन समर्पित सेवादारों के प्रति हृदय से कृतज्ञ हैं, जो अपने समय, श्रम और प्रेम से इस दिव्य कार्य को आगे बढ़ा रहे हैं। उनकी निस्वार्थ सेवा ही हमारी शक्ति है। \nये वे प्रेरणास्रोत सेवादार हैं, जो प्रतिदिन अपने कर्म से प्रकाश फैला रहे हैं। 🙏`}
        </TextAnimate>

        <div className="sewadar">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              <div className="rounded-2xl border px-5 py-4 min-w-[180px] backdrop-blur-sm bg-gradient-to-br from-amber-50/60 to-yellow-50/80 border-amber-200/25">
                <div className="shrink-0">
                  <Image height={48} width={48} className="w-12 h-12 rounded-full bg-orange-200" src="/psbimg1.png" alt="" />
                </div>
                <h4 className="font-medium text-gray-800 font-sans text-base mb-1 leading-normal">रूपा नाइक</h4>
                <p className="text-sm text-gray-600">वीडियो एडिटर </p>
              </div>
              <div className="rounded-2xl border px-5 py-4 min-w-[180px] backdrop-blur-sm bg-gradient-to-br from-emerald-50/60 to-green-50/80 border-emerald-200/25">
                <div className="shrink-0">
                  <Image height={48} width={48} className="w-12 h-12 rounded-full bg-orange-200" src="/psimg12.png" alt="" />
                </div>
                <h4 className="font-medium text-gray-800 font-sans text-base mb-1 leading-normal">रेश्मा वानरे </h4>
                <p className="text-sm text-gray-600">वीडियो एडिटर </p>
              </div>
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              <div className="rounded-2xl border px-5 py-4 min-w-[180px] backdrop-blur-sm bg-gradient-to-br from-emerald-50/60 to-green-50/80 border-emerald-200/25">
                <div className="shrink-0">
                  <Image height={48} width={48} className="w-12 h-12 rounded-full bg-orange-200" src="/psimg8.png" alt="" />
                </div>
                <h4 className="font-medium text-gray-800 font-sans text-base mb-1 leading-normal"> मनीष अग्रवाल</h4>
                <p className="text-sm text-gray-600">वीडियो एडिटर </p>
              </div>
              <div className="rounded-2xl border px-5 py-4 min-w-[180px] backdrop-blur-sm bg-gradient-to-br from-amber-50/60 to-yellow-50/80 border-amber-200/25">
                <div className="shrink-0">
                  <Image height={48} width={48} className="w-12 h-12 rounded-full bg-orange-200" src="/psimg10.png" alt="" />
                </div>
                <h4 className="font-medium text-gray-800 font-sans text-base mb-1 leading-normal">शिल्पा कामथ </h4>
                <p className="text-sm text-gray-600">वीडियो एडिटर </p>
              </div>
            </Marquee>
            <div className="from-[#fceee8] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-[#fdf8f9] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </div>

        {/* ================= JOB SECTION ================= */}
        <div className="min-h-screen flex items-center justify-between pt-20">
          <div className="w-full grid lg:grid-cols-2 gap-12">

            {/* ================= LEFT ROTATING LIST ================= */}
            <div className="relative h-[420px] overflow-hidden flex items-center">
              <motion.ul
                key={displayJobs.map((j) => j.id).join("-")}
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
                      key={job.id}
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
                            <Image height={64} width={64} className="w-16 h-16 rounded-full bg-orange-200" src="/jobicon3.png" alt="" />
                          </div>
                          <div className="flex-1 min-w-0 ms-0">
                            <h3 className="text-xl flex gap-4 items-center mb-2">
                              {job.service}
                            </h3>
                            <p className="text-base flex items-center text-gray-500 flex gap-2  whitespace-pre-line">
                              <Briefcase size={14} className="mr-1 text-orange-600" />{job.type}
                            </p>
                          </div>
                          <div className="inline-flex items-center  text-gray-500 font-medium text-heading">
                            <Calendar size={14} className="mr-1 text-orange-600" /> {job.date}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Fade Top */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fdf3f1] to-transparent" />

              {/* Fade Bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fdf8f9] to-transparent" />
            </div>

            {/* ================= RIGHT DETAIL CARD ================= */}
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayJobs[Math.floor(displayJobs.length / 2)].id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl"
                >
                  {(() => {
                    const activeJob =
                      displayJobs[Math.floor(displayJobs.length / 2)];

                    return (
                      <>
                        <Image
                          src={activeJob.imgLink}
                          alt={activeJob.imgLink}
                          height={100}
                          width={100}
                          className={`object-container border-white w-full border-4 rounded-[38px]`}
                        />
                        <div className="p-8">
                          <div className="relative mb-4 rounded-full inline-flex items-center bg-gray-50 px-2 py-1 text-xs font-medium text-purple-600 inset-ring inset-ring-purple-500/10">
                            {activeJob.role}
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {activeJob.service}
                          </h2>
                          <div className="flex items-center text-gray-500 mb-6 space-x-4 text-sm">
                            <div className="flex items-center text-base text-gray-500">
                              <Globe size={14} className="mr-1 text-orange-600" />
                              {activeJob.location}
                            </div>
                            <div className="flex items-center text-base text-gray-500">
                              <Briefcase size={14} className="mr-1 text-orange-600" />
                              {activeJob.type}
                            </div>
                            <div className="flex items-center text-base text-gray-500">
                              <Calendar size={14} className="mr-1 text-orange-600" />
                              {activeJob.date}
                            </div>
                          </div>
                          <p className="text-base flex gap-4 items-start text-gray-500 whitespace-pre-line mb-8">
                            {activeJob.description}
                          </p>

                          <div className="flex items-center text-gray-500 mb-6 space-x-4 text-sm">
                            <div className="flex items-center text-base text-gray-500">
                              <PhoneCall size={14} className="mr-1 text-orange-600" />
                              {activeJob.contactPerson}
                            </div>
                            <div className="flex items-center text-base text-gray-500">
                              <PhoneCall size={14} className="mr-1 text-orange-600" />
                              {activeJob.contactNo}
                            </div>
                          </div>
                          <a href={`tel:${activeJob.link}`}>
                            <Button
                              variant="outline"
                              className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                            >
                              अभी कॉल करें
                            </Button>
                          </a>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
