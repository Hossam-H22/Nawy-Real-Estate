import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";



export const metadata: Metadata = {
  title: "Home | Nawy",
  description: "Nawy Real Estate Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Navbar />
        <div className="container mx-auto">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
