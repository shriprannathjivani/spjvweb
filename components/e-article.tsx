import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export default function Earticle() {
  const articles = [
    {
      title: "कहानी और रहनी में इतनी बड़ी जो खाई है, उस खाई को कैसे भरा जा सकता है ?",
      guru: "श्री राजन स्वामी जी",
      author: "सुंदरदास द्वारा",
      date: "31 May 2025",
      image: "/article1.png",
    },
    {
      title: "श्रीजी और सुंदरसाथ जी में कैसा संबंध था?",
      guru: "श्री राजन स्वामी जी",
      author: "सुंदरदास द्वारा",
      date: "31 May 2025",
      image: "/article2.png",
    },
    {
      title: "मीठा गुरु भास्कर का",
      guru: "श्री राजन स्वामी जी",
      author: "सुंदरदास द्वारा",
      date: "31 May 2025",
      image: "/article3.png",
    },
    {
      title: "स्वामी जी के साधनाकाल व सतगुरु मिलन का वर्णन",
      guru: "श्री राजन स्वामी जी",
      author: "सुंदरदास द्वारा",
      date: "31 May 2025",
      image: "/article4.png",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            ई-मंथन लेखन
            <p className="text-xl text-gray-500 mt-4">
              जिनके शब्द, विचार और दृष्टिकोण, इस दुनिया को निरंतर पहले से बेहतर बना रहे हैं। वे जिनकी लेखनी, वाणी और सोच इस संसार को और सुख-शीतल बना रही है।
            </p>
          </h2>

          {/* Right */}
          <div className="space-y-4 text-right">
            <Button
              variant="outline"
              className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
            >
              सभी लेखन देखें
            </Button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {articles.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 bg-white/60 rounded-3xl items-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="rounded-l-2xl  object-cover"
              />

              <div className="flex-1 p-4 ">
                <h3 className="text-2xl leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground">
                  टीका – {item.guru}
                  <br />
                  लेखक – {item.author}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.date}</span>

                  <Link
                    href="#"
                    className="h-8 w-8 flex items-center justify-center rounded-full
                               border border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#eef3f8] to-[#fde6c8]
                        rounded-3xl overflow-hidden grid md:grid-cols-2">

          <div className="relative h-100 md:h-auto">
            <Image
              src="/articlebig.png"
              alt="घर पर सत्संग"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-3xl mb-4 md:text-4xl  font-bold leading-snug">
              घर पर सत्संग – एक आध्यात्मिक सभा का आयोजन करें
            </h3>

            <p className="mb-12 text-lg text-muted-foreground">
              सुंदरदास जी को अपने घर या कॉलोनी पर एक आध्यात्मिक सभा के लिए
              आमंत्रित करें। साथ में भगवान के पवित्र नामों का जाप करें और
              श्री प्राणनाथ जी की शिक्षाओं पर ज्ञानवर्धक प्रवचन सुनें।
            </p>

            <Button
              variant="outline"
              className="rounded-full w-fit border-2 border-black px-6 py-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
            >
              संपर्क करें
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
