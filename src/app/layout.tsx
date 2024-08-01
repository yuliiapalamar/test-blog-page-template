import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (
    <div>
      <div className="flex flex-wrap justify-between w-full h-full ">
        <PrismicNextLink
          href="/"
          className="text-3xl font-semibold text-white tracking-tight pl-5 lg:pl-72 py-7 pr-5 bg-blue-600"
        >
          <PrismicText field={settings.data.siteTitle} />
        </PrismicNextLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className="font-semibold tracking-tight self-center text-slate-800"
              >
                <PrismicNextLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
