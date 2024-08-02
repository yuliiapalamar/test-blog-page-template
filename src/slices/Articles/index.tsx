import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ArticleCardSmall from "@/components/ArticleCardSmall";
import { Bounded } from "@/components/Bounded";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CarouseArticlelItem from "@/components/CarouseArticlelItem";
import Autoplay from "embla-carousel-autoplay";
import ArticleCardBig from "@/components/ArticleCardBig";

/**
 * Props for `Articles`.
 */
export type ArticlesProps = SliceComponentProps<Content.ArticlesSlice>;

/**
 * Component for "Articles" Slices.
 */
const Articles = async ({ slice }: ArticlesProps): Promise<JSX.Element> => {
  const client = createClient();
  //console.log(slice);

  // Check if slice.primary and slice.primary.articles exist
  if (!slice?.primary?.articles) {
    console.error("slice.primary.articles is undefined or null");
    return <div>No articles available</div>;
  }

  const articles = await Promise.all(
    slice.primary.articles.map(async (item: any) => {
      if (isFilled.contentRelationship(item.article) && item.article.uid) {
        const article = await client.getByUID("article_post", item.article.uid);

        if (article && article.data) {
          const author =
            isFilled.contentRelationship(article.data.author) &&
            article.data.author.uid
              ? await client.getByUID("author", article.data.author.uid)
              : null;
          const category =
            isFilled.contentRelationship(article.data.category) &&
            article.data.category.uid
              ? await client.getByUID("category", article.data.category.uid)
              : null;

          return { article, author, category };
        }
      }
      return null;
    })
  );
  articles.map((item: any) => {
    console.log('item ', item);
  });
  // console.log('articles ',articles);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" && (
        <Bounded as="section">
          <div
            className={`grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center`}
          >
            {articles.map(
              (item: any, index: number) =>
                item && (
                  <ArticleCardSmall
                    key={index}
                    article={item}
                  />
                )
            )}
          </div>
        </Bounded>
      )}
      {slice.variation === "twoColums" && (
        <Bounded as="section" className="bg-slate-50 items-center">
          <div
            className={`grid gap-8 md:grid-cols-2 sm:grid-cols-1 justify-items-center`}
          >
            {articles.map(
              (item: any, index: number) =>
                item && (
                  <ArticleCardSmall
                    key={index}
                    article={item}
                  />
                )
            )}
          </div>
        </Bounded>
      )}
      {slice.variation === "bigCard" && (
        <Bounded as="section" className="items-center">
          <div
            className={`flex items-center justify-items-center`}
          >
            {articles.map(
              (item: any, index: number) =>
                item && (
                  <ArticleCardBig
                    key={index}
                    article={item}
                  />
                )
            )}
          </div>
        </Bounded>
      )}
      {slice.variation === "slider" && (
        // <Bounded as="section">
        <Carousel
          article={articles}
          author={articles.map((a) => a?.author)}
          category={articles.map((a) => a?.category)}
        >
          <CarouselContent>
            {articles.map(
              (item: any, index: number) =>
                item && (
                  <CarouselItem key={index}>
                    <CarouseArticlelItem
                      article={item}
                    />
                  </CarouselItem>
                )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        // </Bounded>
      )}
    </section>
  );
};

export default Articles;