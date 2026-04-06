"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "@/components/BaseImage";
import Autoplay from "embla-carousel-autoplay";
import { CarouselDots } from "@/components/carousel-dots";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate"
import { motion } from "motion/react";
import { Link } from "lucide-react";
import AutoHeight from "embla-carousel-auto-height";

const slides = [
  {
    title: "श्री प्राणनाथ जी' का ",
    highlight: "स्वरूप",
    link: "",
    scale:"scale-175",
    description:
      `श्री प्राणनाथ जी का स्वरूप ज्ञान की दोपहरी का वह सूरज है, जिसके उग जाने पर अध्यात्म जगत में किसी भी प्रकार का अन्धकार रूपी संशय नहीं रहता। वेदों की ऋचायें जिस को खोजती हैं, दर्शन ग्रन्थ जिस सत्य को पाना चाहते हैं, गीता और भागवत जिस परम लक्ष्य उत्तम पुरुष की ओर संकेत करते हैं, कुरान की आयतें जिस अल्लाह तआला का वर्णन करना चाहती हैं, बाइबल जिस प्रेम के स्वरूप का वर्णन करने का प्रयास करती है और सन्तों की वाणियाँ जिस सत्य की ओर संकेत करती हैं, उसकी पूर्ण प्राप्ति श्री प्राणनाथ जी की वाणी में निहित है।`,
    image: "/shriprannathji.png",
  },
  {
    title: "श्री राजन स्वामी",
    highlight: "||ब्रह्मज्ञान ही अमृत है - प्रेम ही जीवन है||",
    link: "https://www.spjin.org/",
    scale:"scale-175",
    description:
      `ज्ञान, शिक्षा, उच्च आदर्श, पावन चरित्र, व श्री प्राणनाथ जी की ब्रह्मवाणी (निजानन्द दर्शन) के साथ साथ भारतीय संस्कृति का समाज में प्रचार करना, तथा वैज्ञानिक सिद्धान्तों पर आधारित आध्यात्मिक मूल्यों द्वारा मानव को महामानव बनाना । - \n श्री प्राणनाथ ज्ञानपीठ`,
    image: "/swamiji_slider.png",
  },
  {
    title: "जागिए। उठिए। ",
    highlight: "पहचानिए अपना सत्य।",
    scale:"scale-175",
    link: "",
    description: `श्री प्राणनाथ जी द्वारा आवेशित तारतम वाणी आत्मा को उसके शाश्वत प्रियतम से जोड़ती है और सभी धर्मों के मूल सत्य को एक सूत्र में पिरोती है। हमारे सतगुरु तारतम वाणी से असंख्य हृदयों को जागृत कर रहे हैं। उनके चरणों का अनुसरण करते हुए, 'श्री प्राणनाथ जी वाणी' SPJV से जुड़े सभी सुंदरसाथ जी ज़ूम मीटिंग्स, यूट्यूब चैनल्स और सोशल मीडिया के माध्यम से वाणी की सुगंध का प्रसार कर रहे हैं और सबको प्रेम, सेवा और आत्म-जागृति के मार्ग पर चलने के लिए प्रेरित कर रहे हैं।
    `,
    image: "/sundarsathtwp.png",
  },
  {
    title: "बाल व युवा",
    highlight: "आत्मदर्शनम्",
    link: "/balkendra",
    scale:"scale-125",
    description:
      `बाल्यावस्था में हृदय कोमल और भावुक होता है और इस अवस्था में हृदय में अध्यात्म के पुष्प सहजता से प्रस्फुटित हो सकते हैं। श्री प्राणनाथ जी वाणी बाल एवं युवा आत्मदर्शनम् इसी उद्देश्य से रोचक मध्यमों से बाल/युवा वर्ग को धनी की वाणी से जोड़ने का प्रयास कर रहा है।`,
    image: "/Adsliderimg3.png",
  },
  {
    title: "परिवार के कुछ सुंदर नियम",
    highlight: "हम सब मिलकर पालन करें",
    link: "",
    scale:"scale-125",
    description:
      `
    1. धन की अपेक्षा नहीं श्री प्राणनाथ जी वाणी परिवार में धन की सेवा की आवश्यकता/अपेक्षा/माँग नहीं होती है।
    2. प्रेम और सम्मान परिवार में द्वेष, कटुता और दिल दुखाने वाले शब्दों के लिए कोई स्थान नहीं है।
    3. समता का भाव यहाँ न कोई निजानंदी है, न कोई कृष्णप्रणामी, हम सब केवल पियाजी के सुंदरसाथ हैं।
    4. सोशल मीडिया सतर्कता यदि व्हाट्सएप, फेसबुक या यूट्यूब आदि से कोई आपसे धन या किसी भी सेवा के लिए संपर्क करे, तो कृपया परिवार में चर्चा/सूचित अवश्य करें।
      `,
    image: "/rules.png",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>();
  const autoplay = useRef(
    Autoplay({
      delay: 12000,
      stopOnInteraction: false,
    })
  );
  useEffect(() => {
    if (!api) return
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (!api) return;
  }, [api]);

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 py-20 pb-10  lg:py-30 lg:pb-0">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                {/* DESKTOP VERSION */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-14 items-center">
                  {/* LEFT */}
                  <div>
                    <h1 className="text-5xl font-bold leading-tight">
                      <TextAnimate animation="blurInUp" startOnView delay={0.3} >
                        {slide.title}
                      </TextAnimate>
                      <span className="text-orange-500">
                        <TextAnimate animation="blurInUp" startOnView delay={0.3} className="text-5xl font-bold leading-tight text-orange-500">
                          {slide.highlight}
                        </TextAnimate>
                      </span>
                    </h1>
                    <TextAnimate animation="fadeIn" by="line" startOnView delay={0.3} className="mt-6 text-gray-700 text-lg max-w-xl">
                      {slide.description}
                    </TextAnimate>
                    {slide.link && (
                      <motion.div
                        key={activeIndex === index ? "active" : "inactive"}
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3
                        }}
                        className="space-y-4"
                      >
                        <div className="mt-8 flex gap-4">
                          <a href={slide.link}>
                            <Button
                              variant="outline"
                              className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                            >
                              अधिक जानिए
                            </Button>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* RIGHT */}
                  <motion.div
                    key={activeIndex === index ? "active" : "inactive"}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3
                    }}
                    className="rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.highlight}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>

                {/* MOBILE OVERLAY VERSION */}
                <div className="lg:hidden">
                  <div className="flex items-center gap-4 bg-[#f7f7f7] border border-orange-300 rounded-3xl p-4 h-45 mb-4 overflow-hidden">

                    {/* LEFT IMAGE */}
                    <div className="w-35 h-full flex items-center justify-center shrink-0 relative">
                      <Image
                        src={slide.image}
                        alt={slide.highlight}
                        width={120}
                        height={140}
                        className={`object-contain h-full w-auto ${slide.scale}`}
                      />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col justify-center bg-[#f7f7f7] ">
                      <h1 className="text-base font-semibold leading-snug text-orange-600 line-clamp-2">
                        <TextAnimate animation="blurInUp" startOnView delay={0.3}>
                          {slide.title}
                        </TextAnimate>
                        <span className="block text-gray-700 text-[12px]">
                          <TextAnimate animation="blurInUp" startOnView delay={0.3}>
                            {slide.highlight}
                          </TextAnimate>
                        </span>
                      </h1>

                      <TextAnimate
                        animation="fadeIn"
                        by="line"
                        startOnView
                        delay={0.3}
                        className="mt-2 text-xs text-gray-600 line-clamp-3"
                      >
                        {slide.description}
                      </TextAnimate>

                      {slide.link && (
                        <motion.div
                          key={activeIndex === index ? "active" : "inactive"}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mt-3">
                            <a href={slide.link}>
                              <Button className="rounded-full border-2 border-black px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                              >
                                अधिक जानिए
                              </Button>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>



              </CarouselItem>
            ))
            }
          </CarouselContent >

          {/* Controls */}
          < div className="flex items-center justify-between" >
            <CarouselDots api={api} />

            <div className="hidden lg:flex gap-3">
              <CarouselPrevious className="static mt-5 h-10 w-10 rounded-full border border-gray-300 text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer" />
              <CarouselNext className="static mt-5 h-10 w-10 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-50 cursor-pointer" />
            </div>
          </div >
        </Carousel >
      </div >
    </section >
  );
}