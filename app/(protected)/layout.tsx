"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [status, setStatus] = useState<
    "loading" | "allowed" | "denied"
  >("loading");

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");

    if (justLoggedIn) {
      setShowLoader(true);
      sessionStorage.removeItem("justLoggedIn");
    }

    const auth = sessionStorage.getItem("auth");
    const expiry = sessionStorage.getItem("expiry");

    if (!auth || !expiry || Date.now() > Number(expiry)) {
      sessionStorage.clear();
      setStatus("denied");

      router.replace("/login");
    } else {
      setStatus("allowed");
    }
  }, []);

  // 🚫 back button block
  useEffect(() => {
    if (status !== "allowed") return;

    window.history.pushState(null, "", window.location.href);

    window.onpopstate = () => {
      window.history.go(1);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [status]);

  // 🎬 CONDITIONAL LOADER
  if (showLoader && status === "loading") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4" />
        <p className="text-gray-600 text-sm">
          स्वागत है...
        </p>
      </div>
    );
  }

  if (status === "denied") return null;

  if (status === "allowed") return <>{children}</>;

  return null;
}