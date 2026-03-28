"use client";

import { useEffect, useRef, useState } from "react";
import HeaderDashboard from "../header";
import Searching from "@/public/Searching.json"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { BookOpenText, ChevronLeft, ChevronRight, CircleChevronLeft, CircleChevronRight, ClosedCaptionIcon, FilterIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import clsx from "clsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
/* ---------------- TYPES ---------------- */
type Block = {
  chopai: string;
  meaning: string;
};

type Chapter = {
  title: string;
  content: string;
  intro: string; // ✅ NEW
};

/* ---------------- DIGIT HELPERS ---------------- */
const DEVANAGARI = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const ARABIC = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const digitMap: Record<string, string> = {};
DEVANAGARI.forEach((d, i) => (digitMap[d] = ARABIC[i]));

const normalizeDigits = (str: string) =>
  str.replace(/[०-९]/g, (d) => digitMap[d] || d);

/* ---------------- PARSER (YOUR LOGIC + FIX) ---------------- */
function parseBlocks(htmlText: string): Block[] {
  const container = document.createElement("div");

  const safeHTML = htmlText
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br>")
    .replace(/<hr\s*\/?>/gi, "<hr>");

  container.innerHTML = safeHTML;

  const blocks: Block[] = [];
  const allHRs = container.querySelectorAll("hr");

  // 🔥 fallback if no hr
  if (allHRs.length === 0) {
    return fallbackParse(htmlText);
  }

  allHRs.forEach((hr) => {
    let node: ChildNode | null = hr.nextSibling;

    let chopai = "";
    let meaning = "";

    while (node) {
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).tagName === "HR"
      ) break;

      if (
        node.nodeType === 1 &&
        (node as HTMLElement).tagName === "STRONG"
      ) {
        const el = node as HTMLElement;

        // ❌ ignore h3 (chapter)
        if (el.querySelector("h3")) {
          node = node.nextSibling;
          continue;
        }

        const text = el.innerText.trim();
        if (text.includes("।।")) {
          chopai = text;
        }
      } else {
        let text = "";

        if (node.nodeType === 3) {
          text = node.textContent || "";
        } else if (node.nodeType === 1) {
          const el = node as HTMLElement;
          if (el.tagName !== "BR") {
            text = el.innerText;
          }
        }

        if (text.trim()) {
          meaning += text.trim() + "\n\n";
        }
      }

      node = node.nextSibling;
    }

    if (chopai) {
      blocks.push({
        chopai: chopai.trim(),
        meaning: meaning.trim(),
      });
    }
  });

  return blocks;
}

/* ---------------- FALLBACK ---------------- */
function fallbackParse(htmlText: string): Block[] {
  const container = document.createElement("div");

  const safeHTML = htmlText
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br>");

  container.innerHTML = safeHTML;

  const blocks: Block[] = [];

  const strongTags = container.querySelectorAll("strong");

  strongTags.forEach((strong) => {
    const el = strong as HTMLElement;

    // ❌ skip chapter titles
    if (el.querySelector("h3")) return;

    const text = el.innerText.trim();

    if (!text.includes("।।")) return;

    let chopai = text;
    let meaning = "";

    let node: ChildNode | null = strong.nextSibling;

    while (node) {
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).tagName === "STRONG"
      ) break;

      let t = "";

      if (node.nodeType === 3) {
        t = node.textContent || "";
      } else if (node.nodeType === 1) {
        const tag = (node as HTMLElement).tagName;
        if (tag !== "BR") {
          t = (node as HTMLElement).innerText;
        }
      }

      if (t.trim()) {
        meaning += t.trim() + "\n\n";
      }

      node = node.nextSibling;
    }

    blocks.push({
      chopai: chopai.trim(),
      meaning: meaning.trim(),
    });
  });

  return blocks;
}

function formatChopai(text: string) {
  // break after first danda
  const parts = text.split("।");

  if (parts.length >= 2) {
    return parts[0] + "।\n" + parts.slice(1).join("।");
  }

  return text;
}

function formatChopaiListing(text: string) {
  const index = text.indexOf("।");

  let result =
    index !== -1 ? text.slice(0, index + 1) : text;

  // remove comma and danda
  return result.replace(/[,\u0964]/g, "").trim();
}

