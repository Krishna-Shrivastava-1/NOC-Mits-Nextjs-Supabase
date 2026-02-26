// components/GlobalSidebarWrapper.jsx
"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import LeafyGreenSidebar from "./LeafyGreenSidebar"

export default function GlobalSidebarWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState("student")
  // Initialize from localStorage immediately if possible to avoid flicker
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Sync UI state from localStorage (faster than cookies for client-side)
    const savedState = localStorage.getItem("sidebar-open")
    if (savedState !== null) {
      setIsOpen(savedState === "true")
    }

    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const userRole = user?.user_metadata?.role || "student"
        setRole(userRole)
      }
    }
    getUserData()
  }, [])

  const toggleSidebar = (state) => {
    setIsOpen(state)
    localStorage.setItem("sidebar-open", state)
  }

  // Prevent hydration mismatch by not rendering sidebar until mounted
  // But keep the 'children' visible so the page doesn't go blank
  return (
    <div className="flex min-h-screen">
      <aside
        onMouseEnter={() => toggleSidebar(true)}
        onMouseLeave={() => toggleSidebar(false)}
        className={`fixed top-0 left-0 z-[9999] h-screen transition-all duration-300 ease-in-out bg-white border-r shadow-2xl ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {isMounted && (
          <LeafyGreenSidebar 
            role={role}
            userEmail={user?.email || ""}
            isOpen={isOpen}
          />
        )}
      </aside>

      {/* Push content to the right so it doesn't get covered */}
      <main className={`flex-1 transition-all duration-300 ${isOpen ? "pl-64" : "pl-16"}`}>
        {children}
      </main>
    </div>
  )
}