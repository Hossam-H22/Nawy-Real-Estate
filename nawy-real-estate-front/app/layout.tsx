import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";



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
        <Toaster />
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
