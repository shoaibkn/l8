import { notFound } from "next/navigation";
import BlogPostContent from "@/components/blog-post-content";

async function getBlogBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function resolveBlogImages(
  coverImage: string | null,
  images: string[] | null,
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!coverImage && (!images || images.length === 0)) {
    return { coverImage: null, images: [] };
  }

  try {
    const res = await fetch(`${baseUrl}/api/storage/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverImage, images }),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    console.error("Failed to resolve images:", e);
  }

  return { coverImage, images: images || [] };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const resolvedImages = await resolveBlogImages(blog.coverImage, blog.images);

  return (
    <main className="min-h-screen px-6 md:px-12 bg-primary/10 pt-64">
      <BlogPostContent
        coverImage={resolvedImages.coverImage}
        title={blog.title}
        author={blog.author}
        date={blog.date}
        contentHtml={blog.contentHtml}
      />
    </main>
  );
}
