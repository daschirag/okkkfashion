"use client"

import { useState, useEffect } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile with more comprehensive detection
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        "ontouchstart" in window
      setIsMobile(isMobileDevice)
    }

    // Initial check
    checkMobile()

    // Only add event listeners if not mobile
    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY })
        })
      }

      const handleMouseEnter = () => setIsVisible(true)
      const handleMouseLeave = () => setIsVisible(false)

      document.addEventListener("mousemove", updatePosition, { passive: true })
      document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
      window.addEventListener("resize", checkMobile, { passive: true })
      document.body.style.cursor = "none"

      return () => {
        document.removeEventListener("mousemove", updatePosition)
        document.removeEventListener("mouseenter", handleMouseEnter)
        document.removeEventListener("mouseleave", handleMouseLeave)
        window.removeEventListener("resize", checkMobile)
        document.body.style.cursor = "auto"
      }
    } else {
      // Reset cursor style for mobile
      document.body.style.cursor = "auto"

      // Only listen for resize events on mobile
      window.addEventListener("resize", checkMobile, { passive: true })
      return () => {
        window.removeEventListener("resize", checkMobile)
      }
    }
  }, [isMobile])

  // Don't render anything if on mobile
  if (isMobile) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      {/* Outer white circle */}
      <div
        className={`absolute h-12 w-12 lg:h-16 lg:w-16 -translate-x-1/2 -translate-y-1/2 rounded-full 
          border-2 border-white/50 transition-opacity duration-300 ease-out will-change-transform
          ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) translateZ(0)`,
        }}
      />
      {/* Inner cursor dot */}
      <div
        className={`absolute h-1.5 w-1.5 lg:h-2 lg:w-2 -translate-x-1/2 -translate-y-1/2 rounded-full 
          bg-white transition-opacity duration-300 ease-out will-change-transform
          ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) translateZ(0)`,
        }}
      />
    </div>
  )
}

export default CustomCursor
