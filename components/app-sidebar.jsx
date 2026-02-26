
import * as React from "react"
import * as Icons from "@tabler/icons-react" // Import ALL icons as object

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

// ✅ STRING-BASED navigation data (serializable)
const navigationData = {
  "tp_admin": {
    navMain: [
      {
        title: "Administration",
        icon: "IconSchool",
        isActive: true,
        items: [
          { title: "Dashboard", url: "/dashboard/tp-admin" },
          { title: "Manage Users", url: "/dashboard/tp-admin/users" },
          { title: "Add New User", url: "/dashboard/tp-admin/add-user" },
        ],
      },
      {
        title: "NOC Management",
        icon: "IconChecklist",
        items: [
          { title: "Pending T&P Approval", url: "/dashboard/tp-admin/pending" },
          { title: "All Records", url: "/dashboard/tp-admin/all-requests" },
        ],
      },
    ],
  },
  "teacher": {
    navMain: [
      {
        title: "Department",
        icon: "IconBuildingCommunity",
        isActive: true,
        items: [
          { title: "Overview", url: "/dashboard/teacher" },
          { title: "Student List", url: "/dashboard/teacher/students" },
        ],
      },
      {
        title: "Approvals",
        icon: "IconFileText",
        items: [
          { title: "Pending Requests", url: "/dashboard/teacher/requests" },
          { title: "Approved by Me", url: "/dashboard/teacher/history" },
        ],
      },
    ],
  },
  "student": {
    navMain: [
      {
        title: "NOC Services",
        icon: "IconCertificate",
        isActive: true,
        items: [
          { title: "My Dashboard", url: "/dashboard/student" },
          { title: "New NOC Request", url: "/dashboard/student/new" },
          { title: "Track Status", url: "/dashboard/student/status" },
        ],
      },
      {
        title: "History",
        icon: "IconHistory",
        items: [{ title: "Previous NOCs", url: "/dashboard/student/history" }],
      },
    ],
  },
}

const teamsData = [
  {
    name: "College NOC",
    logo: "IconCertificate", // ✅ String instead of component
    plan: "Management System",
  },
]

export function AppSidebar({ role, userEmail, className = "", isExpanded = false, ...props }) {
  const currentNav = navigationData[role] || navigationData["student"];
  const userData = { email: userEmail };
  
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { className: "size-4" });
  };

  return (
    <div className={`h-full w-full flex flex-col bg-background ${className}`} {...props}>
      {/* ✅ Use collapsible="icon" WITHOUT SidebarProvider */}
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              {renderIcon("IconCertificate")}
            </div>
            <span className={`${isExpanded ? "block" : "hidden"} font-semibold`}>
              College NOC
            </span>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="p-2">
          <NavMain 
            items={currentNav.navMain} 
            icons={Icons}
            renderIcon={renderIcon}
            isExpanded={isExpanded}  // ← PASS TO NAVMAIN
          />
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t">
          <div className={`${isExpanded ? "block" : "hidden"} text-sm`}>
            {userEmail}
          </div>
          <div className={`${isExpanded ? "hidden" : "block"} w-8 h-8 bg-muted rounded-full`} />
        </SidebarFooter>
        
        <SidebarRail />
      </Sidebar>
    </div>
  );
}




// export function AppSidebar({ role, userEmail, ...props }) {
//   const currentNav = navigationData[role] || navigationData["student"]

//   const userData = {
//     email: userEmail,
//   }

//   // ✅ Icon renderer helper
//   const renderIcon = (iconName) => {
//     const IconComponent = Icons[iconName]
//     if (!IconComponent) return null
//     return React.createElement(IconComponent, { className: "size-4" })
//   }

//   return (
//     <Sidebar collapsible="icon" {...props} suppressHydrationWarning={true}>
//       <SidebarHeader>
//         <TeamSwitcher
//           teams={teamsData.map((team) => ({
//             ...team,
//             logo: renderIcon(team.logo),
//           }))}
//         />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={currentNav.navMain} icons={Icons} />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={userData} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }