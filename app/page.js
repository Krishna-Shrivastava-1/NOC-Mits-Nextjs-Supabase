"use client"

import Navbar from "@/components/Navbar"
import LandingPageHeroSection from "@/components/LandingPageHeroSection"
import FeaturesSection from "@/components/FeaturesSection"

import StatsSection from "@/components/StatsSection"

import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-hidden">
        <LandingPageHeroSection />
        <FeaturesSection />
        <StatsSection />
      
        <Footer />
      </main>
    </>
  )
}