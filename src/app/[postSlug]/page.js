import React from "react";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);
  if (!blogPostData) {
    return null;
  }
  return {
    title: `${blogPostData.frontmatter.title} • ${BLOG_TITLE}`,
    description: blogPostData.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);
  if (!blogPostData) {
    notFound();
  }
  return (
    <>
      <article className={styles.wrapper}>
        <BlogHero
          title={blogPostData.frontmatter.title}
          publishedOn={blogPostData.frontmatter.publishedOn}
        />
        <div className={styles.page}>
          <MDXRemote
            source={blogPostData.content}
            components={{ pre: Code, DivisionGroupsDemo, CircularColorsDemo }}
          />
        </div>
      </article>
    </>
  );
}

export default BlogPost;
