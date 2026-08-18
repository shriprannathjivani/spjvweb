"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Searching from "@/public/Searching.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  CircleChevronLeft,
  Search,
  X,
  Book,
  Bookmark,
  BookMarked,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* ---------------- TYPES ---------------- */
type ChaupaiItem = {
  id: number;
  sortOrder: number;
  title: string;
  meaning: string;
  prakaranID: number;
  prakaranName: string;
  bookID: number;
  bookName: string;
};

type PrakaranGroup = {
  prakaranID: number;
  prakaranName: string;
  bookName: string;
  items: ChaupaiItem[];
};

const basePath = process.env.NODE_ENV === "production" ? "/spjvweb" : "";

/* ---------------- DIGIT HELPERS ---------------- */
const DEVANAGARI = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const ARABIC = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const digitMap: Record<string, string> = {};
DEVANAGARI.forEach((d, i) => (digitMap[d] = ARABIC[i]));

const normalizeDigits = (str: string) =>
  str ? str.replace(/[०-९]/g, (d) => digitMap[d] || d) : "";

/* ---------------- FORMATTING HELPERS ---------------- */
function formatChopai(text: string) {
  if (!text) return "";
  const parts = text.split("।");
  if (parts.length >= 2) {
    return parts[0] + "।<br/>" + parts.slice(1).join("।");
  }
  return text;
}

function formatChopaiListing(text: string) {
  if (!text) return "";
  const index = text.indexOf("।");
  let result = index !== -1 ? text.slice(0, index + 1) : text;
  return result.replace(/[,\u0964]/g, "").trim();
}

/* ---------------- HIGHLIGHT ---------------- */
const highlight = (text: string, q: string) => {
  if (!q || !text) return text;
  const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escapedQ, "gi");
  return text.replace(re, (m) => `<mark class="bg-yellow-300">${m}</mark>`);
};

