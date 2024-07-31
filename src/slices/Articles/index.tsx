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

  const articles = await Promise.all(
    slice.primary.articles.map(async (item) => {
      if (isFilled.contentRelationship(item.article) && item.article.uid) {
        const article = await client.getByUID("article", item.article.uid);

        if (article && article.data) {
          const author = isFilled.contentRelationship(article.data.author) && article.data.author.uid
            ? await client.getByUID("author", article.data.author.uid)
            : null;
          const category = isFilled.contentRelationship(article.data.category) && article.data.category.uid
            ? await client.getByUID("category", article.data.category.uid)
            : null;

          return { article, author, category };
        }
      }
    })
  );
  console.log(articles);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {articles.map((item, index) => item && (
        <article key={index}>
          <h3>{item.article.data.title}</h3>
          <PrismicNextImage field={item.article.data.image} />
          {item.author && (
            <p>
              {item.author.data.name}
            </p>
          )}
          <p>{item.article.data.publish_date}</p>
          {item.category && (
            <p>
              {item.category.data.name}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};

export default Articles;
