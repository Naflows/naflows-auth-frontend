import type { Metadata } from "next";

const metadata: Metadata = {
 title: "NASS - Naflows' Authentication Service System",
  description: "Access your NASS account and manage your services with Naflows' Authentication Service System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
