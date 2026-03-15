import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppShell } from "./components/app-shell";
import { ThemeProvider } from "./components/theme-provider";

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
    <html lang="cs" suppressHydrationWarning>
      <body className={outfit.variable}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
