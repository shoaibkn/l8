import { ConvexHttpClient } from "convex/browser";
import { news } from "../constants";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not set");
  process.exit(1);
}

const convex = new ConvexHttpClient(convexUrl);

async function seedBlogs() {
  console.log("Seeding blogs from constants...");
  
  for (const blog of news) {
    try {
      const result = await convex.mutation("blogs:createBlog", {
        title: blog.title,
        slug: blog.slug,
        coverImage: blog.image,
        content: "",
        contentHtml: "",
        images: [],
        date: blog.date,
        published: true,
      });
      console.log(`Created blog: ${blog.title} (${result.blogId})`);
    } catch (error) {
      console.error(`Failed to create blog ${blog.title}:`, error);
    }
  }
  
  console.log("Seeding complete!");
}

seedBlogs();
