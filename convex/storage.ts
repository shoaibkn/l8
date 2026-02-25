import { action, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = action({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      const url = await ctx.storage.getUrl(args.storageId as any);
      return { url };
    } catch (e) {
      return { url: null };
    }
  },
});

export const getFileUrlFromId = action({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    try {
      const url = await ctx.storage.getUrl(args.storageId as any);
      return { url, storageId: args.storageId };
    } catch (e) {
      console.error("Error getting file URL:", e);
      return { url: null, storageId: args.storageId };
    }
  },
});

export const resolveBlogImages = action({
  args: { 
    coverImage: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let resolvedCoverImage: string | null = null;
    
    if (args.coverImage) {
      if (args.coverImage.includes("/api/storage/")) {
        const storageId = args.coverImage.split("/api/storage/").pop();
        if (storageId) {
          resolvedCoverImage = await ctx.storage.getUrl(storageId as any) || null;
        }
      } else {
        resolvedCoverImage = args.coverImage;
      }
    }
    
    const resolvedImages: string[] = [];
    if (args.images) {
      for (const img of args.images) {
        if (img.includes("/api/storage/")) {
          const storageId = img.split("/api/storage/").pop();
          if (storageId) {
            const url = await ctx.storage.getUrl(storageId as any);
            if (url) resolvedImages.push(url);
          }
        } else {
          resolvedImages.push(img);
        }
      }
    }
    
    return { coverImage: resolvedCoverImage, images: resolvedImages };
  },
});
