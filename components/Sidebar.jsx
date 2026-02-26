// components/sidebar.jsx

"use client"

import { cn } from "@/lib/utils"
import { Home, Settings, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn(
        "fixed top-0 left-0 h-screen bg-background border-r shadow-sm z-50",
        "transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full p-3 space-y-4">

        <SidebarItem icon={<Home size={20} />} label="Dashboard" isOpen={isOpen} />
        <SidebarItem icon={<User size={20} />} label="Users" isOpen={isOpen} />
        <SidebarItem icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />

      </div>
    </div>
  )
}

function SidebarItem({ icon, label, isOpen }) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted transition-colors"
    >
      {icon}
      <span
        className={cn(
          "text-sm whitespace-nowrap transition-all duration-200",
          isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
        )}
      >
        {label}
      </span>
    </Link>
  )
}
