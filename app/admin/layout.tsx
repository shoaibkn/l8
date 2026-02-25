export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <nav className="border-b p-4 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-xl font-bold uppercase">L8</a>
            <span className="text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/enquiries" className="hover:underline text-sm">Enquiries</a>
            <a href="/admin/blogs" className="hover:underline text-sm">Blogs</a>
            <a href="/admin/blogs/new" className="hover:underline text-sm">New Blog</a>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="text-sm text-muted-foreground hover:underline ml-4">
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
