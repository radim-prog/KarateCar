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
  metadataBase: new URL("https://karatecar.zajcon.cz"),
  title: "Plán mobility | SHIN-KYO Rychnov",
  description:
    "Pracovní dashboard pro získání 9místného auta pro karate oddíl SHIN-KYO z Rychnova nad Kněžnou.",
  openGraph: {
    title: "Plán mobility | SHIN-KYO Rychnov",
    description:
      "Jak získat 9místné auto pro výjezdy karate oddílu — strategie, kalkulačka a podklady pro partnery.",
    url: "https://karatecar.zajcon.cz",
    siteName: "SHIN-KYO Rychnov",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Plán mobility | SHIN-KYO Rychnov",
    description:
      "Jak získat 9místné auto pro výjezdy karate oddílu — strategie, kalkulačka a podklady.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
