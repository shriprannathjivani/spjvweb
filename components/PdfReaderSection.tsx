"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, Download, Share2, ZoomIn, ZoomOut } from "lucide-react";
const basePath =
  process.env.NODE_ENV === "production" ? "/spjvweb" : "";
// ✅ Dynamically import only components (SSR disabled)
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);

type Props = {
  pdfUrl: string;
  title?: string;
  storageKey: string;
};

export default function PdfSection({
  pdfUrl,
  title = "PDF Reader",
  storageKey,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Set worker only on client
  useEffect(() => {
    async function setupWorker() {
      const { pdfjs } = await import("react-pdf");
      pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.mjs`;
    }
    setupWorker();
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Restore page
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setPageNumber(Number(saved));
  }, [storageKey]);

  // ✅ Progress + Save page
  useEffect(() => {
    if (!numPages) return;
    const percent = Math.round((pageNumber / numPages) * 100);
    setProgress(percent);
    localStorage.setItem(storageKey, String(pageNumber));
  }, [pageNumber, numPages, storageKey]);


  return (
    <section className="max-w-4xl mx-auto mt-[-50] relative">
      <div className="sticky top-16 sm:top-20 left-0 right-0 flex justify-center z-50 px-3 pointer-events-none">

        <div className="
            pointer-events-auto 
            bg-white 
            rounded-full 
            px-3 sm:px-6 
            py-2 sm:py-3 
            flex items-center 
            gap-3 sm:gap-5 
            border 
            shadow-sm
            max-w-full
            overflow-x-auto
          ">
          {/* Progress */}
          <div className="h-1.5 sm:h-2 w-16 sm:w-20 bg-orange-100 rounded-3xl shrink-0">
            <div
              className="h-full bg-orange-500 transition-all duration-300 rounded-3xl"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Prev */}
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            className="hover:text-orange-500 cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Page Counter */}
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
            {pageNumber} / {numPages}
          </span>

          {/* Next */}
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            className="hover:text-orange-500 cursor-pointer shrink-0"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="hidden sm:block h-6 w-px bg-gray-300" />

          {/* Zoom In */}
          <button
            onClick={() => setScale((s) => Math.min(3, s + 0.1))}
            className="hover:text-orange-500 cursor-pointer shrink-0"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="hover:text-orange-500 cursor-pointer shrink-0"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="hidden sm:block h-6 w-px bg-gray-300" />

          {/* Download */}
          <a href={pdfUrl} download className="shrink-0">
            <Download className="hover:text-orange-500 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          {/* Share */}
          <button
            onClick={() =>
              navigator.share?.({ title: "PDF", url: window.location.href })
            }
            className="shrink-0"
          >
            <Share2 className="hover:text-orange-500 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </div>

      {/* PDF */}
      <div className="flex justify-center p-6 ">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }: any) =>
            setNumPages(numPages)
          }
        >
          <Page pageNumber={pageNumber} width={isMobile ? 320 : 700} scale={scale} />
        </Document>
      </div>
    </section>
  );
}