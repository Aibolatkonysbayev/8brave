import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "8Brave | Skill Assessment Platform",
  description:
    "8Brave helps engineers get a clear, objective signal of readiness for their next role in 25 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
