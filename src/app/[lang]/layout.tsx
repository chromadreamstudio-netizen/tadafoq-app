import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { Locale } from "@/i18n-config";

const cairo = Cairo({ 
  subsets: ["latin", "arabic"],
  weight: ['400', '500', '600', '700', '800', '900'] 
});

export const metadata: Metadata = {
  title: "تدفق - Tadafoq",
  description: "المنصة الأولى الموثوقة لتسييل المستحقات التجارية.",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body className={cairo.className}>{children}</body>
    </html>
  );
}