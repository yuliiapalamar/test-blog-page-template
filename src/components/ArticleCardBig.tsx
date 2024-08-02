import React from "react";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormatter";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink, PrismicText } from "@prismicio/react";

type CarouselItemProps = {
  article: any;
};

const ArticleCardBig = ({ article }: CarouselItemProps) => {
  return (
    <div className="relative w-full h-full min-h-80 flex items-center justify-center cursor-pointer">
      {/* Image */}
      <Image
        src={article.article.data.image.url}
        alt={article.article.data.image.alt}
        layout="fill"
        className="object-cover  transition-shadow duration-300 ease-in-out hover:shadow-sm focus:shadow-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center mt-20 p-6 max-w-2xl">
        <PrismicLink document={article.article}>
          <h3 className="text-md lg:text-2xl font-medium ">
            {article.article.data.title}
          </h3>
          <div className="text-xs lg:text-sm mb-4">
            <PrismicText field={article.article.data.description} />
          </div>
        </PrismicLink>
      </div>
      {article.category && (
        <span
          className="absolute bottom-11 left-0 text-white text-xs pl-3 pr-2 py-1"
          style={{ backgroundColor: article.category.data.color || "blue" }}
        >
          {article.category.data.name || "No Category"}
        </span>
      )}

      {/* Author and Date */}
      <div className="absolute bottom-12 right-5 z-10 text-white text-sm">
        <div className="flex flex-row ">
          <p className="text-gray-300 text-xs self-center ">
            {formatDate(article.article.data.publication_date || "")}
          </p>
          <div className="mx-3 w-px bg-gray-300 my-1" />
          {article.author && (
            <p className="underline text-xs text-blue-400 self-center">
              {article.author.data.name || "No Name"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCardBig;
