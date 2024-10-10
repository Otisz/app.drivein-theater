import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/query-provider";
import SessionProvider from "@/providers/session-provider";
import ThemeProvider from "@/providers/theme-provider";
import { Loader2Icon } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Drive-in Theater",
  description: "Drive-in Theater",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SessionProvider>
            <QueryProvider>
              <Navbar />
              {children}
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
        <Toaster
          richColors
          pauseWhenPageIsHidden
          visibleToasts={6}
          closeButton={true}
          icons={{ loading: <Loader2Icon className="size-5 animate-spin" /> }}
        />
      </body>
    </html>
  );
}
