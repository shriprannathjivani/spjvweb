"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";


const STATS = [
  {
    title: "श्री प्राणनाथ जी वाणी मिशन",
    value: 2,
    suffix: "L+",
    subtitle: "सुंदरसाथ जी को लाभ हुआ",
  },
  {
    title: "प्रकाशित पुस्तकें",
    value: 3,
    suffix: "+",
    subtitle: "2 चैनल्स वेबप्लेटफार्म",
  },
  {
    title: "फॉलोअर्स",
    value: 21,
    suffix: "K+",
    subtitle: "यूट्यूब + सोशल मीडिया",
  },
  {
    title: "यूट्यूब",
    value: 21.2,
    suffix: "K+",
    subtitle: "कुल व्यूज",
  },
  {
    title: "देखने के घंटे",
    value: 11,
    suffix: "M+",
    subtitle: "सुंदरसाथ जी को लाभ हुआ",
  },
  {
    title: "लेख",
    value: 1,
    suffix: "K+",
    subtitle: "सुंदरसाथ जी को लाभ हुआ",
    large: true,
  },
  {
    title: "शामिल धर्मग्रंथ",
    value: 10,
    suffix: "+",
    subtitle: "सुंदरसाथ जी को लाभ हुआ",
    large: true,
  },
  {
    title: "एक्सक्लूसिव वीडियो",
    value: 2.5,
    suffix: "K+",
    subtitle: "सुंदरसाथ जी को लाभ हुआ",
  },
];

export default function Stats() {
  return (
    <section className="pt-0 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">
          हमारी यात्रा
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 sm:mb-12 leading-relaxed">
          आज, श्री प्राणनाथ जी के मिशन ने लाखों लोगों के जीवन को छुआ है।
          लोगों के साथ सीधे संपर्क और इंटरनेट पर अलग-अलग माध्यमों से,
          वह सभी को स्पष्टता देते रहते हैं।
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 gap-4 sm:gap-6">
          {STATS.map((item, index) => (
            <Card
              key={index}
              className={`relative rounded-2xl border-none bg-white shadow-sm
                ${item.large ? "lg:col-span-2" : ""}
              `}
            >
              <CardContent className="flex flex-col justify-between h-full">
                {/* Title */}
                <p className="text-md font-medium text-black mb-0">
                  {item.title}
                </p>

                {/* Number */}
                <div className="text-5xl font-bold text-black">
                  <CountUp
                    end={item.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {item.suffix}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-0">
                  <p className="text-sm text-muted-foreground">
                    {item.subtitle}
                  </p>

                  <span className="sm:flex hidden  flex h-8 w-8 items-center justify-center rounded-full border border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-600 hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
