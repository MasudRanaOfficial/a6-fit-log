import "./globals.css";
import { Toaster } from "react-hot-toast";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "FitLog — Workout Library & Gym Companion",
  description:
    "Track exercises, build your daily routine, and hit your fitness goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-[#0f1115] text-white flex flex-col min-h-screen">
        <WorkoutProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#161920",
                color: "#ffffff",
                border: "1px solid #262b36",
              },
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
