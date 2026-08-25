import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { BOOKS, quotes } from "@/lib/gyankendra"
import { notFound } from "next/navigation"
import { BookA, BookOpenCheck, Cake, Church, CircleArrowLeftIcon, CircleArrowRightIcon, CircleUserRound, Landmark, Link, MapPinHouse, Play, Rainbow, School, UserPen, Youtube } from "lucide-react"
import PdfSection from "@/components/PdfReaderSection";
import Image from "@/components/BaseImage";
export const dynamicParams = false;

// 🔥 REQUIRED for static export
export async function generateStaticParams() {
  return BOOKS.map((book) => ({
    slug: book.id.toString(), // because you're matching Number(slug)
  }));
}

const basePath =
  process.env.NODE_ENV === "production" ? "/" : "";

export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params   // ✅ unwrap here

  const book = BOOKS.find(
    (g) => g.id === Number(slug)
  )

  const currentIndex = BOOKS.findIndex(
    (g) => g.id === Number(slug)
  );
  const prevGuru =
    currentIndex > 0 ? BOOKS[currentIndex - 1] : null;

  const nextGuru =
    currentIndex < BOOKS.length - 1
      ? BOOKS[currentIndex + 1]
      : null;

  if (!book) return notFound()
  return (
    <div className="max-w-370 mx-auto px-4 lg:px-8 py-24 pt-25">
      <DynamicBreadcrumb currentTitle={book.title} />
      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-12 mt-8">

        {/* ================= LEFT PANEL (STICKY) ================= */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-3xl sm:p-6 p-0 space-y-6 text-center">
            <div className="absolute z-[-1] h-52 w-52 rotate-65 rounded-[100%] bg-pink-500 blur-2xl" style={{ opacity: 0.5 }}></div>
            <div className="relative flex items-center justify-center">
              <Image
                src={book.image}
                alt={book.title}
                width={130}
                height={180}
                className="rounded-xl h-full object-cover -rotate-3"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {book.title}
              </h1>
              {book.languages.map((lang, i) => (
                <p className="relative mb-2 mt-4 rounded-full inline-flex items-center bg-white px-2 py-1 text-xs font-xl text-gray-600 inset-ring inset-ring-gray-500/10" key={i}><BookOpenCheck size={16} className="text-red-600 mr-2" />{lang}</p>
              ))}
              <p className="text-muted-foreground mt-2 line-clamp-4">
                {book.desc}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <CircleUserRound size={16} className="text-red-600" />
              <p className="text-muted-foreground">{book.author}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-center">
              <UserPen size={16} className="text-red-600" />
              <p className="text-muted-foreground">{book.publisher}</p>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3 pt-4 sm:mb-0 mb-8 flex items-center justify-center gap-4">

              {book.link && (
                <a
                  href={book.link}
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
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (SCROLLABLE CONTENT) ================= */}
        <div className="lg:col-span-2 ">
          <div className="leading-8 text-base text-gray-500 whitespace-pre-line font-poppins rounded-2xl sm:bg-transparent bg-white sm:mb-0 mb-6 sm:pt-0 pt-6">
            <PdfSection
              pdfUrl={`${basePath}${book.link}`}
              title="श्री प्राणनाथ वाणी"
              storageKey="prannath-vani-progress"
            />
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-6">
              अन्य पुस्तके
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* PREVIOUS */}
              {prevGuru && (
                <a
                  href={`${basePath}/gyanbhandar/book/${prevGuru.id}`}
                  className="group flex items-center gap-4 rounded-3xl p-4 border-2 border-transparent hover:border-orange-600 transition justify-between  bg-white"
                >
                  <div>
                    <p className="text-sm text-muted-foreground flex flex-col gap-2 items-center justify-center"><CircleArrowLeftIcon size={24} className="text-orange-600" /> पिछली पुस्तक </p>
                  </div>
                  <div className="w-25 h-35 relative shrink-0">
                    <Image
                      src={prevGuru.image}
                      alt={prevGuru.title}
                      fill
                      className="object-container"
                    />
                  </div>
                  <div>
                    <div className="md:pl-0">
                      <h2 className="text-base font-bold tracking-tighter text-orange-600 line-clamp-3">{prevGuru.title}</h2>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-3">{prevGuru.desc}</p>
                    </div>
                  </div>
                </a>
              )}

              {/* NEXT */}
              {nextGuru && (
                <a
                  href={`${basePath}/gyanbhandar/book/${nextGuru.id}`}
                  className="group flex items-center gap-4 rounded-3xl p-4 border-2 border-transparent hover:border-orange-600 transition justify-between  bg-white"
                >

                  <div className="w-25 h-35 relative shrink-0">
                    <Image
                      src={nextGuru.image}
                      alt={nextGuru.title}
                      fill
                      className="object-container"
                    />
                  </div>
                  <div>
                    <div className="md:pl-0">
                      <h2 className="text-base font-bold tracking-tighter text-orange-600 line-clamp-3">{nextGuru.title}</h2>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-3">{nextGuru.desc}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex flex-col gap-2 items-center justify-center"><CircleArrowRightIcon size={24} className="text-orange-600" /> अगली पुस्तक </p>
                  </div>
                </a>
              )}

            </div>
          </section>

        </div>
      </div>

    </div>
  )
}