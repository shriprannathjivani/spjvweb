import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { BOOKS, quotes, sahiyogitaList } from "@/lib/gyankendra"
import { notFound } from "next/navigation"
import { BookA, BookOpenCheck, Cake, Church, CircleUserRound, Gauge, Landmark, Link, MapPinHouse, MessageCircleQuestionMark, Play, Rainbow, School, Timer, UserPen, Youtube } from "lucide-react"
import PdfSection from "@/components/PdfReaderSection";
import Image from "@/components/BaseImage";
export const dynamicParams = false;

// 🔥 REQUIRED for static export
export async function generateStaticParams() {
  return sahiyogitaList.map((sahiyog) => ({
    slug: sahiyog.id.toString(), // because you're matching Number(slug)
  }));
}


export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ✅ unwrap here

  const sahiyog = sahiyogitaList.find(
    (g) => g.id === Number(slug)
  )

  if (!sahiyog) return notFound()
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 pt-25">
      <DynamicBreadcrumb currentTitle={sahiyog.name} />
      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-12 mt-8">

        {/* ================= LEFT PANEL (STICKY) ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-3xl p-6 space-y-6 text-center">
            <div className="absolute z-[-1] h-52 w-52 rotate-65 rounded-[100%] bg-pink-500 blur-2xl" style={{ opacity: 0.5 }}></div>

            <div className="relative">
              <div className="card-circle">{sahiyog.id}</div>
              <div className="group bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer cardCustome">

                <div className="flex items-start justify-start gap-2">
                  <Image height={60} width={60} alt="question icon" src="/question.gif" />
                  <div className="text-start">
                    {/* Tag */}
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-2 inset-ring ${sahiyog.tag === "श्री बीतक साहिब"
                        ? "text-red-600 bg-ring-50  inset-ring-red-500/10"
                        : "text-purple-600 bg-purple-50   inset-ring-purple-500/10"
                        }`}
                    >{sahiyog.tag}</span>
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800  mb-4 line-clamp-2">
                      {sahiyog.name}
                    </h3>
                  </div>
                </div>
                {/* Bottom Meta */}
                <div className="flex items-center text-sm text-gray-500 flex-col gap-2">
                  <span className=" text-base flex gap-2 items-center"><Timer size={16} /> क्विज टाइम : {sahiyog.duration}</span>
                  <span className="text-base flex gap-2 items-center"><MessageCircleQuestionMark size={16} /> टोटल क्वेश्चन : {sahiyog.questions}</span>
                  <span className={`text-base flex gap-2 items-center ${sahiyog.level === "सरल"
                    ? "text-green-600"
                    : "text-red-600"
                    } ${sahiyog.level === "मध्यम" ? 'text-yellow-600' : ''}`}
                  >
                    <Gauge size={16} /> क्विज लेवल : {sahiyog.level}
                  </span>
                </div>
                <div className="flex text-center justify-center mt-4">
                  <a href={sahiyog.link} target="_blank">
                    <Button
                      variant="outline"
                      className="rounded-full border-2 border-black px-6 py-5 text-sm  text-white bg-orange-500 hover:bg-orange-600 hover:text-white cursor-pointer"
                    >
                      ओपन फुलस्क्रीन
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (SCROLLABLE CONTENT) ================= */}
        <div className="lg:col-span-2 h-full">
          <div className="h-full bg-white rounded-2xl shadow-sm p-4">
            <iframe
              src={sahiyog.link}
              className="w-full h-[4770px] bg-white rounded-2xl"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}