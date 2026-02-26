"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // shadcn helper
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { LogoutFunc } from "@/components/LogoutButton";
import { ModeToggle } from "@/components/ModeToggle";

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
          { title: "Completely Approved", url: "/dashboard/teacher/approved" },
        ],
      },
      {
        title: "Approvals",
        icon: "IconFileText",
        items: [
          { title: "Pending Requests", url: "/dashboard/teacher/requests" },
          
          { title: "Allowed Edit", url: "/dashboard/teacher/allowededit" },
          { title: "Waiting By T&P", url: "/dashboard/teacher/waiting" },
          { title: "Rejected Requests", url: "/dashboard/teacher/rejected" },
          { title: "History", url: "/dashboard/teacher/history" },
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


export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef(null);

  const role = pathname.includes("/teacher") ? "teacher" : pathname.includes("/student") ? "student" : "tp_admin";
  const currentNav = navigationData[role];

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsExpanded(false), 200);
  }, []);

  const renderIcon = (iconName, isActive) => {
    const Icon = Icons[iconName] || Icons.IconCircle;
    return (
      <div className={cn(
        "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors",
        isActive ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10" : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200"
      )}>
        <Icon size={20} stroke={1.5} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR CONTAINER */}
      {/* We use a wrapper div with a fixed width so the 'children' width NEVER changes */}
      <div className="hidden lg:block w-[68px] flex-shrink-0" />

      <aside
        className={cn(
          "fixed top-0 left-0 z-[60] h-screen bg-card border-r border-border transition-all duration-300 ease-in-out shadow-sm",
          isExpanded ? "w-64" : "w-[68px]"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* LOGO AREA */}
          <div className="h-16 flex items-center px-[18px]">
            <div className="w-8 h-8 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center text-primary-foreground shadow-sm">
              <Icons.IconCertificate size={18} stroke={2} />
            </div>
            <span className={cn(
              "ml-3 font-bold tracking-tight transition-all duration-300 whitespace-nowrap",
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            )}>
              College NOC
            </span>
          </div>

          {/* NAV ITEMS */}
          <nav className="flex-1 px-3 space-y-6 overflow-y-auto overflow-x-hidden pt-4">
            {currentNav.navMain.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {/* Group Label */}
                <div className="h-4 px-3 flex items-center">
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-opacity duration-200",
                    isExpanded ? "opacity-60" : "opacity-0"
                  )}>
                    {group.title || group.label}
                  </p>
                </div>

                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        "group flex items-center h-10 px-1.5 rounded-md transition-colors",
                        isActive ? "bg-accent" : "hover:bg-accent/50"
                      )}
                    >
                      {/* Icon is ALWAYS visible because it is outside the translated span */}
                      {renderIcon(item.icon, isActive)}
                      
                      <span className={cn(
                        "ml-2 text-sm font-medium text-foreground transition-all duration-300",
                        isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
                      )}>
                        {item.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* FOOTER */}
          <div className="p-3 border-t border-border bg-muted/30">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0" />
              <div className={cn(
                "ml-3 transition-all duration-300",
                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
              )}>
                <p className="text-xs font-semibold leading-none">Admin User</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-background">
        <header className="h-16 border-b flex items-center px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
           <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
             {pathname.split('/').pop().replace('-', ' ')}
           </h1>
           <Button variant="destructive" onClick={LogoutFunc}><LogOut /></Button>
           <ModeToggle />
        </header>
        <div className="p-2">
          {children}
        </div>
      </main>
    </div>
  );
}



















// "use client";

// import React, { useState, useRef, useCallback } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import * as Icons from "@tabler/icons-react";

// const navigationData = {
//   tp_admin: {
//     navMain: [
//       {
//         label: "Administration",
//         items: [
//           { title: "Dashboard", url: "/dashboard/tp-admin", icon: "IconLayoutDashboard" },
//           { title: "Manage Users", url: "/dashboard/tp-admin/users", icon: "IconUsers" },
//           { title: "Add New User", url: "/dashboard/tp-admin/add-user", icon: "IconUserPlus" },
//         ],
//       },
//       {
//         label: "NOC Management",
//         items: [
//           { title: "Pending Approval", url: "/dashboard/tp-admin/pending", icon: "IconChecklist" },
//           { title: "All Records", url: "/dashboard/tp-admin/all-requests", icon: "IconFileText" },
//         ],
//       },
//     ],
//   },

