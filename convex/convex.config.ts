import { defineApp } from "convex/server";
import resend from "@convex-dev/resend/convex.config.js";

const convex = defineApp();
convex.use(resend);

export default convex;
