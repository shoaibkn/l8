"use client";

import { useState } from "react";
import { Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Blog {
  _id: string;
  _creationTime: number;
  title: string;
  slug: string;
  coverImage?: string;
  date: string;
  published: boolean;
  createdAt: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("/api/blogs/admin")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await fetch("/api/blogs/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const handleTogglePublish = async (id: string, currentPublished: boolean) => {
    await fetch("/api/blogs/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, published: !currentPublished }),
    });
    setBlogs((prev) =>
      prev.map((b) => (b._id === id ? { ...b, published: !currentPublished } : b))
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Blogs</h1>
          <Link href="/admin/blogs/new">
            <Button>Create New Blog</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No blogs yet. Create your first blog!
            </div>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{blog.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${blog.published ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">/{blog.slug}</p>
                    <p className="text-xs text-muted-foreground">{blog.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTogglePublish(blog._id, blog.published)}
                    title={blog.published ? "Unpublish" : "Publish"}
                  >
                    {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Link href={`/blog/${blog.slug}`} target="_blank">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/${blog._id}`}>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