//   teacher: {
//     navMain: [
//       {
//         label: "Department",
//         items: [
//           { title: "Overview", url: "/dashboard/teacher", icon: "IconBuildingCommunity" },
//           { title: "Student List", url: "/dashboard/teacher/students", icon: "IconUsers" },
//         ],
//       },
//       {
//         label: "Approvals",
//         items: [
//           { title: "Pending Requests", url: "/dashboard/teacher/requests", icon: "IconClock" },
//           { title: "Approved by Me", url: "/dashboard/teacher/history", icon: "IconCheck" },
//         ],
//       },
//     ],
//   },

//   student: {
//     navMain: [
//       {
//         label: "NOC Services",
//         items: [
//           { title: "My Dashboard", url: "/dashboard/student", icon: "IconLayoutDashboard" },
//           { title: "New NOC Request", url: "/dashboard/student/new", icon: "IconPlus" },
//           { title: "Track Status", url: "/dashboard/student/status", icon: "IconSearch" },
//         ],
//       },
//       {
//         label: "History",
//         items: [
//           { title: "Previous NOCs", url: "/dashboard/student/history", icon: "IconHistory" },
//         ],
//       },
//     ],
//   },
// };

// export default function DashboardLayout({ children }) {
//   const pathname = usePathname();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const timeoutRef = useRef(null);

//   // Auto detect role
//   const role =
//     pathname.includes("/teacher")
//       ? "teacher"
//       : pathname.includes("/student")
//       ? "student"
//       : "tp_admin";

//   const currentNav = navigationData[role];

//   // Hover logic (same as your original working version)
//   const handleMouseEnter = useCallback(() => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setIsExpanded(true);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     timeoutRef.current = setTimeout(() => {
//       setIsExpanded(false);
//     }, 200);
//   }, []);

//   const renderIcon = (iconName, className = "size-5") => {
//     const Icon = Icons[iconName];
//     if (!Icon) return null;
//     return <Icon className={className} stroke={1.6} />;
//   };

//   return (
//     <>
//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed top-0 left-0 z-[60] h-screen
//           bg-white dark:bg-[#0b1220]
//           border-r border-gray-200 dark:border-gray-800
//           shadow-xl
//           transition-all duration-300 ease-in-out
//           ${isExpanded ? "w-72" : "w-16 hover:w-72"}
//         `}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="h-full flex flex-col px-3 py-4">

//           {/* HEADER */}
//           <div className="mb-6 flex items-center gap-3 px-2">
//             <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-md flex items-center justify-center text-white shadow-md">
//               {renderIcon("IconCertificate")}
//             </div>

//             <span
//               className={`
//                 text-lg font-semibold text-gray-800 dark:text-gray-200
//                 transition-all duration-200
//                 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}
//               `}
//             >
//               College NOC
//             </span>
//           </div>

//           {/* NAVIGATION */}
//           <nav className="flex-1 space-y-6 overflow-y-auto">
//             {currentNav.navMain.map((group, index) => (
//               <div key={index}>

//                 {/* GROUP LABEL */}
//                 <p
//                   className={`
//                     px-3 mb-2 text-xs uppercase tracking-wider
//                     text-gray-400 dark:text-gray-500
//                     transition-all duration-200
//                     ${isExpanded ? "opacity-100" : "opacity-0 hidden"}
//                   `}
//                 >
//                   {group.label}
//                 </p>

//                 {/* ITEMS */}
//                 <div className="space-y-1">
//                   {group.items.map((item) => {
//                     const isActive = pathname === item.url;

//                     return (
//                       <Link
//                         key={item.url}
//                         href={item.url}
//                         title={!isExpanded ? item.title : ""}
//                         className={`
//                           group flex items-center gap-3 px-3 py-2 rounded-lg text-sm
//                           transition-all duration-200
//                           ${
//                             isActive
//                               ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
//                               : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
//                           }
//                         `}
//                       >
//                         {renderIcon(item.icon)}

//                         <span
//                           className={`
//                             whitespace-nowrap transition-all duration-200
//                             ${isExpanded ? "opacity-100" : "opacity-0 hidden"}
//                           `}
//                         >
//                           {item.title}
//                         </span>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </nav>

//           {/* FOOTER */}
//           <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//             <div
//               className={`
//                 text-sm text-gray-600 dark:text-gray-400
//                 transition-all duration-200
//                 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}
//               `}
//             >
//               <div className="font-medium capitalize">{role}</div>
//               <div className="text-xs">user@example.com</div>
//             </div>

//             {!isExpanded && (
//               <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mt-2" />
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* BACKDROP (same behavior as your original) */}
//       {isExpanded && (
//         <div
//           className="fixed inset-0 z-[50] bg-black/10 backdrop-blur-sm"
//           onClick={() => setIsExpanded(false)}
//         />
//       )}

//       {/* MAIN (unchanged functionality) */}
//       <main className="p-8 pl-16 min-h-screen">
//         {children}
//       </main>
//     </>
//   );
// }
