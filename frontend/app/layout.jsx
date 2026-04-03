import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/components/shared/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Trigr | Automatic Income Protection for India's Gig Economy",
  description:
    "Parametric income insurance for delivery workers. Automatic payouts when floods, pollution, or curfews stop your work - no claims, no paperwork.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-surface font-body text-on-surface antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
