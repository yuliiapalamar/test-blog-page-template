import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

import { formatDate } from "@/utils/dateFormatter";
import ArticleCardSmall from "@/components/ArticleCardSmall";
import Text from "@/slices/Text";
import { PrismicRichText } from "@/components/PrismicRichText";
import { isFilled } from "@prismicio/client";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("article_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const page = await client
    .getByUID("article_post", params.uid)
    .catch(() => notFound());

  if (!page || !page.data) {
    notFound();
  }

  let author = null;
  if (isFilled.contentRelationship(page.data.author) && page.data.author.uid) {
    author = await client.getByUID("author", page.data.author.uid);
  }
  let category = null;
  if (isFilled.contentRelationship(page.data.category) && page.data.category.uid) {
    category = await client.getByUID("category", page.data.category.uid);
  }

  const articles = await Promise.all(
    (
      await client.getAllByType("article_post", {
        predicates: [prismic.filter.not("my.article_post.uid", params.uid)],
        orderings: [
          { field: "my.article_post.publication_date", direction: "desc" },
          { field: "document.first_publication_date", direction: "desc" },
        ],
        limit: 3,
      })
    ).map(async (article) => {
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
      return null;
    })
  );

  const {
    slices,
    title,
    publication_date,
    description,
    image,
  } = page.data;

  return (
    <div className="flex flex-col gap-12 w-full p-4 lg:py-20 lg:px-40 items-center">
      <section className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-10 gap-8 lg:gap-12 mb-12 lg:mb-20">
        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <span
              className="text-white w-fit text-xs px-2 py-1"
              style={{ backgroundColor: category?.data?.color || "blue" }}
            >
              {category?.data?.name || "No Category"}
            </span>
            <div className="flex flex-row items-center text-gray-500 text-xs">
              <p>{formatDate(publication_date || "")}</p>
              <div className="mx-3 w-px bg-gray-300 h-4" />
              {author && (
                <p className="underline text-blue-400">{author.data.name || "No Name"}</p>
              )}
            </div>
            <div className="text-start">
              <h3 className="text-lg lg:text-4xl font-medium">{title}</h3>
            </div>
          </div>
          <div className="text-start">
            <PrismicRichText field={description} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <PrismicNextImage
            field={image}
            sizes="100vw"
            className="w-full max-w-3xl max-h-96 rounded-xl object-cover"
          />
        </div>
      </section>

      <SliceZone slices={slices} components={components} />

      <h2 className="font-bold text-2xl lg:text-3xl">Recommended Posts</h2>
      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
        {articles.map((post) => (
          <ArticleCardSmall key={post?.article.id} article={post} />
        ))}
      </section>
    </div>
  );
}