/* ---------------- INDIVIDUAL CARD COMPONENT ---------------- */
function ChaupaiCard({
  item,
  index,
  selectedIndex,
  query,
  refCallback,
  showAllMeanings,
}: {
  item: ChaupaiItem;
  index: number;
  selectedIndex: number;
  query: string;
  refCallback: (el: HTMLDivElement | null) => void;
  showAllMeanings: boolean;
}) {
  const [showMeaning, setShowMeaning] = useState(showAllMeanings);

  useEffect(() => {
    setShowMeaning(showAllMeanings);
  }, [showAllMeanings]);

  return (
    <div
      ref={refCallback}
      className={`p-4 border rounded-3xl bg-white transition-all ${
        index === selectedIndex ? "border-2 border-orange-600 shadow-md" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-orange-600">चौपाई:</h3>
        <div className="flex items-center gap-2">
          {item.meaning && (
            <button
              onClick={() => setShowMeaning((prev) => !prev)}
              className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium"
            >
              {showMeaning ? (
                <>
                  <EyeOff size={13} />
                  भावार्थ छिपाएँ
                </>
              ) : (
                <>
                  <Eye size={13} />
                  भावार्थ देखें
                </>
              )}
            </button>
          )}

          {item.sortOrder && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              #{item.sortOrder}
            </span>
          )}
        </div>
      </div>

      <p
        className="text-xl border-b pb-3 leading-normal text-gray-800"
        dangerouslySetInnerHTML={{
          __html: highlight(formatChopai(item.title), query),
        }}
      />

      {item.meaning && showMeaning && (
        <div className="mt-3 bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100/60 transition-all">
          <h3 className="font-bold text-orange-600 mb-1.5 text-sm flex items-center gap-1">
            <Bookmark size={14} /> भावार्थ:
          </h3>
          <p className="whitespace-pre-line text-base font-poppins text-gray-700 leading-relaxed">
            {item.meaning}
          </p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2 items-center text-xs">
        {item.bookName && (
          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-full border border-orange-200 font-medium">
            <Book size={12} />
            पुस्तक: {item.bookName}
          </span>
        )}

        {item.prakaranName && (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200 font-medium">
            <Bookmark size={12} />
            प्रकरण: {formatChopaiListing(item.prakaranName)}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function Page() {
  const [allChaupais, setAllChaupais] = useState<ChaupaiItem[]>([]);
  const [chapters, setChapters] = useState<PrakaranGroup[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("ALL");
  const [results, setResults] = useState<ChaupaiItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [index, setIndex] = useState(-1);

  const [showAllMeanings, setShowAllMeanings] = useState(false);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isIdle = results.length === 0 && !activeQuery && activeChapter === null;
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

  /* LOAD DATA */
  useEffect(() => {
    fetch(`${basePath}/allvani/allinonechaupais.json`)
      .then((r) => r.json())
      .then((data: ChaupaiItem[]) => {
        setAllChaupais(data);

        const chapterMap = new Map<number, PrakaranGroup>();

        data.forEach((item) => {
          if (!chapterMap.has(item.prakaranID)) {
            chapterMap.set(item.prakaranID, {
              prakaranID: item.prakaranID,
              prakaranName: item.prakaranName,
              bookName: item.bookName,
              items: [],
            });
          }
          chapterMap.get(item.prakaranID)!.items.push(item);
        });

        const groupedChapters = Array.from(chapterMap.values()).map((chap) => ({
          ...chap,
          items: chap.items.sort((a, b) => a.sortOrder - b.sortOrder),
        }));

        setChapters(groupedChapters);
      })
      .catch((err) => {
        console.error("LOAD FAILED", err);
      });
  }, []);

  /* UNIQUE BOOKS LIST */
  const uniqueBooks = useMemo(() => {
    return Array.from(new Set(chapters.map((c) => c.bookName))).filter(Boolean);
  }, [chapters]);

  /* SCROLL TO INDEX */
  useEffect(() => {
    if (index >= 0 && itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  /* CORE FILTER FUNCTION */
  const runFilter = (searchQuery: string, bookName: string) => {
    const nq = normalizeDigits(searchQuery.toLowerCase().trim());

    if (!nq) {
      setResults([]);
      setIndex(-1);
      return;
    }

    const pool =
      bookName === "ALL"
        ? allChaupais
        : allChaupais.filter((b) => b.bookName === bookName);

    const filtered = pool.filter((b) => {
      const c = normalizeDigits((b.title || "").toLowerCase());
      return c.includes(nq);
    });

    setResults(filtered);
    setIndex(filtered.length ? 0 : -1);
  };

  /* SEARCH ACTION */
  const performSearch = () => {
    if (!query.trim()) return;
    setActiveQuery(query);
    runFilter(query, selectedBook);
    setActiveChapter(null);
  };

  /* CLEAR SEARCH (RESETS SEARCH & BOOK SELECTION TO ALL) */
  const clearSearch = () => {
    setQuery("");
    setActiveQuery("");
    setResults([]);
    setIndex(-1);
    setActiveChapter(null);
    setSelectedBook("ALL"); // पुस्तक फ़िल्टर को 'ALL' पर रीसेट करता है
    itemRefs.current = [];
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* SELECT BOOK: ACT AS FILTER CONTEXT ONLY */
  const handleSelectBook = (book: string) => {
    setSelectedBook(book);
    setIsMenuOpen(false);

    if (activeQuery.trim()) {
      runFilter(activeQuery, book);
    } else {
      setResults([]);
      setIndex(-1);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 pt-20">
        {/* DASHBOARD NAV */}
        <div className="max-w-7xl mx-auto px-6 py-6 pb-0">
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
                <BreadcrumbLink>संपूर्ण श्री तारतम वाणी — खोज</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* STICKY SEARCH HEADER */}
        <div
          className={clsx(
            "max-w-7xl mx-auto sm:px-6 sm:py-6 pt-0 sticky z-20 transition-all duration-300 ease-in-out",
            scrolled ? "sticky top-0 z-60 sm:top-12" : "px-0 py-0"
          )}
        >
          <div
            className={clsx(
              "flex flex-col-reverse md:flex-row md:items-center gap-1 sm:gap-8 p-4 py-2 sm:py-4 transition-all duration-300 ease-in-out",
              scrolled
                ? "rounded-0 bg-white-200/25 text-black backdrop-blur-xl rounded-b-2xl shadow-4xl border border-white/70 p-6"
                : "sm:rounded-3xl"
            )}
          >
            {/* LEFT TITLE */}
            <div className="shrink-0">
              <h2 className="text-base md:text-3xl font-semibold text-gray-900 sm:flex hidden">
                संपूर्ण श्री तारतम वाणी — खोज
              </h2>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-between sm:mt-0 mt-2 gap-2">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger className="md:hidden flex gap-2 text-sm bg-white border px-3 py-2 rounded-xl">
                  <BookOpenText size={18} /> पुस्तकें
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle className="p-2 flex flex-col gap-2">
                      <span>📖 पुस्तकें ({uniqueBooks.length})</span>
                    </SheetTitle>
                    <div className="flex flex-col gap-1.5 p-2 overflow-y-auto max-h-[70vh]">
                      <button
                        onClick={() => handleSelectBook("ALL")}
                        className={`text-sm p-3 rounded-xl text-left transition-all ${
                          selectedBook === "ALL"
                            ? "bg-orange-600 text-white font-medium"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        सभी पुस्तकें
                      </button>
                      {uniqueBooks.map((book, idx) => (
                        <button
                          key={book}
                          onClick={() => handleSelectBook(book)}
                          className={`text-sm p-3 rounded-xl text-left transition-all ${
                            selectedBook === book
                              ? "bg-orange-600 text-white font-medium"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {idx + 1}. {book}
                        </button>
                      ))}
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              {results.length > 0 && (
                <div className="shrink-0 flex items-center gap-2">
                  <div className="flex gap-2 bg-white p-2 rounded-full text-base border border-gray-100">
                    <button
                      onClick={() =>
                        setIndex((i) => (i - 1 + results.length) % results.length)
                      }
                    >
                      <ChevronLeft
                        className="rounded-full bg-yellow-400 p-1 border-2 border-black cursor-pointer hover:scale-[1.1] duration-500"
                        size={30}
                      />
                    </button>
                    <span className="leading-7.5">
                      {index >= 0 ? index + 1 : 0} / {results.length}
                    </span>
                    <button
                      onClick={() => setIndex((i) => (i + 1) % results.length)}
                    >
                      <ChevronRight
                        className="rounded-full bg-yellow-400 p-1 border-2 border-black cursor-pointer hover:scale-[1.1] duration-500"
                        size={30}
                      />
                    </button>
                    <button onClick={clearSearch}>
                      <X
                        className="rounded-full bg-red-600 border-2 border-black p-1 text-white hover:text-white hover:bg-red-400 text-base hover:scale-[1.1] duration-500 cursor-pointer"
                        size={30}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SEARCH INPUT */}
            <div className="flex-1 w-full">
              <div className="flex flex-row md:flex-row items-center gap-2 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-3 text-orange-600" />
                  <input
                    id="search-input"
                    name="khimji-search"
                    className="border p-3 w-full rounded-full pl-10 pr-10 text-base bg-white"
                    value={query}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuery(val);
                      if (!val) {
                        clearSearch();
                      }
                    }}
                    onKeyDown={(e) => e.key === "Enter" && performSearch()}
                    placeholder={
                      selectedBook === "ALL"
                        ? "चौपाई में शब्द खोजें..."
                        : `"${selectedBook}" में शब्द खोजें...`
                    }
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2.5 top-2 bg-red-600 border-2 border-black p-2 rounded-full text-white hover:text-white hover:bg-red-400 text-base cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
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

        {/* CONTENT AREA */}
        <div className="max-w-7xl mx-auto pb-16 px-2 sm:px-6">
          <div className="flex sm:flex-row flex-col py-2 sm:py-4 gap-4">
            
            {/* DESKTOP SIDEBAR - DIRECT BOOKS LISTING ONLY */}
            <div className="w-70 hidden lg:block shrink-0">
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col p-3.5">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm pb-3 border-b mb-3">
                  <Book size={16} className="text-orange-600" />
                  पुस्तकें ({uniqueBooks.length}):
                </h2>

                <div className="flex flex-col gap-1.5">
                  <div
                    onClick={() => handleSelectBook("ALL")}
                    className={`text-base p-2.5 rounded-xl border cursor-pointer font-medium transition-all flex justify-between items-center ${
                      selectedBook === "ALL"
                        ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <span>सभी पुस्तकें</span>
                    <span className="text-[10px] opacity-80">({allChaupais.length})</span>
                  </div>

                  {uniqueBooks.map((book, idx) => {
                    const isBookActive = selectedBook === book;
                    return (
                      <div
                        key={book}
                        onClick={() => handleSelectBook(book)}
                        className={`text-base p-2.5 rounded-xl border cursor-pointer font-medium transition-all flex items-center justify-between ${
                          isBookActive
                            ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        <span className="line-clamp-1">{idx + 1}. {book}</span>
                        <BookMarked
                          size={12}
                          className={isBookActive ? "text-white" : "text-gray-400"}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 relative">
              {isIdle && (
                <div className="flex flex-col items-center justify-center text-center sm:py-20 py-6 sm:px-0 px-4 text-gray-500 bg-white rounded-3xl border border-gray-100">
                  <Lottie
                    animationData={Searching}
                    loop={true}
                    className="w-full sm:w-100 h-60"
                  />
                  <h2 className="text-xl font-semibold mb-2 text-orange-600">
                    {selectedBook === "ALL"
                      ? "चौपाई खोजने के लिए शब्द टाइप करें"
                      : `फ़िल्टर लागू: "${selectedBook}"`}
                  </h2>
                  <p className="max-w-md text-gray-500 text-sm md:text-base font-poppins">
                    {selectedBook === "ALL"
                      ? "सभी पुस्तकों में खोजने के लिए ऊपर सर्च बॉक्स में शब्द लिखें।"
                      : `अब सर्च करने पर केवल "${selectedBook}" पुस्तक के अंदर ही परिणाम दिखाई देंगे।`}
                  </p>
                </div>
              )}

              {/* RESULTS LIST */}
              {!isIdle && (
                <div className="space-y-4">
                  {/* GLOBAL TOGGLE BAR FOR MEANINGS */}
                  <div className="bg-white p-3 px-4 rounded-2xl border border-gray-100 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">
                      {selectedBook !== "ALL" && (
                        <span className="text-orange-600 font-bold mr-1">
                          [{selectedBook}]
                        </span>
                      )}
                      कुल चौपाइयाँ: {results.length}
                    </span>
                    {results.length > 0 && (
                      <button
                        onClick={() => setShowAllMeanings((prev) => !prev)}
                        className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                      >
                        {showAllMeanings ? (
                          <>
                            <EyeOff size={14} /> सभी भावार्थ छिपाएँ
                          </>
                        ) : (
                          <>
                            <Eye size={14} /> सभी भावार्थ दिखाएँ
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {results.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-3xl border text-gray-500">
                      "{activeQuery}" शब्द {selectedBook !== "ALL" ? `"${selectedBook}" पुस्तक` : "किसी भी पुस्तक"} में नहीं मिला।
                    </div>
                  ) : (
                    results.map((r, i) => (
                      <ChaupaiCard
                        key={r.id || i}
                        item={r}
                        index={i}
                        selectedIndex={index}
                        query={activeQuery}
                        refCallback={(el) => (itemRefs.current[i] = el)}
                        showAllMeanings={showAllMeanings}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}