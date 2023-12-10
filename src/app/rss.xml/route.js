import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({ title: BLOG_TITLE, description: "Final TP" });
  const blogPostList = await getBlogPostList();
  blogPostList.forEach((blogPost) => {
    feed.item({
      title: blogPost.title,
      date: blogPost.publishedOn,
      description: blogPost.abstract,
      url: `http//some-domain/${blogPost.slug}`,
    });
  });

  return new Response(feed.xml(), {
    headers: { "Content-Type": "application/xml" },
  });
}
