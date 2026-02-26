import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  enquiries: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.optional(v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("proposal"), v.literal("won"), v.literal("lost"))),
    source: v.optional(v.string()),
    value: v.optional(v.number()),
    followUpDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  admins: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    author: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    content: v.optional(v.string()),
    contentHtml: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    date: v.string(),
    published: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_createdAt", ["createdAt"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});
