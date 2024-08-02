"use client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { Ellipsis, Search } from "lucide-react";
import React, { useState } from "react";
import {
  CategoryDocument,
  NavigationDocument,
  SettingsDocument,
} from "../../prismicio-types";
import { asText } from "@prismicio/client";

type NavbarProps = {
  settings: SettingsDocument<string>;
  navigation: NavigationDocument<string>;
  categories: CategoryDocument<string>[];
};

export const Navbar = ({ settings, navigation, categories }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setMenuOpen(false); // Закрити меню після вибору
  };

  return (
    <div>
      <div className="flex  flex-row justify-between w-full h-full">
        <div className="flex flex-row items-center">
          <PrismicNextLink
            href="/"
            className="text-lg text-white cursor-pointer tracking-tight pl-5 lg:pl-[14vw] py-5 pr-5 bg-blue-600"
          >
            <PrismicRichText field={settings.data.siteTitle} />
          </PrismicNextLink>
          <div className="flex items-center justify-center cursor-pointer bg-slate-100">
            <Search
              strokeWidth={1.75}
              color="#8c8787"
              className="space-x-reverse h-full self-center mx-4"
            />
          </div>
          <ul className="flex text-xs lg:text-sm items-center gap-3 md:gap-5">
            {navigation.data?.links.map((item) => (
              <li
                key={asText(item.label)}
                className="self-center cursor-pointer text-slate-400"
              >
                <PrismicNextLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex items-center justify-center pl-1 pr-5 lg:pr-[14vw]">
          <ul className={`flex items-center text-sm h-full text-slate-400 gap-5`}>
            {categories.map((category) => (
              <li
                key={category.id}
                    className={` hidden lg:flex self-center cursor-pointer h-full  items-center justify-center text-slate-700 hover:text-blue-500 transition duration-300 
                    ${
                  selectedCategory === category.id
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <p>{category.data.name}</p>
              </li>
            ))}
            <li className="self-center cursor-pointer" onClick={toggleMenu}>
              <Ellipsis color="#334155" />
            </li>
          </ul>
        </nav>
      </div>
      {menuOpen && (
        <div className="absolute z-10 mt-2  shadow-lg rounded-lg w-full lg:hidden">
          <ul className="flex flex-col text-sm items-center ">
            {categories.map((category) => (
              <li
                key={category.id}
                className={` cursor-pointer hover:bg-blue-500 text-slate-700 transition duration-300 p-2 w-full text-center ${
                  selectedCategory === category.id
                    ? "border-l-4 border-blue-500 bg-blue-500 text-blue-500"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.data.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
