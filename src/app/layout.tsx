import type { Metadata } from "next";
import { Cairo, Amiri, Caveat, Special_Elite, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeLangProvider } from "@/lib/ThemeLangContext";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const specialElite = Special_Elite({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ENSB Library | مكتبة المدرسة العليا للأساتذة ببوزريعة — Adam Ameyoud",
  description:
    "Retro academic library and past exam archive for the students of École Normale Supérieure de Bouzaréah (ENSB). Designed by Adam Ameyoud.",
  icons: {
    icon: "/ensb-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${cairo.variable} ${amiri.variable} ${caveat.variable} ${specialElite.variable} ${plusJakarta.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('ensb_theme');
                  var isDark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-[#0D7A3E] selection:text-white">
        <ThemeLangProvider>{children}</ThemeLangProvider>
      </body>
    </html>
  );
}
