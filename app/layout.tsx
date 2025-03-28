import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, Pinyon_Script} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300"]
})
const pinyon_script = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: ["400"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${pinyon_script.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
