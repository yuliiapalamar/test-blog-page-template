import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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
        <Footer />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");
  const categories = await client.getAllByType("category");

  console.log(categories);

  return (
    <Navbar settings={settings} navigation={navigation} categories={categories} />
  );
}

async function Footer() {
  const client = createClient();
  const footer = await client.getSingle("footer");

  return (
    <Bounded as="footer" yPadding="lg">
      <div className="flex flex-col items-center justify-center">
        <PrismicRichText
          field={footer.data.text}
          components={{
            paragraph: ({ children }) => (
              <p className="text-center text-[18px] leading-[36px] text-[#a7acbc] font-light font-[Proxima Nova]">
                {children}
              </p>
            ),
          }}
        />
      </div>
    </Bounded>
  );
}
