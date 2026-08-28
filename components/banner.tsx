"use client"

import { useEffect, useState } from "react"
import { X, Youtube } from "lucide-react"
import Image from "@/components/BaseImage";
import { XIcon } from "@animateicons/react/lucide";

export default function BottomBanner() {
  const [open, setOpen] = useState(false)

 useEffect(() => {
    const openTimer = setTimeout(() => { setOpen(true); }, 700);
    const closeTimer = setTimeout(() => { setOpen(false); }, 5700);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const schedule = [
    { title: "चितवन", time: "04:30 AM – 06:00 AM" },
    { title: "श्री बीतक मंथन", time: "06:00 AM – 07:00 AM" },
    { title: "श्री तारतम वाणी चर्चा", time: "07:00 AM – 07:30 AM" },
  ];

  return (

    <>
      <style jsx global>{`
       @keyframes orangeAiGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-orange-ai {
          background-size: 200% 200%;
          animation: orangeAiGlow 3s ease infinite;
        }
      `}</style>
      <div className={`fixed inset-x-0 bottom-16 sm:bottom-0 z-50 transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        {/* Increased top padding (pt-32) to comfortably fit a 240px image poking out on top */}
        <div className="mx-auto max-w-370 px-4 lg:px-8 pb-3 pt-32 sm:pt-28">
          <div className="relative  border  bg-white/65 backdrop-blur-xl text-white p-3 rounded-2xl shadow-4xl  shadow-2xl px-4 py-2.5">

            {/* Large GIF image (240px width/height) popping way out on top */}
            <div className="absolute -top-21 sm:-top-35 -left-2 sm:left-2 z-20 pointer-events-none">
              <Image
                src="/livespjv.gif"
                alt="livespjv"
                width={240}
                height={240}
                className="drop-shadow-2xl w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-contain"
              />
            </div>



            {/* Single Row Layout for Desktop with left margin adjusted for the 240px image */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 ml-[160px] sm:ml-[220px]">

              {/* Title & Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center lg:text-left shrink-0">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-black whitespace-nowrap">आज का लाइव सत्संग</h3>
                    <p className="text-[12px] text-black/70">श्री प्राणनाथ जी वाणी (सोमवार – शुक्रवार)</p>
                  </div>
                </div>


              </div>

              {/* Schedule Items in the Same Row */}
              <div className="hidden lg:flex items-center gap-2 overflow-x-auto py-0.5">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-md shrink-0">
                    <span className="font-medium text-[13px] text-orange-600">{item.title}</span>
                    <span className="text-[12px] text-black/80 font-semibold bg-gray-200 px-1.5 py-0.5 rounded shadow-2xs">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="inline-flex gap-2 items-center">
                <div className="p-0.5 rounded-full animate-orange-ai bg-linear-to-r from-[#10010c] via-white/55 to-[#13030e] shadow-md shrink-0">
                  <a
                    href="https://www.youtube.com/@ShriPrannathJiVani/streams"
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-full gap-2 border-0 border-black px-5 py-3  text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                  >
                    
                    <Youtube size={13} /> लाइव सेशन
                  </a>
                </div>
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full flex items-center justify-center border-2 w-10 text-center bg-red-600 h-10 border-black/30 p-2 hover:bg-orange-700 cursor-pointer"
                >
                  <XIcon size={15} />
                </button>
              </div>
            </div>

            {/* Mobile Schedule Grid (Adjusted margin so it sits neatly under the large image on smaller phones) */}
            <div className="lg:hidden mt-2 pt-2 border-t border-black/10 grid grid-cols-3 sm:grid-cols-2 gap-1.5 ml-0 sm:ml-[220px]">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-between bg-black/5 px-2 py-1 rounded">
                  <span className="font-medium text-[11px] text-orange-600">{item.title}</span>
                  <span className="text-[10px] text-black/80 font-semibold bg-white/70 px-1 py-0.5 rounded">{item.time}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </>
  )
}