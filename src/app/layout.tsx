import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/common/providers";

export const metadata: Metadata = {
  title: "StockSense - Smart Market Insights",
  description: "StockSense authentication and platform access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
