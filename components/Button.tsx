"use client"

import { motion } from "framer-motion"
import type React from "react"
import { ArrowRight } from "lucide-react"

interface SlideArrowButtonProps {
  text?: string
  primaryColor?: string
  className?: string
  contactRef?: React.RefObject<HTMLDivElement>
  scrollToSection?: (ref: React.RefObject<HTMLDivElement>) => void
  [key: string]: any
}

export default function SlideArrowButton({
  text = "Let's talk",
  primaryColor = "#E91E63",
  className = "",
  contactRef,
  scrollToSection,
  ...props
}: SlideArrowButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => scrollToSection && contactRef && scrollToSection(contactRef)}
      className={`group relative border border-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-4 text-sm sm:text-base md:text-lg lg:text-xl font-extrathin transition-all duration-300 ease-in-out hover:border-transparent touch-manipulation ${className}`}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full w-0 transition-all duration-300 ease-in-out group-hover:w-full"
        style={{ backgroundColor: primaryColor }}
      />
      <span className="relative z-10 flex items-center gap-1 sm:gap-2 text-white transition-all duration-300">
        <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{text}</span>
        <ArrowRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 font-light" />
      </span>
    </motion.button>
  )
}
