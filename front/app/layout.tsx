import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SolutionsProvider } from "./contexts/SolutionsContext";
import { DepartmentsProvider } from "./contexts/DepartmentsContext";
import { QueryProvider } from "./providers/QueryProvider";
import LanguageWrapper from "./components/LanguageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIUNIVERS - L'avenir de l'intelligence artificielle",
  description: "AIUNIVERS - Pionnier de l'intelligence artificielle, créant l'avenir avec des solutions IA révolutionnaires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <LanguageProvider>
              <SolutionsProvider>
                <DepartmentsProvider>
                  <LanguageWrapper>
                    {children}
                  </LanguageWrapper>
                </DepartmentsProvider>
              </SolutionsProvider>
            </LanguageProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
