import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");

  return await rss({
    title: "Ky Decker",
    description: "Dispatches from the world wide web.",
    site: context.site,
    trailingSlash: false,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.datePublished,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          "img",
          "figure",
          "figcaption",
        ]),
      }),
    })),
  });
}
