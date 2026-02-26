// components/LeafyGreenSidebar.jsx
"use client"
import React from 'react'
import {
  SideNav,
  SideNavItem,
  SideNavGroup,
} from '@leafygreen-ui/side-nav'
import * as Icons from "@tabler/icons-react"

// ✅ Your EXACT navigation routes with icons
const navigationData = {
  "tp_admin": {
    navMain: [
      {
        title: "Administration",
        icon: "IconSchool",
        items: [
          { title: "Dashboard", href: "/dashboard/tp-admin" },
          { title: "Manage Users", href: "/dashboard/tp-admin/users" },
          { title: "Add New User", href: "/dashboard/tp-admin/add-user" },
        ],
      },
      {
        title: "NOC Management",
        icon: "IconChecklist", 
        items: [
          { title: "Pending T&P Approval", href: "/dashboard/tp-admin/pending" },
          { title: "All Records", href: "/dashboard/tp-admin/all-requests" },
        ],
      },
    ],
  },
  "teacher": {
    navMain: [
      {
        title: "Department",
        icon: "IconBuildingCommunity",
        items: [
          { title: "Overview", href: "/dashboard/teacher" },
          { title: "Student List", href: "/dashboard/teacher/students" },
        ],
      },
      {
        title: "Approvals",
        icon: "IconFileText",
        items: [
          { title: "Pending Requests", href: "/dashboard/teacher/requests" },
          { title: "Approved by Me", href: "/dashboard/teacher/history" },
        ],
      },
    ],
  },
  "student": {
    navMain: [
      {
        title: "NOC Services",
        icon: "IconCertificate",
        items: [
          { title: "My Dashboard", href: "/dashboard/student" },
          { title: "New NOC Request", href: "/dashboard/student/new" },
          { title: "Track Status", href: "/dashboard/student/status" },
        ],
      },
      {
        title: "History",
        icon: "IconHistory",
        items: [{ title: "Previous NOCs", href: "/dashboard/student/history" }],
      },
    ],
  },
}

export default function LeafyGreenSidebar({ role, userEmail, isOpen }) {
  const currentNav = navigationData[role] || navigationData.student

  // Icon renderer
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName]
    if (!IconComponent) return null
    return React.createElement(IconComponent, { className: "size-4", strokeWidth: 2 })
  }

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <SideNav 
        widthOverride={isOpen ? 256 : 64}
        className="h-full"
      >
        {currentNav.navMain.map((item, index) => (
          <SideNavGroup
            key={item.title || index}
            header={
              <div className="flex items-center gap-2 p-2">
                {renderIcon(item.icon)}
                {isOpen && <span>{item.title}</span>}
              </div>
            }
          >
            {item.items.map((subItem) => (
              <SideNavItem key={subItem.href} href={subItem.href}>
                {subItem.title}
              </SideNavItem>
            ))}
          </SideNavGroup>
        ))}
      </SideNav>
      
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        {isOpen ? (
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 truncate" title={userEmail}>
              {userEmail}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto" />
        )}
      </div>
    </div>
  )
}
