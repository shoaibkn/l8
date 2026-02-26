import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";

const resend = new Resend(components.resend as any, {
  testMode: false,
});

async function getAdminEmail(ctx: any): Promise<string> {
  const setting = await ctx.db
    .query("settings")
    .withIndex("by_key", (q: any) => q.eq("key", "adminEmail"))
    .first();
  return setting?.value || process.env.ADMIN_EMAIL || "admin@l8.com";
}

export const submitEnquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const enquiryId = await ctx.db.insert("enquiries", {
      name: args.name,
      email: args.email,
      message: args.message,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    const enquiry = await ctx.db.get(enquiryId);
    if (!enquiry) throw new Error("Failed to create enquiry");

    const adminEmail = await getAdminEmail(ctx);

    try {
      await resend.sendEmail(ctx, {
        from: "Lumin8 <hello@lumin8.in>",
        to: enquiry.email,
        subject: "Thank you for your enquiry - L8",
        html: `
            <h1>Hi ${enquiry.name},</h1>
            <p>Thank you for reaching out to us. We've received your enquiry and will get back to you shortly.</p>
            <p>Here's a copy of what you submitted:</p>
            <ul>
              <li><strong>Name:</strong> ${enquiry.name}</li>
              <li><strong>Email:</strong> ${enquiry.email}</li>
              ${enquiry.message ? `<li><strong>Message:</strong> ${enquiry.message}</li>` : ""}
            </ul>
            <p>Best regards,<br>The L8 Team</p>
          `,
      });

      await resend.sendEmail(ctx, {
        from: "Lumin8 <hello@lumin8.in>",
        to: adminEmail,
        subject: `New Enquiry from ${enquiry.name} - L8`,
        html: `
            <h1>New Enquiry Received</h1>
            <p>You have a new enquiry from your website:</p>
            <ul>
              <li><strong>Name:</strong> ${enquiry.name}</li>
              <li><strong>Email:</strong> ${enquiry.email}</li>
              ${enquiry.message ? `<li><strong>Message:</strong> ${enquiry.message}</li>` : ""}
              <li><strong>Submitted:</strong> ${new Date(enquiry.createdAt).toLocaleString()}</li>
            </ul>
            <p><a href="${process.env.ADMIN_URL || "http://localhost:3000"}/admin/enquiries">View in Admin CMS</a></p>
          `,
      });
    } catch (error) {
      console.error("Failed to send emails:", error);
    }

    return { success: true, enquiryId };
  },
});

export const listEnquiries = query({
  args: {
    search: v.optional(v.string()),
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    const baseQuery = ctx.db.query("enquiries").order("desc");

    let results;
    if (args.cursor) {
      results = await baseQuery.paginate({ numItems: limit, cursor: args.cursor });
    } else {
      results = await baseQuery.paginate({ numItems: limit, cursor: null as any });
    }

    let enquiries = results.page;

    if (args.search && args.search.trim()) {
      const searchLower = args.search.toLowerCase();
      enquiries = enquiries.filter(
        (e) =>
          e.name.toLowerCase().includes(searchLower) ||
          e.email.toLowerCase().includes(searchLower) ||
          (e.message && e.message.toLowerCase().includes(searchLower)) ||
          (e.notes && e.notes.toLowerCase().includes(searchLower))
      );
    }

    return {
      enquiries,
      continueCursor: results.continueCursor,
      hasMore: results.continueCursor !== null,
    };
  },
});

export const getEnquiry = query({
  args: { id: v.id("enquiries") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateEnquiryStatus = mutation({
  args: {
    id: v.id("enquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("proposal"),
      v.literal("won"),
      v.literal("lost"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateEnquiryNotes = mutation({
  args: {
    id: v.id("enquiries"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      notes: args.notes,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateLeadDetails = mutation({
  args: {
    id: v.id("enquiries"),
    source: v.optional(v.string()),
    value: v.optional(v.number()),
    followUpDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, any> = { updatedAt: Date.now() };
    if (args.source !== undefined) updates.source = args.source;
    if (args.value !== undefined) updates.value = args.value;
    if (args.followUpDate !== undefined) updates.followUpDate = args.followUpDate;
    
    await ctx.db.patch(args.id, updates);
    return { success: true };
  },
});

export const deleteEnquiry = mutation({
  args: { id: v.id("enquiries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const listAdmins = query({
  handler: async (ctx) => {
    return await ctx.db.query("admins").collect();
  },
});

export const addAdmin = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("admins")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .first();
    if (existing) return { success: false, message: "Admin already exists" };

    await ctx.db.insert("admins", {
      email: args.email,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});

export const isAdmin = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .first();
    return !!admin;
  },
});
