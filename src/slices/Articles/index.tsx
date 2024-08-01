import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

/**
 * Props for `Articles`.
 */
export type ArticlesProps = SliceComponentProps<Content.ArticlesSlice>;

/**
 * Component for "Articles" Slices.
 */
const Articles = async ({ slice }: ArticlesProps): Promise<JSX.Element> => {
  const client = createClient();

  // const articles = await Promise.all(
  //   slice.primary.articles.map(async (item) => {
  //     if (isFilled.contentRelationship(item.article) && item.article.uid) {
  //       const article = await client.getByUID("article", item.article.uid);

  //       if (article && article.data) {
  //         const author = isFilled.contentRelationship(article.data.author) && article.data.author.uid
  //           ? await client.getByUID("author", article.data.author.uid)
  //           : null;
  //         const category = isFilled.contentRelationship(article.data.category) && article.data.category.uid
  //           ? await client.getByUID("category", article.data.category.uid)
  //           : null;

  //         return { article, author, category };
  //       }
  //     }
  //     return null;
  //   })
  // );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-8"
    >
      {/* {articles.map((item, index) => item && (
        <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <PrismicNextImage
              field={item.article.data.image}
              className="w-full h-48 object-cover"
              // fallbackAlt="Article Image"
            />
            {item.category && (
              <span
                className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded"
                style={{ backgroundColor: item.category.data.color || 'blue' }}
              >
                {item.category.data.name || 'No Category'}
              </span>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{item.article.data.title || 'No Title'}</h3>
            <p className="text-gray-600 mb-4">{new Date(item.article.data.publish_date || '').toLocaleDateString()}</p>
            {item.author && (
              <div className="flex items-center mt-4">
                <img
                  src={item.author.data.image?.url || ''}
                  alt={item.author.data.name || ''}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-900 leading-none">{item.author.data.name || 'No Name'}</p>
                </div>
              </div>
            )}
          </div>
        </article>
      ))} */}
    </section>
  );
};

export default Articles;
