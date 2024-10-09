"use client";

import QueryProvider from "@/components/Providers/QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
