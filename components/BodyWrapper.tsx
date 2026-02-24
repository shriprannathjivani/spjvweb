"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // prevent hydration mismatch
    return <div className="font-arya">{children}</div>;
  }

  const bodyClass = clsx("font-arya", {
    "hero-bg": pathname === "/",
    "satguru-bg": pathname.startsWith("/satguru"),
    "contact-bg": pathname === "/contact",
    "karyakram-bg": pathname.startsWith("/karyakram"),
    "balkendra-bg": pathname.startsWith("/balkendra"),
    "temples-bg": pathname.startsWith("/temples"),
    "inner-bg":
      pathname !== "/" &&
      !pathname.startsWith("/satguru") &&
      !pathname.startsWith("/gyan-bhandar") &&
      pathname !== "/contact",
  });

  return <div className={bodyClass}>{children}</div>;
}
