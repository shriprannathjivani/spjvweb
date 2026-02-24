import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { satgurus } from "@/lib/satguru-data"
import { notFound } from "next/navigation"
import { Cake, Church, Landmark, Link, MapPinHouse, Play, Rainbow, School, Youtube } from "lucide-react"


export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ✅ unwrap here

  const guru = satgurus.find(
    (g) => g.id === Number(slug)
  )

  if (!guru) return notFound()
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 pt-25">
      <DynamicBreadcrumb currentTitle={guru.name} />
      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-12 mt-8">

        {/* ================= LEFT PANEL (STICKY) ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-3xl p-6 space-y-6 text-center">
            <div className="absolute z-[-1] h-52 w-52 rotate-65 rounded-[100%] bg-pink-500 blur-2xl" style={{ opacity: 0.5 }}></div>
            <div className="relative ">
              <img
                src={guru.image}
                alt={guru.name}
                height={100}
                className="rounded-xl w-full object-cover -rotate-3"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {guru.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {guru.shortIntro}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <Cake size={16} className="text-red-600" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500 text-base">जन्म</p>

                  <p className="text-xl">{guru.birth}</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <Rainbow size={16} className="text-red-600" />

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500 text-base">समाधि</p>

                  <p className="text-xl">{guru.samadi}</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <Landmark size={16} className="text-red-600" />
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500 text-base">संप्रदाय</p>

                  <p className="text-xl">{guru.lineage}</p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 flex items-center gap-4">

              {guru.pdf && (
                <a
                  href={guru.pdf}
                  target="_blank"
                  className="mb-0"
                >
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white cursor-pointer "
                  >
                    डाउनलोड करें
                  </Button>

                </a>
              )}
              {guru.youtube && (
                <a
                  href={guru.youtube}
                  target="_blank"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full text-red-600 border-red-600 border flex  items-center justify-center">
                      <Play size={16} />
                    </div>
                    <p className="text-red-600">यूट्यूब पर देखें</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (SCROLLABLE CONTENT) ================= */}
        <div className="lg:col-span-2 space-y-16">

          {/* Biography */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              जीवनी
            </h2>
            <div className="leading-8 text-base text-gray-500 whitespace-pre-line font-poppins">
              <div
                dangerouslySetInnerHTML={{
                  __html: guru.biography ?? ""
                }}
              />
            </div>
          </section>

          {/* Journey Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              आध्यात्मिक यात्रा
            </h2>

            <div className="relative flex flex-col items-center md:mt-16">
              <div className="absolute -top-[32px] left-0 hidden h-0.5 bg-gray-300/50 md:block w-full" ></div>
              <div className="grid gap-6 md:grid-cols-4">
                {guru.timeline?.map((timeline, i) => (
                  <div key={i} className="relative space-y-2">
                    <div className="absolute top-0 -left-[9px] z-10 mb-5 flex size-5 items-center justify-center rounded-full bg-red-600 p-1 md:-top-10 md:left-0">
                      <div className="size-full rounded-full bg-background">
                      </div>
                    </div>
                    <div className="pl-7 md:pl-0">
                      <p className="text-sm text-muted-foreground text-orange-900">{timeline.year}</p>
                      <h2 className="text-xl font-bold tracking-tighter text-orange-600 text-foreground">{timeline.title}</h2>
                      <p className="text-muted-foreground mt-4">{timeline.content}</p>
                    </div>
                  </div>

                ))}
              </div>

            </div>
          </section>

          {/* Temples */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              स्थापित पीठ एवं मंदिर
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {guru.temple?.map((temp, i) => (
                <div key={i}>
                  <img src={temp.image} className="object-container mb-8  border-4 border-white rounded-[38px]" />
                  <h3 className="text-xl flex gap-4 items-center mb-2"><School size={16} className="text-red-600" />{temp.name}</h3>
                  <p className="text-base flex gap-4 items-start text-gray-500 whitespace-pre-line"><MapPinHouse size={16} className="text-gray-600" />{temp.location}</p>
                </div>
              ))}
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
                {guru.quote}
              </blockquote>
            </div>
          </section>

          {/* Map */}
          {guru.mapEmbed && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">
                प्रमुख स्थान
              </h2>

              <iframe
                src={guru.mapEmbed}
                className="w-full h-[400px] rounded-3xl"
                loading="lazy"
              />
            </section>
          )}

        </div>
      </div>
    </div>





  )
}