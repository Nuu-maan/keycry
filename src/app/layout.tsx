import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyCry - Typing Speed Test",
  description: "Test and improve your typing speed with KeyCry. A minimalist typing test app to measure your WPM and accuracy.",
  keywords: ["typing test", "typing speed", "wpm", "words per minute", "keyboard test", "typing practice"],
  authors: [{ name: "KeyCry" }],
  openGraph: {
    title: "KeyCry - Typing Speed Test",
    description: "Test and improve your typing speed with KeyCry",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyCry - Typing Speed Test",
    description: "Test and improve your typing speed with KeyCry",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1e1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}