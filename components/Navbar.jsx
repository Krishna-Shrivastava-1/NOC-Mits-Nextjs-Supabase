"use client"

import React, { useEffect, useState, useRef } from "react"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image"

const Navbar = () => {
  const [show, setShow] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // If we are at the very top, always show
      if (currentScrollY < 10) {
        setShow(true)
        lastScrollY.current = currentScrollY
        return
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current) {
        setShow(false) // Scrolling down
      } else {
        setShow(true)  // Scrolling up
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out"
      style={{ 
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        visibility: show ? 'visible' : 'hidden',
        transitionProperty: 'transform, visibility'
      }}
    >
      <div className="h-16 border-b flex items-center px-8 bg-card  backdrop-blur-md shadow-sm">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer select-none">
        
          <Image width={60} height={20} src="https://sdms.mitsgwalior.in/images/mits.png" alt="logo" />
          <h1 className="font-bold select-none">NOC MITS</h1>

        
          </div>
          <div className="flex gap-8 text-sm font-medium gap-x-6">
            <ModeToggle />
            <a href="/login">Login</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar