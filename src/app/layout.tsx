import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "A dark, no-nonsense workout library and daily plan tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fitlog">
      <body>
        <WorkoutProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 2400 }} />
        </WorkoutProvider>
      </body>
    </html>
  );
}
