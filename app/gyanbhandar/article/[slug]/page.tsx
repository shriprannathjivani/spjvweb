import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { articles } from "@/lib/articles";
import { notFound } from "next/navigation"
import { Cake, Calendar, Church, CircleUserRound, Landmark, Link, MapPinHouse, Play, Rainbow, School, UserPen, Youtube } from "lucide-react"


export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ✅ unwrap here

  const article = articles.find(
    (g) => g.id === Number(slug)
  )
  if (!article) return notFound()
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 pt-25">
      <DynamicBreadcrumb currentTitle={article.title} />
      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-4 gap-12 mt-8">

        {/* ================= LEFT PANEL (STICKY) ================= */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 rounded-3xl p-6 space-y-6 text-center">
            <div className="absolute z-[-1] h-52 w-52 rotate-65 rounded-[100%] bg-pink-500 blur-2xl" style={{ opacity: 0.5 }}></div>
            <div className="relative ">
              <img
                src={article.image}
                alt={article.image}
                className="rounded-xl w-full object-cover -rotate-3"
              />
            </div>

            <div>
              <span className="animate-bounce mb-4 inline-block bg-lime-300 text-black text-xs md:text-sm px-4 py-2 rounded-full font-medium">
                            {article.tag}
                          </span>
              <h1 className="text-2xl font-bold">
                {article.title}
              </h1>
            </div>

            <div className="flex items-center justify-center gap-2 text-center">
              <CircleUserRound size={16} className="text-red-600" />
              <p className="text-gray-500 text-base">टीका</p>
              <p className="text-muted-foreground">{article.tikaName}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <UserPen size={16} className="text-red-600" />
              <p className="text-gray-500 text-base">लेखक</p>
              <p className="text-muted-foreground">{article.writer}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <Calendar size={16} className="text-red-600" />
              <p className="text-gray-500 text-base">तारीख</p>
              <p className="text-muted-foreground">{article.date}</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (SCROLLABLE CONTENT) ================= */}
        <div className="lg:col-span-2 space-y-16">

          {/* Biography */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              लेखक
            </h2>
            <div className="leading-8 text-base text-gray-500 whitespace-pre-line font-poppins">
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content ?? ""
                }}
              />
            </div>
          </section>

         

          {/* Quotes */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              प्रमुख उपदेश
            </h2>

            <div className="space-y-6">

              <blockquote
                className="border-l-4 border-orange-500 pl-4 italic text-lg whitespace-pre-line"
              >
                {article.summary}
              </blockquote>
            </div>
          </section>


        </div>
      </div>
    </div>

  )
}