import "./globals.css";

import { Inter } from "next/font/google";
import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { Search } from "lucide-react";

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
    <div>
      <div className="flex flex-wrap flex-row w-full h-full ">
        <PrismicNextLink
          href="/"
          className="text-lg  text-white tracking-tight pl-5 lg:pl-60 py-5 pr-5 bg-blue-600"
        >
          <PrismicRichText field={settings.data.siteTitle} />
        </PrismicNextLink>
        <div className=" flex items-center justify-center bg-slate-100">
          <Search strokeWidth={1.75} color="#8c8787" className=" space-x-reverse h-full self-center mx-4" />
        </div>
        <nav className="flex items-center justify-center pl-4">
          <ul className="flex flex-wrap items-center gap-6 md:gap-12">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className=" self-center  text-slate-400"
              >
                <PrismicNextLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-6 md:gap-12">
            {categories.map((category) => (
              <li
                key={category.id}
                className=" self-center  text-slate-300"
              >
                  <p>{category.data.name}</p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
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