/* ---------------- SEARCH ---------------- */
const searchBlocks = (db: string, query: string): Block[] => {
  const nq = normalizeDigits(query.toLowerCase());
  const blocks = parseBlocks(db);

  return blocks.filter((b) => {
    const c = normalizeDigits(b.chopai.toLowerCase());
    const m = normalizeDigits(b.meaning.toLowerCase());
    return c.includes(nq) || m.includes(nq);
  });
};

/* ---------------- HIGHLIGHT ---------------- */
const highlight = (text: string, q: string) => {
  if (!q) return text;

  const re = new RegExp(q, "gi");
  return text.replace(re, (m) => `<mark class="bg-yellow-300">${m}</mark>`);
};

/* ---------------- CHAPTER EXTRACTION ---------------- */
function extractChapters(htmlText: string) {
  const container = document.createElement("div");

  const safeHTML = htmlText
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br>");

  container.innerHTML = safeHTML;

  const chapters: Chapter[] = [];

  // ✅ IMPORTANT: find h3 ANYWHERE (even inside strong)
  const allH3 = container.querySelectorAll("h3");

  allH3.forEach((h3, i) => {
    const title = h3.innerText.trim();

    let content = "";
    let intro = "";

    let node: ChildNode | null = h3.parentElement?.nextSibling || h3.nextSibling;

    let foundChopai = false;

    while (node) {
      // 🛑 STOP when next H3 found anywhere inside node
      if (
        node.nodeType === 1 &&
        (node as HTMLElement).querySelector?.("h3")
      ) {
        break;
      }

      // ✅ Build FULL CONTENT
      if (node.nodeType === 3) {
        content += node.textContent;
      } else if (node.nodeType === 1) {
        content += (node as HTMLElement).outerHTML;
      }

      // -------------------------
      // ✅ INTRO (before first chopai)
      // -------------------------
      if (!foundChopai) {
        if (
          node.nodeType === 1 &&
          (node as HTMLElement).tagName === "STRONG" &&
          (node as HTMLElement).innerText.includes("।।")
        ) {
          foundChopai = true;
        } else {
          if (node.nodeType === 3) {
            intro += node.textContent;
          } else if (node.nodeType === 1) {
            const el = node as HTMLElement;
            if (el.tagName !== "BR") {
              intro += el.outerHTML;
            }
          }
        }
      }

      node = node.nextSibling;
    }

    chapters.push({
      title,
      content,
      intro: intro.trim(),
    });
  });

  return chapters;
}


