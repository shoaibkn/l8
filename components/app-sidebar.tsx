"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  BookOpenCheck,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Mailbox,
  Map,
  PieChart,
  Rss,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Lumin8",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Enquiries",
      url: "/admin/enquiries",
      icon: Mailbox,
      isActive: true,
      items: [
        {
          title: "View Enquiries",
          url: "/admin/enquiries",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: Rss,
      items: [
        {
          title: "Create New Blog",
          url: "/admin/blogs/new",
        },
        {
          title: "View Blogs",
          url: "/admin/blogs",
        },
      ],
    },
    {
      title: "Case Studies",
      url: "/admin/case-studies",
      icon: BookOpenCheck,
      items: [
        {
          title: "New",
          url: "/admin/case-studies/new",
        },
        {
          title: "View",
          url: "/admin/case-studies",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
