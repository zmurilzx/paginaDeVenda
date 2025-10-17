"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileOnlyWrapper({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // 🔒 Bloqueia domínios clonados
    const allowedDomain = "cinestream2k.site";
    if (window.location.hostname !== allowedDomain) {
      window.location.href = `https://${allowedDomain}`;
      return;
    }

    // 📱 Permite apenas acesso via celular
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      router.push("/mobile-only");
    } else {
      setAllowed(true);
    }

    // 🚫 Bloqueia cliques, cópias e atalhos
    const blockActions = (e) => e.preventDefault();
    document.addEventListener("contextmenu", blockActions);
    document.addEventListener("copy", blockActions);
    document.addEventListener("cut", blockActions);
    document.addEventListener("selectstart", blockActions);

    // 🔐 Bloqueia atalhos (Ctrl+U, Ctrl+S, Ctrl+C, F12)
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          ["u", "s", "c", "a", "x", "p"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener("contextmenu", blockActions);
      document.removeEventListener("copy", blockActions);
      document.removeEventListener("cut", blockActions);
      document.removeEventListener("selectstart", blockActions);
    };
  }, [router]);

  return allowed ? <>{children}</> : null;
}
