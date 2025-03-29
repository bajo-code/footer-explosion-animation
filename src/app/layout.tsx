import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";


const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Footer Explosion Animation",
  description: "by bajo-code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={courierPrime.variable}>
        {children}
      </body>
    </html>
  );
}