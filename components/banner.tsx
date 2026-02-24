"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function BottomBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 700)
    return () => clearTimeout(t)
  }, [])


  return (
    <div  className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-700  ${
        open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
      <div className="mx-auto max-w-7xl px-6 pb-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

          {/* Saffron glow */}
          <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-400/50 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-2 text-black">

            {/* Text */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                आज का लाइव सत्संग
              </h3>
              <p className="text-sm text-black/90">
                श्री प्राणनाथ जी वाणी का सीधा प्रसारण
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919999999999"
                className="rounded-full bg-green-500 px-5 py-2 text-sm border-2 font-semibold text-white hover:bg-green-600 cursor-pointer border-black/30"
              >
                WhatsApp जुड़ें
              </a>

              <a
                href="/live"
                className="rounded-full border-2 border-black px-5 py-2  text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
              >
                लाइव सेशन
              </a>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full border-2 border-black/30 p-2 hover:bg-white/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
