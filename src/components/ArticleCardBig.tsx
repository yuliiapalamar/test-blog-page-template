import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils/dateFormatter';

type CarouselItemProps = {
    article: any;
    author: any;
    category: any;
}

const ArticleCardBig = ({ article, author, category }: CarouselItemProps) => {
  return (
    <div className="relative w-full h-full min-h-80 flex items-center justify-center cursor-pointer">
      {/* Image */}
      <Image
        src={article?.data.image?.url}
        alt={article?.data.image?.alt}
        layout="fill"
        className="object-cover  transition-shadow duration-300 ease-in-out hover:shadow-sm focus:shadow-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center mt-20 p-6 max-w-2xl">
    
        
        <h3 className="text-md lg:text-xl mb-4">
          {article?.data.title}
              </h3>
              <p className="text-xs lg:text-sm mb-4">
                  {article?.data.description}
                </p>
          </div>
      {category && (
          <span
            className="absolute bottom-11 left-0 text-white text-xs pl-3 pr-2 py-1"
            style={{ backgroundColor: category.data.color || "blue" }}
          >
            {category.data.name || "No Category"}
          </span>
        )}

      {/* Author and Date */}
      <div className="absolute bottom-12 right-5 z-10 text-white text-sm">
        <div className='flex flex-row '>
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
    </div>
  )
}

export default ArticleCardBig
