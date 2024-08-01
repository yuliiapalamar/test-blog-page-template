import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

/**
 * Props for `NewsLetter`.
 */
export type NewsLetterProps = SliceComponentProps<Content.NewsLetterSlice>;

/**
 * Component for "NewsLetter" Slices.
 */
const NewsLetter = ({ slice }: NewsLetterProps): JSX.Element => {
  console.log(slice);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex flex-col items-center justify-center py-20 bg-blue-600 text-white"
      style={{ backgroundImage: `url(${slice.primary.background_image.url})` }}
    >
      <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {slice.primary.title}
        </h2>
        <p className="text-lg mb-8">
          {slice.primary.description} 
        </p>
        <div className="flex items-center justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-l-full outline-none"
          />
          <button className="px-6 py-2 bg-white text-blue-600 rounded-r-full font-semibold">
            {slice.primary.button_text as any}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
