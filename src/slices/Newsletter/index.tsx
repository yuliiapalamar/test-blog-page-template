import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import NewsInput from "@/components/NewsInput";

/**
 * Props for `NewsLetter`.
 */
export type NewsLetterProps = SliceComponentProps<Content.NewsLetterSlice>;

/**
 * Component for "NewsLetter" Slices.
 */
const NewsLetter = ({ slice }: NewsLetterProps): JSX.Element => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex flex-col items-center justify-center py-20 bg-blue-600 text-white"
      style={{ backgroundImage: `url(${slice.primary.background_image.url})` }}
    >
      <div className="inset-0 bg-blue-600 opacity-50"></div>
      <div className="flex flex-col items-center z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {slice.primary.title}
        </h2>
        <p className="text-lg mb-8">
          {slice.primary.description} 
        </p>
        <NewsInput buttonText={slice.primary.button_text as string} />
      </div>
    </section>
  );
};

export default NewsLetter;
