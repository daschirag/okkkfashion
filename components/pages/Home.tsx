"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Components
import { Images } from "@/components/Images"
import CustomCursor from "@/components/CustomCursor"
import Footer from "@/components/Footer"
import SplashScreen from "@/components/SplashScreen"
import SlideArrowButton from "@/components/Button"
import Navbar from "@/components/Navbar"

// Sections
import { About } from "@/sections/About"
import PinkSectionCarousel from "@/sections/PinkSectionCarousel"
import BigThreeImagesBandW from "@/sections/BigThreeImagesBandW"
import BigFourImages from "@/sections/BigFourImages"
import SketchSlider from "@/sections/SketchSlider"
import FashionIllustrations from "@/sections/FashionIllustrations"
import ModernServices from "@/sections/ModernServices"

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  // Scroll to a specific section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle immediate jump to projects section
  useEffect(() => {
    const shouldJumpToProjects = sessionStorage.getItem("jumpToProjects") === "true"

    if (shouldJumpToProjects) {
      sessionStorage.removeItem("jumpToProjects")

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const projectsSection = document.getElementById("projects-section")
        if (projectsSection) {
          // Instant jump - no smooth scrolling
          window.scrollTo({
            top: projectsSection.offsetTop - 100,
            behavior: "instant",
          })
        }
      })
    }
  }, [])

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully")
        setVideoError(false)
      }

      const handleError = (e: Event) => {
        console.error("Video failed to load:", e)
        setVideoError(true)
      }

      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("error", handleError)
      }
    }
  }, [])

  return (
    <div
      className="min-h-screen w-full overflow-y-clip overflow-x-hidden mx-auto bg-black text-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(233, 0, 116, 0.25) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(233, 0, 116, 0.25) 1px, transparent 1px)`,
        backgroundSize: "200px 200px",
        backgroundPosition: "center center",
      }}
    >
      <SplashScreen />
      <CustomCursor />

      {/* Header - Enhanced Responsiveness */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-between items-center py-4 px-4 sm:py-6 sm:px-6 lg:px-8"
      >
        <div className="flex-shrink-0">
          <Image
            src="/images/final-small-logo.svg"
            alt="small logo"
            width={120}
            height={40}
            className="w-20 h-auto sm:w-24 md:w-28 lg:w-32"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* View Splash Button - Hidden on small mobile */}
          <motion.button
            onClick={() => {
              sessionStorage.removeItem("hasSeenSplash")
              window.location.reload()
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 text-xs lg:text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lg:w-4 lg:h-4"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            <span className="hidden md:inline">Replay Intro</span>
          </motion.button>

          <div onClick={() => scrollToSection(contactRef)}>
            <SlideArrowButton />
          </div>
        </div>
      </motion.header>

      {/* Main Section */}
      <main>
        {/* Logo Section - Enhanced Responsiveness */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-4 sm:mt-0 lg:mt-[-20px] w-[160px] sm:w-[240px] md:w-[320px] lg:w-[400px] px-4"
        >
          <Image src="/images/final-Big-logo.svg" alt="big logo" width={500} height={200} className="w-full h-auto" />
        </motion.div>

        {/* Images Component */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Images />
        </div>
      </main>

      {/* Navbar - Enhanced Mobile Positioning */}
      <div className="relative z-40">
        <Navbar
          scrollToSection={scrollToSection}
          aboutRef={aboutRef}
          servicesRef={servicesRef}
          workRef={workRef}
          contactRef={contactRef}
        />
      </div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 30 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.0 }}
        className="font-[Poppins] mx-auto max-w-full px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24 text-center lg:text-left"
        ref={aboutRef}
      >
        <About />
      </motion.div>

      {/* Fashion Illustrations Section */}
      <div className="mt-20 sm:mt-32 lg:mt-40">
        <FashionIllustrations />
      </div>

      {/* Miley Collection Section - Enhanced Responsiveness */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 30 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.0 }}
        className="relative bg-pink-500 min-h-screen w-full rounded-t-[30px] sm:rounded-t-[50px] lg:rounded-t-[100px] xl:rounded-t-[350px] overflow-hidden mt-16 sm:mt-20 lg:mt-24"
        id="miley-collection"
        ref={workRef}
      >
        {/* Background Video with Fallback */}
        <div className="absolute inset-0">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 sm:opacity-30 lg:opacity-40"
              onError={() => setVideoError(true)}
            >
              <source src="/videos/background.mp4" type="video/mp4" />
              <source src="https://blob.v0.dev/background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            // Fallback: Animated gradient background
            <div
              className="w-full h-full opacity-20 sm:opacity-30 lg:opacity-40"
              style={{
                background: `
                  linear-gradient(45deg, 
                    rgba(233, 0, 116, 0.8) 0%, 
                    rgba(196, 113, 237, 0.8) 25%, 
                    rgba(233, 0, 116, 0.8) 50%, 
                    rgba(196, 113, 237, 0.8) 75%, 
                    rgba(233, 0, 116, 0.8) 100%
                  )`,
                backgroundSize: "400% 400%",
                animation: "gradientShift 8s ease infinite",
              }}
            />
          )}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
          {/* Title & Carousel Wrapper - aligned */}
          <div className="w-full max-w-6xl mx-auto">
            {/* Title Section - Aligned with Carousel */}
            <div className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 pl-2 sm:pl-4">
              {/* Title Image */}
              <div className="mb-8 sm:mb-12 lg:mb-16">
                <Image
                  src="/images/MILEY-COLLECTION.png"
                  alt="Miley Collection"
                  width={600}
                  height={150}
                  className="w-auto h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32"
                  priority
                />
              </div>

              {/* Description Text */}
              <div className="max-w-2xl">
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white leading-relaxed">
                  From her days as a Disney superstar to the fearless rebel breaking societal norms, this collection
                  captures the nostalgic echoes of her evolution
                </p>
              </div>
            </div>

            {/* Carousel Section */}
            <div className="w-full bg-pink-900/30 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 xl:p-6">
              <PinkSectionCarousel />
            </div>
          </div>

          {/* Images Section */}
          <div className="mt-12 sm:mt-16 lg:mt-24 xl:mt-32">
            <BigThreeImagesBandW />
          </div>
        </div>
      </motion.div>

      {/* Projects Section */}
      <div
        className="mt-20 sm:mt-32 lg:mt-40"
        id="projects-section"
        ref={projectsRef}
        style={{ scrollMarginTop: "100px" }}
      >
        <div className="flex flex-row gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8">
          <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-5 bg-white flex-shrink-0"></div>
          <Image
            src="/images/projects-text.svg"
            alt="projectText"
            width={200}
            height={50}
            className="w-auto h-8 sm:h-10 lg:h-12 -translate-y-2 sm:-translate-y-3 lg:-translate-y-5"
          />
        </div>
        <BigFourImages />
      </div>

      {/* Modern Services Section */}
      <div className="mt-20 sm:mt-32 lg:mt-40" ref={servicesRef}>
        <ModernServices contactRef={contactRef} scrollToSection={scrollToSection} />
      </div>

      {/* Contact Section */}
      <div className="mt-20 sm:mt-32 lg:mt-40" ref={contactRef}>
        <SketchSlider />
      </div>

      {/* Footer */}
      <div>
        <Footer
          scrollToSection={scrollToSection}
          contactRef={contactRef}
          aboutRef={aboutRef}
          workRef={workRef}
          servicesRef={servicesRef}
        />
      </div>

      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
