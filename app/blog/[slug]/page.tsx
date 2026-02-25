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

async function resolveBlogImages(coverImage: string | null, images: string[] | null) {
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
    <main className="min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {resolvedImages.coverImage && (
          <img
            src={resolvedImages.coverImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}
        
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <span>{blog.date}</span>
          {blog.author && (
            <>
              <span>•</span>
              <span>By {blog.author}</span>
            </>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8">{blog.title}</h1>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.contentHtml || "" }}
        />
      </article>
    </main>
  );
}
