"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { CircleChevronLeft } from "lucide-react"

const labelMap: Record<string, string> = {
  contact: "संपर्क करें",
  granth: "ग्रंथ",
  tartam: "तारतम",
  gyanbhandar: "ज्ञान भंडार",
  article: "ई-मंथन लेखन",
  book: "पुस्तकालय",
  brahmavani: "ब्रह्मवाणी",
  quiz: "गूगल क्विज़",
  faq: "प्रश्नोत्तर",
  privacypolicy: "नियम व शर्तें",
  satguru: "सतगुरु व परमहंस",
}

export default function DynamicBreadcrumb({
  currentTitle,
}: {
  currentTitle?: string
}) {
  const pathname = usePathname()
  const hiddenSegments = new Set(["book", "article", "quiz"])

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !hiddenSegments.has(segment))

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="flex items-center text-orange-600 text-base"
            >
              <CircleChevronLeft className="me-2" size={16} />
              होम पर वापस
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const isLast = index === segments.length - 1

          const label = isLast && currentTitle
            ? currentTitle                      // ✅ replace "1"
            : labelMap[segment] ?? segment.replace(/-/g, " ")

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-base font-medium line-clamp-1 max-w-[240px]">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="text-base">
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}