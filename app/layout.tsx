import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/modules/Header/Header";
import Footer from "@/modules/Footer/Footer";
import BootstrapClient from "@/shared/BootstrapClient/BootstrapClient";

import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather and Forecast",
  description: "Test work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <BootstrapClient />
    </html>
  );
}
