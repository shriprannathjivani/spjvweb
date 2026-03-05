import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { gamesList } from "@/lib/gamesnquiz"
import { notFound } from "next/navigation"
import { BookA, BookOpenCheck, Cake, Church, CircleUserRound, Gauge, Landmark, Link, MapPinHouse, MessageCircleQuestionMark, Play, Rainbow, School, Timer, UserPen, Youtube } from "lucide-react"
import PdfSection from "@/components/PdfReaderSection";
import Image from "@/components/BaseImage";
export const dynamicParams = false;

// 🔥 REQUIRED for static export
export async function generateStaticParams() {
  return gamesList.map((game) => ({
    slug: game.id.toString(), // because you're matching Number(slug)
  }));
}


export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ✅ unwrap here

  const game = gamesList.find(
    (g) => g.id === Number(slug)
  )

  if (!game) return notFound()
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 pt-25">
      <DynamicBreadcrumb currentTitle={game.gameName} />
      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-2 gap-12 mt-8">

        {/* ================= LEFT PANEL (STICKY) ================= */}
        

        {/* ================= RIGHT PANEL (SCROLLABLE CONTENT) ================= */}
        <div className="lg:col-span-2 h-full">
          <div className="h-full bg-white rounded-2xl shadow-sm p-4">
            <iframe
              src={game.link}
              className="w-full min-h-[calc(100vh-220px)] bg-white rounded-2xl"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}