import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import clsx from "clsx";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";
import { ourFileRouter } from "@/app/api/uploadthing/core";
const poppins = localFont({
  src: "./fonts/Poppins-Regular.woff",
  display: "swap",
});
const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.woff",
  display: "swap",
});
const poppinsMedium = localFont({
  src: "./fonts/Poppins-Medium.woff",
  display: "swap",
});
const poppinsSemiBold = localFont({
  src: "./fonts/Poppins-SemiBold.woff",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Attendance and Leave Management System",
  description: "Manage attendance and leave requests efficiently",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          poppins.className,
          poppinsBold.className,
          poppinsMedium.className,
          poppinsSemiBold.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
