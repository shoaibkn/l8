import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const adminEmail = process.env.ADMIN_EMAIL || "admin@l8.com";

    try {
      await resend.emails.send({
        from: "L8 <onboarding@resend.dev>",
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

      await resend.emails.send({
        from: "L8 Website <onboarding@resend.dev>",
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
  handler: async (ctx) => {
    return await ctx.db.query("enquiries").order("desc").collect();
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
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("closed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
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
