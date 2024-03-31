import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const IBMPlex = IBM_Plex_Sans({
   subsets: ["latin"],
   weight:['400','500','600','700'],
   variable: '--font-ibm-plex'
  });

export const metadata: Metadata = {
  title: "VINO-AI",
  description: "Just imagine, we will structure the reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: {colorPrimary: '#624cf8'}
    }}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialised, IBMPlex.variable")}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>

    </ClerkProvider>
  );
}
