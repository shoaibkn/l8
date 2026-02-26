"use client";

import { useState, use, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Upload, X, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const BlogEditor = dynamic(
  () =>
    import("@/components/blog-editor").then(
      (mod) =>
        mod.BlogEditor as React.ComponentType<{
          value?: string;
          onChange?: (html: string) => void;
        }>,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-none h-96 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    ),
  },
);

function EditorLoading() {
  return (
    <div className="border rounded-lg h-96 flex items-center justify-center bg-gray-50">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  );
}

export default function BlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const isEditing = id !== "new";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [published, setPublished] = useState(false);
  const [author, setAuthor] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isEditing && loading) {
      fetch(`/api/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setTitle(data.title || "");
            setSlug(data.slug || "");
            setCoverImage(data.coverImage || null);
            setCoverImagePreview(data.coverImage || null);
            setDate(data.date || "");
            setPublished(data.published || false);
            setAuthor(data.author || "");
            if (data.contentHtml) {
              setContentHtml(data.contentHtml);
            }
          }
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [mounted, id, isEditing, loading]);

  const handleSlugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(handleSlugify(value));
    }
  };

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setCoverImage(data.url);
        setCoverImagePreview(data.url);
      } else {
        alert("Failed to upload image: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!title || !slug) {
      alert("Title and slug are required");
      return;
    }

    setSaving(true);

    const body: {
      title: string;
      slug: string;
      date: string;
      published: boolean;
      author?: string;
      authorId?: string;
      coverImage?: string;
      contentHtml?: string;
    } = {
      title,
      slug,
      date,
      published: publish,
    };

    if (author) {
      body.author = author;
    }
    if (coverImage) {
      body.coverImage = coverImage;
    }
    if (contentHtml) {
      body.contentHtml = contentHtml;
    } else {
      body.contentHtml = `<p>${title}</p>`;
    }

    try {
      const url = isEditing ? `/api/blogs/update` : "/api/blogs";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { id, ...body } : body),
      });

      if (response.ok) {
        router.push("/admin/blogs");
      } else {
        const data = await response.json();
        alert("Failed to save blog: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Blog" : "Create New Blog"}
          </h1>
          <div className="flex gap-2">
            <Link href="/admin/blogs">
              <Button variant="ghost" className="rounded-none">
                Cancel
              </Button>
            </Link>
            <Button
              variant="secondary"
              onClick={() => handleSave(published)}
              className="rounded-none"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="rounded-none"
            >
              {saving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <Label
              htmlFor="title"
              className="font-mono uppercase text-xs text-muted-foreground"
            >
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="rounded-none"
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="slug"
              className="font-mono uppercase text-xs text-muted-foreground"
            >
              Slug
            </Label>
            <Input
              id="slug"
              value={slug}
              className="rounded-none"
              onChange={(e) => setSlug(handleSlugify(e.target.value))}
              placeholder="blog-url-slug"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="date"
              className="font-mono uppercase text-xs text-muted-foreground"
            >
              Date
            </Label>
            <Input
              id="date"
              type="date"
              className="rounded-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="author"
              className="font-mono uppercase text-xs text-muted-foreground"
            >
              Author
            </Label>
            <Input
              id="author"
              value={author}
              className="rounded-none"
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
            />
          </div>

          <div className="grid gap-2">
            <Label className="font-mono uppercase text-xs text-muted-foreground">
              Cover Image
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverImageUpload}
              className="hidden rounde-none"
              id="cover-image-upload"
            />

            {!coverImagePreview ? (
              <label
                htmlFor="cover-image-upload"
                className="font-mono uppercase text-xs text-muted-foreground border-2 border-dashed rounded-none p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload cover image
                    </span>
                  </>
                )}
              </label>
            ) : (
              <div className="relative">
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="max-w-md rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveCoverImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="font-mono uppercase text-xs text-muted-foreground">
              Content
            </Label>
            {mounted ? (
              <BlogEditor value={contentHtml} onChange={setContentHtml} />
            ) : (
              <EditorLoading />
            )}
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="contentHtml"
              className="font-mono uppercase text-xs text-muted-foreground"
            >
              Content (HTML)
            </Label>
            <p className="text-sm text-muted-foreground">
              Enter HTML content manually or use the editor above.
            </p>
            <textarea
              id="contentHtml"
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              placeholder="<h1>Your content here...</h1>"
              className="min-h-[200px] w-full p-3 border rounded-none font-mono text-sm bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
