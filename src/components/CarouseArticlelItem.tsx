import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/utils/dateFormatter';

type CarouselItemProps = {
    article: any;
    author: any;
    category: any;
}

const CarouselArticleItem = ({ article, author, category }: CarouselItemProps) => {
  
  return (
    <div className="relative w-screen h-[70vh] flex items-center justify-center cursor-pointer">
      {/* Image */}
      <Image
        src={article?.data.image?.url}
        alt={article?.data.image?.alt}
        layout="fill"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center p-6 max-w-3xl">
        {author && (
          <div className="flex justify-center mb-4">
            <Image 
              src={author?.data.image.url} 
              alt={author?.data.name} 
              width={author?.data.image.dimensions.width} // specify the width
              height={author?.data.image.dimensions.height}
              layout='cover'
              className="w-12 h-12 lg:w-32 lg:h-32 z-10 rounded-full border-2 border-white object-cover"
            />
          </div>
        )}
        <h3 className="text-xl lg:text-3xl  mb-4">
          {article?.data.title}
        </h3>
      </div>
      {category && (
          <span
            className="absolute bottom-12 left-5 lg:left-52 text-white text-xs pl-3 pr-2 py-1"
            style={{ backgroundColor: category.data.color || "blue" }}
          >
            {category.data.name || "No Category"}
          </span>
        )}

      {/* Author and Date */}
      <div className="absolute bottom-12 right-5 lg:right-52 z-10 text-white text-sm">
        <div className='flex flex-row'>
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

export default CarouselArticleItem
