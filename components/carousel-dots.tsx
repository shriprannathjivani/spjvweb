"use client"

import * as React from "react"
import type { CarouselApi } from "@/components/ui/carousel"

type CarouselDotsProps = {
  api: CarouselApi | undefined
}

export function CarouselDots({ api }: CarouselDotsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap())

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="flex gap-2">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={`h-2 w-2 rounded-full transition-all ${
            index === selectedIndex
              ? "bg-orange-500 w-4"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  )
}