/* ---------------- COMPONENT ---------------- */
export default function Page() {
  const [db, setDb] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [results, setResults] = useState<Block[]>([]);
  const [query, setQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [index, setIndex] = useState(-1);
  const [intro, setIntro] = useState("");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isIdle = results.length === 0 && !query && activeChapter === null;
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIndex(-1);

    // optional reset
    setActiveChapter(null);
    setIntro("");

    // reset refs
    itemRefs.current = [];
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  /* LOAD DATA */
  useEffect(() => {
    fetch("/allvani/singaar.txt")
      .then((r) => r.text())
      .then((t) => {
        const clean = t.replace(/\\n/g, "\n");

        const extracted = extractChapters(clean);

        console.log("CHAPTERS:", extracted); // 👈 DEBUG

        setDb(clean);
        setChapters(extracted);
      })
      .catch(() => {
        console.error("LOAD FAILED");
      });
  }, []);

  useEffect(() => {
    if (index >= 0 && itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  /* SEARCH */
  const performSearch = () => {
    if (!query) return;

    const res = searchBlocks(db, query);
    setResults(res);
    setIndex(res.length ? 0 : -1);
    setActiveChapter(null);
  };


  const openChapter = (i: number) => {
    const chapter = chapters[i];

    if (!chapter) return;

    setActiveChapter(i);
    setIntro(chapter.intro);

    const blocks = parseBlocks(chapter.content);

    setResults(blocks);
    setIndex(blocks.length ? -1 : -1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const clearChapterSelection = () => {
    setActiveChapter(null);
    setResults([]);
    setIndex(-1);
    setIntro("");

    // reset refs
    itemRefs.current = [];

    // scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 ">
        {/* 🔥 DASHBOARD NAV */}
        <HeaderDashboard />
        <div className="max-w-7xl  mx-auto  px-6 py-6 pb-0">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  href="/dashboard"
                  className="flex items-center text-orange-600 text-base"
                >
                  <CircleChevronLeft className="me-2" size={16} />
                  डैशबोर्ड पर वापस
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink >श्री सिंगार खोज</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* CONTENT */}
        <div className={clsx(
          "container mx-auto  sm:px-6 sm:py-6 pt-0 sticky z-20 transition-all duration-300 ease-in-out",
          scrolled
            ? "sticky top-16 sm:top-10"
            : "px-0 py-0"
        )}
        >
          {/* Heading */}
          <div className={clsx(
            "flex flex-col-reverse  md:flex-row md:items-center gap-1 sm:gap-8 p-4 py-2 sm:py-4 transition-all duration-300 ease-in-out",
            scrolled
              ? "rounded-0 bg-white border border-gray-200 shadow-[5px_1px_20px_1px_rgba(0,0,0,0.10)] p-6"
              : "sm:rounded-3xl "
          )}
          >

            {/* LEFT (Auto width) */}
            <div className="shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-3xl font-semibold text-gray-900 sm:flex hidden">
                  श्री सिंगार चौपाइयाँ — खोज
                </h2>
              </div>
            </div>
            <div className="flex items-center justify-between sm:mt-0 mt-2 ">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen} >
                <SheetTrigger className="md:hidden flex gap-2"><BookOpenText />सेलेक्ट चैप्टर</SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle className="p-2">📚 सेलेक्ट चैप्टर</SheetTitle>
                    <div className="h-[calc(100vh-140px)] overflow-y-auto">
                      {chapters.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => openChapter(i)}
                          className={`p-2 text-lg flex gap-2 items-start text-gray-600 cursor-pointer whitespace-pre-line ${activeChapter === i
                            ? "bg-orange-100 border-l-2 border-orange-600 text-orange-600"
                            : "hover:bg-orange-100 hover:border-orange-600 border-l-2 border-transparent"
                            }`}
                        >
                          <span>{i + 1}.</span>  <span>{formatChopaiListing(c.title)}</span>
                        </div>
                      ))}
                    </div>

                  </SheetHeader>
                </SheetContent>
              </Sheet>
              {results.length > 0 && (
                <div className="shrink-0">
                  {/* NAV */}

                  <div className="flex gap-2 bg-white p-2  rounded-full text-base border border-gray-100">
                    <button onClick={() => setIndex((i) => (i - 1 + results.length) % results.length)}><ChevronLeft className="rounded-full bg-yellow-400 p-1 border-2 border-black cursor-pointer hover:scale-[1.1] duration-500" size={30} /></button>
                    <span className="leading-7.5">{index + 1} / {results.length}</span>
                    <button onClick={() => setIndex((i) => (i + 1) % results.length)}><ChevronRight className="rounded-full bg-yellow-400 p-1 border-2 border-black cursor-pointer hover:scale-[1.1] duration-500" size={30} /></button>
                    <button onClick={clearSearch}><X className="rounded-full bg-red-600 border-2 border-black p-1  text-white hover:text-white hover:bg-red-400 text-base hover:scale-[1.1] duration-500  cursor-pointer" size={30} /></button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT (Take remaining space) */}
            <div className="flex-1 w-full">

              {/* SEARCH */}
              <div className="flex flex-row md:flex-row items-center gap-2 w-full">
                <div className="relative w-full">
                  {/* INPUT (FULL WIDTH) */}
                  <Search className="absolute left-2.5 top-3 text-orange-600" />
                  <input
                    id="1"
                    name="खोजें"
                    className="border p-3 w-full rounded-full pl-10 pr-10 text-base bg-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="कृपया कोई शब्द टाइप करें..."
                  />
                  {/* CLEAR BUTTON */}
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2.5 top-2 bg-red-600 border-2 border-black p-2 rounded-full text-white hover:text-white hover:bg-red-400 text-base  cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {/* SEARCH BUTTON */}
                <Button
                  onClick={performSearch}
                  className="shrink-0 rounded-full border-2 border-black px-6 py-5.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
                >
                  खोजें
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto pb-16 px-2 sm:px-6">
          <div className="flex sm:flex-row flex-col py-2 sm:py-4 gap-4">
            {/* LEFT SIDEBAR */}
            <div className="w-70 hidden lg:block">
              <div className="overflow-y-auto  bg-white rounded-3xl border border-gray-100">
                <h2 className="font-bold mb-3  p-3 border-b">📚 सेलेक्ट बीतक चैप्टर</h2>
                {chapters.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => openChapter(i)}
                    className={`p-2 text-base flex gap-2 items-start text-gray-600 cursor-pointer whitespace-pre-line ${activeChapter === i
                      ? "bg-orange-100 border-l-2 border-orange-600 text-orange-600"
                      : "hover:bg-orange-100 hover:border-orange-600 border-l-2 border-transparent"
                      }`}
                  >
                    <span>{i + 1}.</span>  <span>{formatChopaiListing(c.title)}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="flex-1 relative">
              {isIdle && (
                <div className="flex flex-col items-center justify-center text-center sm:py-20 py-6 sm:px-0 px-4 text-gray-500 bg-white rounded-3xl border border-gray-100">

                  {/* ICON */}
                  <Lottie
                    animationData={Searching}
                    loop={true}
                    className="w-full sm:w-100 h-60"
                  />
                  {/* TITLE */}
                  <h2 className="text-xl font-semibold mb-2 text-orange-600">
                    कोई अध्याय चुने या खोज करें
                  </h2>

                  {/* SUBTEXT */}
                  <p className="max-w-md text-gray-500 text-sm md:text-base font-poppins">
                    कृपया बाईं ओर से कोई अध्याय चुनें या ऊपर सर्च बॉक्स में शब्द टाइप करें।
                  </p>
                  <p className="text-gray-500 text-sm md:text-sm mt-4 font-poppins">
                    निर्देश : <br />
                    खोज करने के लिए शब्द डालें और “खोजें” दबाएँ।<br />
                    यहाँ शब्द डालें (उदा. बिटक का नाम, श्लोक या विषय)
                  </p>

                </div>
              )}

              {activeChapter !== null && (
                <div className="flex items-center justify-between p-2 sm:p-4 border-b">
                  <span className="text-orange-600 text-2xl line-clamp-2 whitespace-pre-line leading-normal">
                    {formatChopaiListing(chapters[activeChapter]?.title)}
                  </span>
                  <button className="shrink-0 hidden sm:flex gap-2 items-center cursor-pointer" onClick={clearChapterSelection}><X className="rounded-full bg-red-600 border-2 border-black p-1  text-white hover:text-white hover:bg-red-400 text-base hover:scale-[1.1] duration-500  cursor-pointer" size={30} />चैप्टर हटाएँ</button>
                </div>
              )}

              {intro && (
                <div className="hidden sm:flex flex-col"><h3 className="font-bold mt-2 text-black  px-2 sm:px-4">प्रस्तावना:</h3>
                  <div
                    className="mb-6 p-2 sm:p-4 bg-gray-50 rounded text-base font-poppins whitespace-pre-line text-gray-500 leading-7.5"
                    dangerouslySetInnerHTML={{ __html: formatChopai(intro) }}
                  />
                </div>
              )}

              {/* RESULTS */}
              {!isIdle && (
                <div className="space-y-4">
                  {results.map((r, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      className={`p-4 border rounded-3xl bg-white ${i === index ? "border-2 border-orange-600" : ""
                        }`}
                    >
                      <h3 className="font-bold text-orange-600 mb-2">चोपाई:</h3>
                      <p className="text-xl border-b pb-3 whitespace-pre-line leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlight(formatChopai(r.chopai), query),
                        }}
                      />

                      {r.meaning && (
                        <>
                          <h3 className="font-bold mt-2 text-orange-600 mb-2">भावार्थ:</h3>
                          <p
                            className="whitespace-pre-line text-base font-poppins text-gray-500 leading-7.5"
                            dangerouslySetInnerHTML={{
                              __html: highlight(r.meaning, query),
                            }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}