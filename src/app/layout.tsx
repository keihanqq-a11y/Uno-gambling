import type { Metadata } from "next";
import { Oxanium, Sora } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UnoX — Premium UNO & Casino Arena",
  description:
    "UnoX is a futuristic premium gaming platform with multiplayer UNO, casino games, crypto wallet, VIP rewards, and immersive animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
