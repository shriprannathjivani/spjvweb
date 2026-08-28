"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { ChevronsUpIcon, ChevronsUpIconHandle } from "@animateicons/react/lucide";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)
  const ref = useRef<ChevronsUpIconHandle>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => ref.current?.startAnimation()}
          onMouseLeave={() => ref.current?.stopAnimation()}
          className="fixed md:bottom-6 bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center border-2 border-black rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 cursor-pointer"
        >
          <ChevronsUpIcon size={20} ref={ref} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}