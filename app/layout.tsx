import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {NextAuthProvider} from "./providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "be my valentine",
  description: "be my valentine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
