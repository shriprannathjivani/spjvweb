"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function BottomBanner() {
  const [open, setOpen] = useState(false)

 useEffect(() => {
  // open after 700ms
  const openTimer = setTimeout(() => {
    setOpen(true);
  }, 700);

  // close after 5 seconds
  const closeTimer = setTimeout(() => {
    setOpen(false);
  }, 5700); // 700 + 5000

  return () => {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
  };
}, []);


  return (
    <div className={`fixed inset-x-0 sm:bottom-0 bottom-15 z-50 transition-all duration-700  ${open ? "translate-y-0 opacity-100" : "translate-y-100 opacity-0 "
      }`}>
      <div className="mx-auto max-w-7xl px-6 pb-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

          {/* Saffron glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-400/50 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-2 text-black">



            {/* Text */}
            <div className="flex flex-row w-full justify-between relative items-center">
              <div className="content sm:w-auto w-40 ">
                <h3 className="text-lg md:text-xl font-semibold">
                  आज का लाइव सत्संग
                </h3>
                <p className="text-sm text-black/90">
                  श्री प्राणनाथ जी वाणी का सीधा प्रसारण
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@ShriPrannathJiVani/streams" target="_blank"
                  className="rounded-full block border-2 border-black px-5 py-2  text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                >
                  लाइव सेशन
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border-2 sm:h-auto h-10 border-black/30 p-2 hover:bg-white/10 cursor-pointer"
                >
                  <X size={18} onClick={() => setOpen(false)} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
