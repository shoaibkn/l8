import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBlog = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    author: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    content: v.optional(v.string()),
    contentHtml: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    date: v.string(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const blogId = await ctx.db.insert("blogs", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return { success: true, blogId };
  },
});

export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    author: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    content: v.optional(v.string()),
    contentHtml: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    date: v.optional(v.string()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const deleteBlog = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const listBlogs = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").collect();
  },
});

export const listPublishedBlogs = query({
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs")
      .filter((q) => q.eq(q.field("published"), true))
      .order("desc")
      .collect();
    return blogs;
  },
});

export const getBlogBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db.query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return blog;
  },
});

export const getBlogById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
