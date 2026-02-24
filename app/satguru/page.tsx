"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button";
import React from "react";
import { useState } from "react"
import { satgurus } from "@/lib/satguru-data"
import useEmblaCarousel from "embla-carousel-react"
import {
    Carousel,
    CarouselContent,
    CarouselApi,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/carousel-dots";
import { QuoteIcon } from "lucide-react";
import { Ripple } from "@/components/ui/ripple"


const images = [
    { src: "/satguru1.png", topClass: "image image-left", subClass: "image-container image-1 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satgurutwo.jpg", topClass: "image image-middle-right", subClass: "image-container transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5 image-2" },
    { src: "/satguruthree.jpg", topClass: "image middle-right", subClass: "image-container image-3 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru2.png", topClass: "image image-right", subClass: "image-container image-4 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru3.png", topClass: "image image-left", subClass: "image-container image-5 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru11.png", topClass: "image image-left", subClass: "image-container image-6 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru5.png", topClass: "image image-left", subClass: "image-container image-7 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru6.png", topClass: "image image-left", subClass: "image-container image-8 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru7.png", topClass: "image image-left", subClass: "image-container image-9 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru8.png", topClass: "image image-left", subClass: "image-container image-10 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru9.png", topClass: "image image-left", subClass: "image-container image-11 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
    { src: "/satguru10.png", topClass: "image image-left", subClass: "image-container image-12 transform transition-all duration-500 ease-out hover:!z-[20] hover:scale-125 hover:rotate-5" },
]

const satgureInto = {
    content: `
        <div class="col-sm-4 text-justify"><p>भारतीय संस्कृति और अध्यात्म में गुरु का स्थान सर्वोपरि माना जाता है। स्कंध पुराण में तो गुरु को ही परमात्मा की संज्ञा दी गई है। </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">  गुरु ब्रह्मा गुरुर्विष्णु:, गुरुर्देवो महेश्वर: । 
            गुरु साक्षात् परब्रह्म, तस्मै श्री गुरुवे नमः ।। 
            </p>
            <p>अर्थात् - गुरु ही ब्रह्म रूप है क्योंकि वह शिष्य को बनाता है, गुरु विष्णु रूप है क्योंकि वह शिष्य की रक्षा करता है, गुरु शिव रूप है क्योंकि वह शिष्य के सभी देशों का संहार भी करता है, गुरु ही साक्षात् परब्रह्म परमात्मा का स्वरूप है, ऐसे समर्थ गुरु को मैं प्रणाम करता हूं । श्री गुरु अर्जुन देव जी भी अपनी पवित्र वाणी में गुरु को परमात्मा के समान बताते हैं। </p> <p class="text-red pt-1">गुरु की महिमा कथनु न जाई, पारब्रह्म गुर रहया समाई ।</p> <p> अर्थात् - गुरु की महिमा का बखान शब्दों में नहीं जा सकता, वह परब्रह्म परमात्मा ही सतगुरु रूप में निवास करता है । सतगुरु परमात्मा का ही रूप होता है । सद्गुरु का शब्दार्थ है सच्चे (सत्य, अखंड) गुरु अर्थात् वह गुरु जो हमें सत अखंड परमात्मा की पहचान करवाए। इसी संदर्भ में सद्गुरु की महिमा अत्यंत महत्वपूर्ण है । सतगुरु वह है जो सच्चे ज्ञान का प्रदाता है और अपने शिष्य को आत्म-साक्षात्कार की दिशा में मार्गदर्शन करता है । श्री गुरु अर्जुन देव जी अपनी वाणी में फुरमाते हैं- </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">सति पुरुखु जिनि जानिआ,
            सतिगुरु तिस का नाउ।। </p>
            <p>अर्थात् - जो उस सत पुरुष (अखंड परमात्मा) को जानता है वही सतगुरु कहा सकता है । श्री गुरु ग्रंथ साहिब में श्री अर्जुन देव जी कहते हैं – </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">बिनु सतिगुरू किनै न पाई परमगते 
            (प्रभाती- प - 1348) </p> 
            <p>अर्थात् - सतगुरु के मार्गदर्शन के बिना किसी को भी परम गति अर्थात् परमात्मा की प्राप्ति नहीं हो सकती । सतगुरु ऐसे पूर्ण विभूति होते हैं जो जीव आत्मा और परमात्मा को पहचान चुके हैं और हमें भवसागर से पार कर के परमात्मा का साक्षात्कार करवा सकते हैं । </p> 
        </div> 
         <div class="col-sm-4 text-justify"> <p>सतगुरु हद के पार बेहद और बेहद के पार अक्षर और उससे भी परे परमात्मा सच्चिदानंद का ज्ञान देते हैं । कबीर साहब ने कहा है :-</p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">हद में रहे सो मानवी बेहद रहे सो साध । 
            हद बेहद दोनों तजै,ताका मता अगाध ।। </p> 
            <p>अर्थात् - जो हद और बेहद को छोड़कर उसके आगे अक्षर और अक्षरातीत का ज्ञान दे, उसकी बुद्धि महान है । वही पूर्ण सतगुरु होगा। निजानंद संप्रदाय में गुरु और सतगुरु के लिए कहा गया है –</p> <p class="text-red pt-1">गुरु कंचन गुरु पारस गुरु चंदन प्रमाण । तुम सतगुरु दीपक भये , कियो जो आप सामान ।। </p> <p> गुरु कंचन के समान हो सकता है यानि वह खुद सद्गुणों का भंडार होते हैं परंतु शिष्य को अपनी जैसा पूर्ण सद्गुणों वाला नहीं बना सकते। गुरु पारस हो सकता है जो शिष्यों के अवगुणों (विकारों) को दूर करते हैं परंतु अपने समान पारस नहीं बनाता । गुरु चंदन के समान होते हैं परंतु शिष्यों के मूल स्वभाव को नहीं बदल पाते अर्थात अपने समान नहीं बनाते लेकिन सतगुरु दीपक के समान होते हैं जो अन्य दीपकों (शिष्यों)को भी जलकर अपने सामान बना लेते हैं । सतगुरु वह श्रेष्ठतम पूर्ण ब्रह्म ज्ञानी विभूति होता है जो दीपक की भांति हमें ज्ञान तो देता है । प्रकाश के रूप में उसके साथ-साथ वही ज्योति वह हमें भी समान रूप से प्रदान करता है । वह हमारे साथ शिष्यता का भेद नहीं रखता । सतगुरु की पहचान बताते हुए स्वयं अक्षरातीत पूर्ण ब्रह्म बताते हैं कि </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">सतगुरु साधु वाको कहिए, जो अगम की देवे गम । 
            हद बेहद सबे समझावे, भाने मन को भरम ।।श्री कि.ग्रंथ प्र. 4/12 </p> 
         </div> 
         <div class="col-sm-4 text-justify"><p>अर्थात् - सतगुरु उन्हें कहा जाता है जो हमें पूर्ण ब्रह्म परमात्मा की पहचान करवा दे और हमारे मन के सारे भरम समाप्त हो जाएं। इसी को विस्तृत रूप में श्री प्राणनाथ जी फुरमाते हैं :- </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line"> सतगुरु सोई जो आप चिन्हावे, माया धनी और घर । 
            सब चीन्ह परे आखिर की, ज्यों भूलिए नहीं अवसर ।। 
            श्री कि.ग्रंथ प्र. 14/11 </p> 
            <p> पूर्ण सतगुरु वही है जो हमें हमारे निज स्वरूप की पहचान करवा दे और यह बता दे कि हम कौन हैं ? माया क्या है ? ब्रह्म क्या है ? और हमारा (आत्मा का) घर कहां है ? यहां तक कि सच्चे सतगुरु की कृपा से मूल से लेकर महाप्रलय तक की खबर हो जाती है । सतगुरु के अंदर परमात्मा की शक्ति कार्य करती है । सतगुरु अपने अनुयायियों को पांच तत्वों की पूजा से निकलते हैं और पूर्ण ब्रह्म परमात्मा की पहचान करवाते हैं । ब्रह्म वाणी श्री कुलजम स्वरूप साहेब जी अक्षरातीत पूर्णब्रह्म परमात्मा के मुखारविंद की वाणी है जिसमें सतगुरु की महिमा और गरिमा को दर्शाया गया है । श्री प्राणनाथ जी सतगुरु का महत्व बताते हुए कहते हैं </p> 
            <p class="border-l-4 font-arya text-orange-900 border-orange-500 pl-4 text-lg whitespace-pre-line">मृग जलसों त्रिखा भाजे, तो गुरु बिन जीव पार पावे । 
            अनेक उपाय करें जो कोई, तो बिंद का बिंद में समावे ।। 
            श्री कि.ग्रंथ प्र. 2/6 </p> 
            <p> अर्थात् - जिस प्रकार मृगजल से कभी प्यास मिट नहीं सकती उसी प्रकार सद्गुरु की कृपा के बिना कभी भवसागर पार नहीं कर सकता चाहे वह कितना भी जप, तप, व्रत या योग साधना क्यों न कर ले । सद्गुरु की महिमा शब्दों में वर्णित करना अत्यंत कठिन है । उनका महत्व उनके अनुभव, ज्ञान और शिष्यों के प्रति उनकी निस्वार्थ सेवा में निहित होता है । सतगुरु के मार्गदर्शन में शिष्य आत्म-साक्षात्कार की दिशा में अग्रसर होते हैं और अपने जीवन को सच्चे अर्थों में सार्थक बना पाते हैं । सतगुरु की महिमा को नमन करते हुए हम उनके चरणों में श्रद्धा सुमन अर्पित करते हैं और उनके आशीर्वाद से अपने जीवन को ज्ञान और प्रकाश से आलोकित करते हैं । </p> 
        </div>
   `
}

export default function Aatmadarshan() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)
    const [api, setApi] = React.useState<CarouselApi>()
    // Auto Slide
    React.useEffect(() => {
        if (!emblaApi) return

        const interval = setInterval(() => {
            if (!isHovered) emblaApi.scrollNext()
        }, 5000)

        return () => clearInterval(interval)
    }, [emblaApi, isHovered])

    // Sync selected index
    React.useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        emblaApi.on("select", onSelect)
        onSelect()

        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index)
    }

    const activeMember = satgurus[selectedIndex]


    return (
        <>
            <style jsx>{`
        .myCard {
          position: absolute;
          left: 40px;
          transform: rotate(-6deg);
        }
          .image-container.image-1 {
          z-index: 4;
    width: 177px;
    height: 225px;
    top: calc(50% - 2px);
    left: calc(50% - 320px);
    transform: rotate(356deg);
}
    .image {
    border: 4px solid #fff;
    object-fit: cover;
    border-radius: 32px;
    width: 100%;
    height: 100%;
}
   
    .image-container {
    justify-content: center;
    align-self: center;
    align-items: center;
    height: 306px;
    display: flex;
    position: absolute;
    overflow: hidden;
}
    .image-image-left,.mage-image {
    object-fit: cover;
    width: 100%;
    height: 100%
}

.image-container-image-2 {
    border: 4px solid #ffffff;
    object-fit: cover;
    border-radius: 32px;
    height: 294px;
    position: absolute;
    inset: 0% auto 0% 17%;
    overflow: hidden;
    transform: translateY(-32px)rotate(-3.48deg)
}

.image-container-image-3 {
    border: 4px solid #ffffff;
    border-radius: 32px;
    height: 228px;
    position: absolute;
    inset: 0% 15% 0% auto;
    overflow: hidden;
    transform: translateY(-24px)rotate(5.82deg)
}

.image-image-middle-left {
    object-fit: cover;
    width: 100%;
    height: 100%
}

.image-collage {
    grid-template-rows: auto;
    grid-template-columns: 1fr .75fr;
    grid-auto-columns: 1fr;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    margin-bottom: 32px;
    display: flex;
    position: relative;
    margin-top: -140px;
}

.image-container {
    justify-content: center;
    align-self: center;
    align-items: center;
    height: 306px;
    display: flex;
    position: absolute;
    overflow: hidden
}

.image-container.image-4 {
z-index: 2;
    width: 177px;
    height: 225px;
    top: calc(50% - 220px);
    left: calc(50% + 449px);
    transform: rotate(6deg);
}

.image-container.image-3 {
    z-index: 2;
    width: 365px;
    height: 262px;
    top: calc(50% - 120px);
    left: calc(50% + 18px);
    transform: rotate(5.82deg)
}

.image-container.image-2 {
    z-index: 3;
    width: 462px;
    height: 321px;
    top: calc(50% - 163px);
    left: calc(50% - 314px);
    transform: rotate(356deg);
}

.image-container.image-1 {
    z-index: 5;
    width: 177px;
    height: 225px;
    top: calc(50% - 4px);
    left: calc(50% - 622px);
    transform: rotate(354deg);
}

.image-container.image-5 {
    z-index: 4;
    width: 177px;
    height: 235px;
    top: calc(50% - 234px);
    left: calc(50% - 370px);
    transform: rotate(1deg);
}

.image-container.image-6 {
    z-index: 4;
    width: 177px;
    height: 235px;
    top: calc(50% - 244px);
    left: calc(50% - 620px);
    transform: rotate(358deg);
}

.image-container.image-7 {
    z-index: 4;
    width: 247px;
    height: 335px;
    top: calc(50% - 144px);
    left: calc(50% - 540px);
    transform: rotate(3.91deg)
}
    .image-container.image-8 {
z-index: 4;
   width: 177px;
    height: 228px;
    top: calc(50% - 24px);
    left: calc(50% - 20px);
    transform: rotate(359deg);
}
    .image-container.image-9 {
z-index: 4;
    width: 177px;
    height: 225px;
    top: calc(50% - 2px);
    left: calc(50% - 320px);
    transform: rotate(356deg);
}
    .image-container.image-10 {
     z-index: 4;
    width: 247px;
    height: 309px;
    top: calc(50% - 116px);
    right: calc(50% - 590px);
    transform: rotate(358deg);
}
        .image-container.image-11 {
    z-index: 4;
    width: 187px;
    height: 245px;
    top: calc(50% - 234px);
    right: calc(50% - 444px);
    transform: rotate(3.91deg);
}
        .image-container.image-12 {
    z-index: 4;
    width: 177px;
    height: 228px;
    top: calc(50% - 20px);
    left: 70%;
    transform: rotate(1deg);
}

.image {
    border: 4px solid #ffffff;
    object-fit: cover;
    border-radius: 32px;
    width: 100%;
    height: 100%
}
    @media screen and (max-width: 767px) {
        .image-collage {
        height: 280px;
        transform: scale(.7);
    }
            .image-collage {
        grid-column-gap: 1.5rem;
        grid-row-gap: 1.5rem;
        height: 250px;
        margin-bottom: 64px;
    }
            .image-container.image-1 {
        top: calc(50% - 130px);
        left: calc(50% - 430px);
    }
            .image-container.image-2 {
        left: calc(50% - 220px);
    }
            .image-container.image-3 {
        z-index: 3;
        left: calc(50% + 120px);
    }
            .image-container.image-4 {
        left: calc(50% + 309px);
    }
 
    }
      `}</style>

            <div className="relative max-w-7xl mx-auto px-6 py-10 overflow-hidden pt-0 text-center font-arya ">
                <div className=" relative flex h-[500px] w-full flex-col items-center justify-center ">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">सतगुरु <span className="text-orange-500">व परमहंस</span></h2>
                    <p className="mt-4 text-muted-foreground text-xl  mb-12">जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं।<br /> वे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।</p>
                    <Ripple />
                </div>
                <div className="image-collage intersect-once intersect:motion-preset-slide-up intersect:motion-duration-800 intersect:motion-opacity-in-0 intersect:motion-delay-400 yc0y4 hkfg8 lg:text-xl">
                    {images.map((img, i) => (
                        <div className={img.subClass} key={img.src}>
                            <img alt="" src={img.src} className={img.topClass} />
                        </div>
                    ))}
                </div>

                <div className="text-start mt-16 mb-16">
                    <div
                        className="prose prose-lg text-base text-gray-500 max-w-none whitespace-pre-line grid grid-cols-1 md:grid-cols-3 gap-6 text-start font-poppins"
                        dangerouslySetInnerHTML={{ __html: satgureInto.content }}
                    />
                </div>


                {/* Carousel */}
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                    }}
                    className=""
                >
                    <CarouselContent>
                        {satgurus.map((satguru, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 md:basis-1/4 basis-[85%]"
                            >

                                <div className="max-w-md mx-auto">
                                    <div className="group relative rounded-3xl  transition-all duration-500  hover:-translate-y-2">

                                        {/* Image */}
                                        <div className="relative flex justify-center h-70  z-1 mb-[-50px]">
                                            <img
                                                src={satguru.image}
                                                alt={satguru.name}
                                                className="object-container  border-4 border-white rounded-[38px]"
                                            />
                                        </div>
                                        <div className="p-6 pt-16 bg-white rounded-3xl border border-gray-100 ">
                                            {/* Content */}
                                            <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                                                {satguru.name}
                                            </h3>

                                            <p className="text-orange-600 mt-2 text-base">
                                                {satguru.role}
                                            </p>

                                            <p className="mt-4 text-center text-gray-600 leading-relaxed text-sm font-poppins line-clamp-4 whitespace-pre-line">
                                                <QuoteIcon className="text-orange-600" />
                                                {satguru.quote}
                                            </p>

                                            {/* Divider */}
                                            <div className="mt-6 h-px w-full bg-gray-100"></div>

                                            {/* Footer  Place: {satguru.timeline[0].year}*/}
                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    Place:
                                                </span>
                                                <Link href={`/satguru/${satguru.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
                                                    >
                                                        जीवनी पढ़ें
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom Controls */}
                    <div className="mt-6 flex items-center justify-between">
                        <CarouselDots api={api} />

                        {/* Arrows */}
                        <div className="flex gap-3">
                            <CarouselPrevious
                                className="static h-10 w-10 mt-5 rounded-full border border-gray-300
                                       text-gray-500 hover:bg-orange-50 hover:text-orange-500 cursor-pointer"
                            />
                            <CarouselNext
                                className="static h-10 w-10 mt-5 rounded-full border border-orange-500
                                       text-orange-500 hover:bg-orange-50 cursor-pointer"
                            />
                        </div>
                    </div>
                </Carousel>

            </div>





        </>
    );
}