import React from "react";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import { formatDate } from "@/utils/dateFormatter";

type ArticleCardSmallProps = {
  article: any;
  author: any;
  category: any;
};

const ArticleCardSmall = ({
  article,
  author,
  category,
}: ArticleCardSmallProps) => {
  return (
    <article className=" overflow-hidden w-full max-w-[370px] lg:max-w-[580px] transition-shadow duration-300 ease-in-out hover:shadow-sm cursor-pointer focus:shadow-lg">
      <div className="relative">
        <PrismicNextImage
          field={article.data.image}
          className="w-full max-w-[580px] h-56 object-cover"
        />
        {category && (
          <span
            className="absolute bottom-4 text-white text-xs pl-3 pr-2 py-1"
            style={{ backgroundColor: category.data.color || "blue" }}
          >
            {category.data.name || "No Category"}
          </span>
        )}
      </div>
      <div className="p-6 pl-0 flex flex-col justify-start items-start">
        <h3 className="text-base lg:text-xl  text-wrap mb-2">
          {article.data.title || "No Title"}
        </h3>
        <div className="flex flex-row ">
          <p className="text-gray-300 text-xs self-center ">
            {formatDate(article.data.publish_date || "")}
          </p>
          <div className="mx-3 w-px bg-gray-300 my-1" />
          {author && (
            <p className="underline text-xs text-blue-400 self-center">
              {author.data.name || "No Name"}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleCardSmall;
