"use client";

import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";


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
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">
          हमारी यात्रा
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-3 sm:mb-8 leading-relaxed">
          आज, श्री प्राणनाथ जी के मिशन ने लाखों लोगों के जीवन को छुआ है।
          लोगों के साथ सीधे संपर्क और इंटरनेट पर अलग-अलग माध्यमों से,
          वह सभी को स्पष्टता देते रहते हैं।
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 gap-4 sm:gap-6">
          {STATS.map((item, index) => (
            <Card
              key={index}
              className={`relative rounded-2xl border-0 bg-white shadow-none
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
                  <p className="text-base text-orange-900" dangerouslySetInnerHTML={{
                    __html: item.subtitle ?? ""
                  }} />
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
