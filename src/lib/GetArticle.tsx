import { createClient } from "@/prismicio";

export async function getArticleById(id: string) {
    const client = createClient();
  const article = await client.getByID(id);
  return article.data;
}

export async function getDocumentById(id: string) {
    const client = createClient();
    const document = await client.getByID(id);
    return document.data;
  }
