"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface NavbarProps {
  scrollToSection?: (ref: React.RefObject<HTMLDivElement>) => void
  aboutRef?: React.RefObject<HTMLDivElement>
  servicesRef?: React.RefObject<HTMLDivElement>
  workRef?: React.RefObject<HTMLDivElement>
  contactRef?: React.RefObject<HTMLDivElement>
}

const Navbar = ({
  scrollToSection = () => {},
  aboutRef = { current: null },
  servicesRef = { current: null },
  workRef = { current: null },
  contactRef = { current: null },
}: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        // Show navbar when scrolling up or at top
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsVisible(true)
        } else {
          // Hide navbar when scrolling down
          setIsVisible(false)
        }

        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-4 left-0 right-0 flex justify-center items-center z-50 px-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      <div className="bg-[#2424248C] gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-[40px] rounded-[8px] sm:rounded-[10px] font-[Poppins] p-2 sm:p-3 lg:p-4 xl:p-5 backdrop-blur-md w-[240px] sm:w-[280px] md:w-[350px] lg:w-[420px] xl:w-[497px] h-[28px] sm:h-[32px] md:h-[36px] lg:h-[38px] xl:h-[40px] z-30 flex text-white justify-between items-center text-xs sm:text-sm lg:text-base">
        <button
          onClick={() => scrollToSection(aboutRef)}
          className="hover:text-pink-400 transition-colors touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center px-1 sm:px-2"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection(servicesRef)}
          className="hover:text-pink-400 transition-colors touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center px-1 sm:px-2"
        >
          Services
        </button>
        <button
          onClick={() => scrollToSection(workRef)}
          className="hover:text-pink-400 transition-colors touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center px-1 sm:px-2"
        >
          Work
        </button>
        <button
          onClick={() => scrollToSection(contactRef)}
          className="hover:text-pink-400 transition-colors touch-manipulation min-h-[44px] sm:min-h-0 flex items-center justify-center px-1 sm:px-2"
        >
          Contact
        </button>
      </div>
    </div>
  )
}

export default Navbar
