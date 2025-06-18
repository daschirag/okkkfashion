"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export const Images = () => {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position for animation
  const { scrollY } = useScroll()
  const [scrollThreshold, setScrollThreshold] = useState(200)

  // Calculate threshold based on viewport height
  useEffect(() => {
    setScrollThreshold(window.innerHeight * 0.2) // 20% of viewport height
  }, [])

  // Transform values based on scroll position
  const leftImageX = useTransform(scrollY, [0, scrollThreshold], [0, isMobile ? -100 : -295])

  const leftImageY = useTransform(scrollY, [0, scrollThreshold], [0, -10])

  const leftImageRotate = useTransform(scrollY, [0, scrollThreshold], [0, 3])

  const rightImageX = useTransform(scrollY, [0, scrollThreshold], [0, isMobile ? 100 : 250])

  const rightImageY = useTransform(scrollY, [0, scrollThreshold], [0, 10])

  const rightImageRotate = useTransform(scrollY, [0, scrollThreshold], [0, 5])

  // Check if the device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 3 }}
      className={`flex justify-center mx-auto relative h-[300px] md:h-[700px] items-center`}
    >
      {/* Left Image - Position controlled by scroll */}
      <motion.div
        className="absolute"
        style={{
          x: leftImageX,
          y: leftImageY,
          rotate: leftImageRotate,
          originY: 1, // Origin at bottom for rotation
        }}
      >
        <Image
          alt="image3"
          src="/images/image-4.png"
          width={564}
          height={650}
          className={`w-[200px] h-[250px] md:w-[564px] md:h-[650px] transform transition-all duration-300
                hover:translate-x-[-10px] hover:translate-y-[-5px] hover:rotate-[1deg]`}
          priority
        />
      </motion.div>

      {/* Center Image - Always visible and centered */}
      <Image
        alt="image1"
        src="/images/image-1.png"
        width={500}
        height={606}
        className={`w-[180px] h-[220px] md:w-[500px] md:h-[606px] absolute transform transition-all duration-500 z-10
              scale-100 hover:scale-105`}
        priority
      />

      {/* Right Image - Position controlled by scroll */}
      <motion.div
        className="absolute"
        style={{
          x: rightImageX,
          y: rightImageY,
          rotate: rightImageRotate,
          originY: 1, // Origin at bottom for rotation
        }}
      >
        <Image
          alt="image2"
          src="/images/image-3.png"
          width={564}
          height={650}
          className={`w-[200px] h-[250px] md:w-[564px] md:h-[650px] transform transition-all duration-300
                hover:translate-x-[10px] hover:translate-y-[5px] hover:rotate-[1deg]`}
          priority
        />
      </motion.div>
    </motion.div>
  )
}
