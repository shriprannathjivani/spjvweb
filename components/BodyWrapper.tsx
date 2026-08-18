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

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="font-arya">{children}</div>;
  }

  // Normalize pathname for case-insensitive checks
  const currentPath = pathname.toLowerCase();

  // Special pages where Header/Footer should be hidden
  const isNoHF =
    currentPath.includes("/shrijiworld") ||
    currentPath.includes("/khadokali");

  // Specific background pages
  const isHome = currentPath === "/";
  const isSatguru = currentPath.startsWith("/satguru");
  const isContact = currentPath.startsWith("/contact");
  const isGame = currentPath.startsWith("/gamesnquiz");
  const isMandirseva = currentPath.startsWith("/mandirseva");
  const isBalkendra = currentPath.startsWith("/balkendra");
  const isTemples = currentPath.startsWith("/temples");
  const islogin = currentPath.startsWith("/login");

  // Any page that doesn't have its own background
  const isInner =
    !isHome &&
    !isSatguru &&
    !isContact &&
    !isMandirseva &&
    !isGame &&
    !isBalkendra &&
    !isTemples &&
    !islogin &&
    !isNoHF;

  const bodyClass = clsx(
    "font-arya",

    // Background classes
    {
      "hero-bg": isHome,
      "satguru-bg": isSatguru,
      "contact-bg": isContact,
      "temple-bg": isMandirseva,
      "game-bg": isGame,
      "balkendra-bg": isBalkendra,
      "temples-bg": isTemples,
      "login-bg":islogin,
      "inner-bg": isInner,

      // Header/Footer hidden
      "no-HF": isNoHF,
    }
  );

  return <div className={bodyClass}>{children}</div>;
}