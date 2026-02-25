import Image from "@/components/BaseImage";
import { Button } from "@/components/ui/button";

export default function LiveSessions() {
  return (
    <section className="relative  py-10 ">
      {/* Decorative gradient bg-[radial-gradient(circle_at_top_left,rgba(255,128,0,0.35),transparent_70%)] */}
      <div className="absolute left-0 top-0 h-48 w-48 " />
      <Image src="/halfflower.png" height={40} width={40} alt="halfflower" className="absolute top-1 left-0 z-0 motion-safe:animate-wiggle w-[70px] h-auto
    sm:w-[150px] sm:h-auto" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6 leading-snug">
              श्री प्राणनाथ जी वाणी <br />
              के साथ लाइव लाइव सेशन
            </h2>
            <ul className="space-y-3 text-xl text-gray-500">
              <li>
                1. श्री प्राणनाथ जी वाणी के दो सेशन और हर दिन 10+ हिंदी लाइव सेशन
              </li>
              <li>
                2. 8000+ घंटे से ज्यादा पिछले सेशन की रिकॉर्डिंग
              </li>
              <li>
                3. हर महीने GOOGLE विज्ञापन पर 70+ एंगेजमेंट
              </li>
              <li className="">
                <h3 className="text-xl text-orange-900 mt-4 mb-4"> 24000+ सुंदरसाथ जी मिशन प्रतिनिधियों के साथ जुड़े और सीखें</h3>
                <div className="flex -space-x-2 overflow-hidden">
                  <Image height={40} width={40} src="/psimg5.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <Image height={40} width={40} src="/psimg6.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <Image height={40} width={40} src="/psimg12.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                  <Image height={40} width={40} src="/psimg8.png" alt="" className="inline-block size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                </div>
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            className="rounded-full border-2 border-black px-6 py-5 text-sm font-medium hover:bg-black hover:text-white cursor-pointer"
          >
            सभी लाइव सेशन देखें
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "चितवन \nश्री राजन स्वामी जी",
              img: "/livesession1.png",
            },
            {
              title: "श्री बीतक साहेब यात्रा",
              img: "/livesession2.png",
            },
            {
              title: "श्री सिद्ध मंथन",
              img: "/livesession3.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-4xl bg-white shadow-md"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-lg font-semibold whitespace-pre-line">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
