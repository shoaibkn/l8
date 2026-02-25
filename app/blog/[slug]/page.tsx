export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen">
      <h1>{slug}</h1>
      {/* Add content here */}
    </main>
  );
}
