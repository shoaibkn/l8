import Image from "next/image";
import { notFound } from "next/navigation";

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
    <main className="min-h-screen px-6 md:px-12 bg-primary/10">
      <article className="grid grid-cols-4 pt-64">
        <div className="gap-4 text-muted-foreground mb-4 h-screen border">
          {resolvedImages.coverImage && (
            // <img
            //   src={resolvedImages.coverImage}
            //   alt={blog.title}
            //   className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            // />
            <Image
              src={resolvedImages.coverImage}
              alt={blog.title}
              width={800}
              height={450}
              className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
          <div className="text-xs font-mono uppercase tracking-tighter px-4 py-6 flex flex-col">
            <span>{blog.date}</span>
            {blog.author && (
              <>
                <span>By {blog.author}</span>
              </>
            )}
          </div>
        </div>
        <div></div>
        <div
          className="prose prose-xs max-w-none col-span-2 prose-h1:font-display prose-h1:uppercase prose-h1:tracking-tighter prose-h1:text-[clamp(3rem,4vw,10rem)] prose-blockquote:border-l-primary prose-blockquote:border-1 prose-blockquote:pl-6 prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: blog.contentHtml || "" }}
        />
      </article>
    </main>
  );
}
