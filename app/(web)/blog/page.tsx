import NewsContainer from "@/components/news-container";

async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="z-100">
      <section className="bg-primary/20 min-h-screen py-12 px-6 md:px-12">
        <h1 className="font-display mx-auto justify-center items-center align-middle py-24 text-center w-full wrap-break-word leading-[clamp(3rem,8vw,9rem)] uppercase text-[clamp(3rem,8vw,9rem)] font-semibold tracking-tighter">
          News & Updates
        </h1>
        <div className="grid md:grid-cols-4">
          {blogs.length > 0 ? (
            blogs
              .map(
                (blog: {
                  _id: string;
                  date: string;
                  title: string;
                  coverImage: string;
                  slug: string;
                }) =>
                  blog.coverImage ? (
                    <NewsContainer
                      key={blog._id}
                      date={blog.date}
                      title={blog.title}
                      image={blog.coverImage}
                      slug={blog.slug}
                      link={`/blog/${blog.slug}`}
                      height="full"
                    />
                  ) : null,
              )
              .filter(Boolean)
          ) : (
            <div className="col-span-4 text-center py-12 text-muted-foreground">
              No blogs yet. Check back soon!
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
