import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/app-shell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Plán mobility | SHIN-KYO Rychnov",
  description:
    "Pracovní dashboard pro získání 9místného auta pro karate oddíl SHIN-KYO z Rychnova nad Kněžnou.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={outfit.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
