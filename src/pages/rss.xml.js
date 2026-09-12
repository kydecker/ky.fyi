import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx/container-renderer";
import rss from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";

export async function GET(context) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const posts = await getCollection("posts");

  const items = [];
  for (const post of posts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    const link = new URL(`/posts/${post.id}`, context.url.origin).toString();
    const pubDate = post.data.datePublished;
    items.push({ ...post.data, pubDate, link, content });
  }

  return await rss({
    title: "Ky Decker",
    description: "Dispatches from the world wide web.",
    site: context.site,
    trailingSlash: false,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    items,
  });
}
