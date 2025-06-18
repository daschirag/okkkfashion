"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"

export default function SplashScreen() {
  const shouldReduceMotion = useReducedMotion()

  // Use sessionStorage to persist the "hasSeenSplash" state for the duration of the browser session
  const [isVisible, setIsVisible] = useState(() => {
    // Check if we've already shown the splash screen in this session
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hasSeenSplash") !== "true"
    }
    return true
  })

  const [animationStep, setAnimationStep] = useState(0)

  // Optimized animation timing configuration (in milliseconds)
  // Faster and smoother for both desktop and mobile
  const timings = {
    lineMove: shouldReduceMotion ? 600 : 800, // Faster line movement
    expand: shouldReduceMotion ? 400 : 500, // Quicker expansion
    logoFadeIn: shouldReduceMotion ? 300 : 400, // Faster logo fade in
    logoVisible: shouldReduceMotion ? 400 : 600, // Shorter logo display time
    logoFadeOut: shouldReduceMotion ? 200 : 300, // Quicker fade out
    compress: shouldReduceMotion ? 300 : 400, // Faster compression
    exit: shouldReduceMotion ? 100 : 200, // Quick exit
  }

  useEffect(() => {
    // Handle browser navigation (back/forward)
    const handlePopState = () => {
      // If returning from a project page, skip splash screen
      setIsVisible(false)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    // If we should skip the splash screen, exit immediately
    if (!isVisible) {
      return
    }

    // Mark that we've shown the splash screen in this session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenSplash", "true")
    }

    // Optimized animation sequence with smoother transitions
    const step1 = setTimeout(() => setAnimationStep(1), timings.lineMove)
    const step2 = setTimeout(() => setAnimationStep(2), timings.lineMove + timings.expand)
    const step3 = setTimeout(() => setAnimationStep(3), timings.lineMove + timings.expand + timings.logoFadeIn)
    const step4 = setTimeout(
      () => setAnimationStep(4),
      timings.lineMove + timings.expand + timings.logoFadeIn + timings.logoVisible,
    )
    const step5 = setTimeout(
      () => setAnimationStep(5),
      timings.lineMove + timings.expand + timings.logoFadeIn + timings.logoVisible + timings.logoFadeOut,
    )

    // Final step: Hide splash screen
    const finalStep = setTimeout(
      () => setIsVisible(false),
      timings.lineMove +
        timings.expand +
        timings.logoFadeIn +
        timings.logoVisible +
        timings.logoFadeOut +
        timings.compress +
        timings.exit,
    )

    return () => {
      clearTimeout(step1)
      clearTimeout(step2)
      clearTimeout(step3)
      clearTimeout(step4)
      clearTimeout(step5)
      clearTimeout(finalStep)
    }
  }, [isVisible])

  // Optimized easing functions for smoother animations
  const smoothEasing = [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smooth motion
  const quickEasing = [0.4, 0, 0.2, 1] // Material Design standard easing

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: timings.exit / 1000, ease: quickEasing }}
        >
          {/* Step 0: Horizontal line moving across */}
          {animationStep === 0 && (
            <motion.div
              className="absolute top-1/2 h-[2px] bg-[#E90074] will-change-transform"
              initial={{ left: 0, width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: timings.lineMove / 1000,
                ease: smoothEasing,
              }}
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            />
          )}

          {/* Step 1: Line expands to fill screen */}
          {animationStep === 1 && (
            <motion.div
              className="absolute bg-[#E90074] will-change-transform"
              initial={{ top: "calc(50% - 1px)", left: 0, right: 0, height: "2px" }}
              animate={{ top: 0, height: "100%" }}
              transition={{
                duration: timings.expand / 1000,
                ease: smoothEasing,
              }}
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            />
          )}

          {/* Step 2-4: Pink background with optimized rendering */}
          {(animationStep === 2 || animationStep === 3 || animationStep === 4) && (
            <motion.div
              className="absolute inset-0 bg-[#E90074]"
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            />
          )}

          {/* Logo with optimized animations */}
          {(animationStep === 2 || animationStep === 3 || animationStep === 4) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: animationStep === 2 ? 1 : animationStep === 3 ? 1 : 0,
                scale: animationStep === 2 ? 1 : animationStep === 3 ? 1 : 0.9,
              }}
              transition={{
                duration:
                  animationStep === 2
                    ? timings.logoFadeIn / 1000
                    : animationStep === 4
                      ? timings.logoFadeOut / 1000
                      : 0,
                ease: animationStep === 4 ? quickEasing : smoothEasing,
              }}
              className="relative z-10 will-change-transform"
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            >
              <Image
                src="/images/final-Big-logo.svg"
                alt="Logo"
                width={400}
                height={200}
                className="w-[150px] md:w-[220px] lg:w-[300px]" // Medium responsive sizing
                priority
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))", // Subtle shadow for depth
                }}
              />
            </motion.div>
          )}

          {/* Step 5: Screen compresses to vertical line with smooth animation */}
          {animationStep === 5 && (
            <motion.div
              className="absolute inset-0 bg-[#E90074] will-change-transform"
              animate={{
                left: "calc(50% - 1px)",
                right: "calc(50% - 1px)",
                width: "2px",
              }}
              transition={{
                duration: timings.compress / 1000,
                ease: quickEasing,
              }}
              style={{ transform: "translateZ(0)" }} // Hardware acceleration
            />
          )}

          {/* Subtle glow effect for enhanced visual appeal */}
          {(animationStep === 2 || animationStep === 3) && !shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-[#E90074] via-[#E90074] to-transparent opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ transform: "translateZ(0)" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
