import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ArticleCardSmall from "@/components/ArticleCardSmall";

/**
 * Props for `Articles`.
 */
export type ArticlesProps = SliceComponentProps<Content.ArticlesSlice>;

/**
 * Component for "Articles" Slices.
 */
const Articles = async ({ slice }: ArticlesProps): Promise<JSX.Element> => {
  const client = createClient();

  // Check if slice.primary and slice.primary.articles exist
  if (!slice?.primary?.articles) {
    console.error("slice.primary.articles is undefined or null");
    return <div>No articles available</div>;
  }

  const articles = await Promise.all(
    slice.primary.articles.map(async (item: any) => {
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
      return null;
    })
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
     
    >
      {slice.variation === 'default' &&
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 py-8 px-60"
        >
          {articles.map((item: any, index: number) => item && (
            <ArticleCardSmall
              key={index}
              article={item.article}
              author={item.author}
              category={item.category}
            />
          ))}
        </div>
      }
       {slice.variation === 'twoColums' &&
        <div
          className="grid gap-8 lg:grid-cols-2 sm:grid-cols-1 py-8 bg-slate-100 px-60"
        >
          {articles.map((item: any, index: number) => item && (
            <ArticleCardSmall
              key={index}
              article={item.article}
              author={item.author}
              category={item.category}
            />
          ))}
        </div>
      }
    </section>
  );
};

export default Articles;
