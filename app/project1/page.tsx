"use client"

import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SlideArrowButton from "@/components/Button"
import BackToProjectsButton from "@/components/BackToProjectsButton"
import { useEffect } from "react"

export default function Project1Page() {
  useEffect(() => {
    // Mark that we've seen the splash screen
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenSplash", "true")

      // When this component mounts, set up a handler for when the user navigates away
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // This only runs on page refresh/close, not on navigation
        // We don't need to do anything special here
      }

      // Handle the case when user clicks the back button
      const handlePopState = () => {
        // If navigating back, set the flag to scroll to projects
        sessionStorage.setItem("scrollToProjects", "true")
      }

      window.addEventListener("beforeunload", handleBeforeUnload)
      window.addEventListener("popstate", handlePopState)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [])

  return (
    <div className="min-h-screen overflow-y-clip bg-black text-white">
      <header className="flex mt-5 ml-3 justify-between items-center px-4 sm:px-6">
        <BackToProjectsButton theme="maniac" variant="text" className="backdrop-blur-lg shadow-lg" />
        <SlideArrowButton className="mr-5" />
      </header>
      <Navbar
        scrollToSection={() => {}}
        aboutRef={{ current: null }}
        servicesRef={{ current: null }}
        workRef={{ current: null }}
        contactRef={{ current: null }}
      />

      {/* Hero Section with Images */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Left Image */}
          <div className="w-full lg:w-[30%] h-[300px] sm:h-[400px] lg:h-[500px] relative overflow-hidden rounded-lg">
            <Image
              src="/images/ManiacBikerLeftImage.png"
              width={500}
              height={500}
              alt="Maniac Biker Jacket - Left View"
              className="w-full h-full object-contain md:object-cover object-center"
              priority
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[70%] flex flex-col">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative overflow-hidden rounded-lg mb-4 lg:mb-6">
              <Image
                src="/images/ManiacBikerRightImage.png"
                width={800}
                height={500}
                alt="Maniac Biker Jacket - Right View"
                className="w-full h-full object-contain md:object-cover object-center"
                priority
              />
            </div>

            {/* Timeline and Title Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex-shrink-0 flex justify-start">
                {" "}
                {/* Added flex justify-start */}
                <Image
                  src="/images/MANIAC-BIKER-JACKET.png"
                  width={600}
                  height={100}
                  alt="Maniac Biker Jacket Title"
                  className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] h-auto"
                />
              </div>
              <div className="order-1 sm:order-2 flex-shrink-0">
                <Image
                  src="/images/TimeLine.png"
                  width={200}
                  height={50}
                  alt="Project Timeline"
                  className="w-full max-w-[150px] sm:max-w-[180px] lg:max-w-[200px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Details - Enhanced Typography */}
        <div className="max-w-5xl mx-auto space-y-12 lg:space-y-16 px-4 sm:px-6 mb-16 lg:mb-24">
          {/* Section 1 */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-700/30 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-wide">Leather Design</h3>
            </div>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200 font-light tracking-wide">
              The jacket pays homage to Eddie Munson's iconic look from Stranger Things, making it a must-have for fans
              seeking a slice of Hawkins inspired fashion.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-700/30 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white tracking-wide">
                Concept & Design Brief
              </h3>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="border-l-2 border-pink-500/50 pl-6">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200 font-light tracking-wide">
                  <span className="font-medium text-pink-400 text-lg sm:text-xl lg:text-2xl">Brief:</span>{" "}
                  <span className="ml-2">
                    Construct a unisex jacket inspired by your favorite character using leather or its alternatives.
                  </span>
                </p>
              </div>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200 font-light tracking-wide">
                This is for someone who can identify with Eddie's personality: anti-institutional, expressionist, and
                rebellious. Eddie stood up for the fundamental ideals of love and friendship despite constantly being
                criticized by society.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer
        scrollToSection={() => {}}
        aboutRef={{ current: null }}
        contactRef={{ current: null }}
        workRef={{ current: null }}
        servicesRef={{ current: null }}
      />
    </div>
  )
}
