import type { Metadata } from "next";
import "./globals.css";

// Using localFont or fallback to system fonts for environments without internet access
const inter = { variable: "--font-inter" };
const ibmPlexSerif = { variable: "--font-ibm-plex-serif" };

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking platform for everyone.",
  icons:{
   icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
