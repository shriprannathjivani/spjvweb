"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { TextAnimate } from "./ui/text-animate";
import { motion } from "framer-motion";


const STATS = [
  {
    title: "यूट्यूब ",
    value: 25000,
    suffix: "+",
    subtitle: "सब्स्क्राइबर्स",
  },
  {
    title: "फेसबुक ",
    value: 7300,
    suffix: "+",
    subtitle: "फॉलोवर्स",
  },
  {
    title: "इंस्टाग्राम ",
    value: 1300,
    suffix: "+",
    subtitle: "फॉलोवर्स",
  },
  {
    title: "पुस्तकें",
    value: 4,
    suffix: "+",
    subtitle: "लाखों के जीवन को छुआ",
  },
  {
    title: "बाल/युवा आत्मदर्शनम्",
    value: 600,
    suffix: "+",
    subtitle: "बाल/युवा/नए <br /> सुन्दरसाथ जी के<br /> लिए विशेष कार्यक्रम",
  },
  {
    title: "ऑनलाइन वैश्विक पारायण",
    value: 4,
    suffix: "+",
    subtitle: `1. गोटा पारायण <br />
              2. साप्ताहिक पारायण <br />
              3. अखंड पारायण <br />
              4. बीतक साहेब अखंड पारायण`,
    large: true,
  },
  {
    title: "हमारे अन्य यूट्यूब चैनल्स",
    value: 3,
    suffix: "+",
    subtitle: `1. श्री प्राणनाथ जी वाणी <br />
              2. श्री प्राणनाथ जी वाणी गायन <br />
              3. SPJV–आत्मदर्शनम् <br />`,
    large: true,
  },
  {
    title: "24/7 ज़ूम मीटिंग्स घंटे",
    value: 6048,
    suffix: "+",
    subtitle: "1. वाणी मंथन <br /> 2. चर्चनी <br /> 3. चितवनि",
  }
];

export default function Stats() {
  return (
    <section className="pt-0 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <TextAnimate
          animation="blurInUp"
          startOnView
          by="line"
          delay={0.3}
          className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4"
        >
          {`हमारी यात्रा`}
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          startOnView
          by="line"
          delay={0.3} className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-3 sm:mb-8 leading-relaxed">
          आज, श्री प्राणनाथ जी के मिशन ने लाखों लोगों के जीवन को छुआ है।
          लोगों के साथ सीधे संपर्क और इंटरनेट पर अलग-अलग माध्यमों से,
          वह सभी को स्पष्टता देते रहते हैं।
        </TextAnimate>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {STATS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2
              }}
              className={` rounded-2xl gap-6 bg-white shadow-none
                ${item.large ? "lg:col-span-2" : ""}
              `}
            >
              <CardContent className="flex p-4 sm:p-6 flex-col justify-between h-full">
                {/* Title */}
                <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                  {item.title}
                </p>

                {/* Number */}
                <div className="text-2xl sm:text-5xl font-bold text-black">
                  <CountUp
                    end={item.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {item.suffix}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-1 sm:mt-3">
                  <p
                    className="text-[14px] sm:text-base text-orange-900 leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: item.subtitle ?? ""
                    }}
                  />

                  <span className="flex hidden sm:h-8 sm:w-8 items-center justify-center rounded-full border border-orange-500 text-orange-500">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </CardContent>
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}
