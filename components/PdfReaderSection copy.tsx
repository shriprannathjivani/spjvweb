"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [progress, setProgress] = useState(0);

  // ✅ Set worker only on client
  useEffect(() => {
    async function setupWorker() {
      const { pdfjs } = await import("react-pdf");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    }
    setupWorker();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setPageNumber(Number(saved));
  }, [storageKey]);

  useEffect(() => {
    if (!numPages) return;
    const percent = Math.round((pageNumber / numPages) * 100);
    setProgress(percent);
    localStorage.setItem(storageKey, String(pageNumber));
  }, [pageNumber, numPages, storageKey]);

  return (
    <section className="max-w-4xl mx-auto rounded-3xl border border-orange-200 bg-[#fff7f3] overflow-hidden shadow-lg">

      {/* Progress */}
      <div className="h-1 bg-orange-100">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-orange-200">
        <h2 className="text-lg font-semibold text-[#7a2f18]">
          {title}
        </h2>
      </div>

      {/* PDF */}
      <div className="flex justify-center p-6 bg-orange-50">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }: any) =>
            setNumPages(numPages)
          }
        >
          <Page pageNumber={pageNumber} width={700} />
        </Document>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-orange-200">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
          className="px-4 py-2 bg-orange-100 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {numPages}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
          className="px-4 py-2 bg-orange-100 rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}