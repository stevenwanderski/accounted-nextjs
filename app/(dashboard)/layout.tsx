import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import UserNav from "./user-nav";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Accounted | Budgeting App",
  description: "Always have enough money in your bank accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-[family-name:var(--font-geist-sans)]`}>
        <UserNav />
        {children}
      </body>
    </html>
  );
}
