"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { sendContactEmail, type ContactFormData } from "@/actions/send-email"

const CarouselBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const speedRef = useRef<number>(0.08) // Reduced speed for mobile performance
  const positionRef = useRef<number>(0)
  const isResettingRef = useRef<boolean>(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const images = [
    "/images/slider-image1.png",
    "/images/slider-image2.png",
    "/images/slider-image3.png",
    "/images/slider-image4.png",
  ]

  // Calculate dimensions based on screen size
  const imageWidth = isMobile ? 200 : 400
  const gapWidth = isMobile ? 16 : 32
  const itemWidth = imageWidth + gapWidth
  const singleSetWidth = images.length * itemWidth

  // Reduce sets for mobile performance
  const numSets = isMobile ? 2 : 3
  const allImages = Array(numSets).fill(images).flat()

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return
    containerRef.current.style.transform = `translateX(${positionRef.current}px)`
  }, [])

  const handleInfiniteLoop = useCallback(() => {
    if (!containerRef.current || isResettingRef.current) return

    if (positionRef.current < -singleSetWidth) {
      isResettingRef.current = true
      containerRef.current.style.transition = "none"
      positionRef.current += singleSetWidth
      updatePosition()

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "transform 0.08s linear"
          isResettingRef.current = false
        }
      }, 10)
    }
  }, [singleSetWidth, updatePosition])

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time
      }

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isResettingRef.current) {
        positionRef.current -= speedRef.current * deltaTime
        updatePosition()
        handleInfiniteLoop()
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [updatePosition, handleInfiniteLoop],
  )

  useEffect(() => {
    positionRef.current = 0
    updatePosition()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, updatePosition])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-4 md:gap-8 absolute will-change-transform"
        style={{
          transform: `translateX(0px)`,
          transition: "transform 0.08s linear",
        }}
      >
        {allImages.map((src, index) => (
          <div key={index} className="w-[200px] md:w-[400px] h-[200px] md:h-[400px] flex-shrink-0 relative">
            <Image
              src={src || "/placeholder.svg"}
              alt={`Carousel item ${index}`}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 200px, 400px"
              className="object-cover rounded-lg filter grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const ContactForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    message: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [validationError, setValidationError] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("")
    }
  }

  const handleNext = () => {
    if (step === 0 && formData.name.trim()) {
      setStep(1)
    } else if (step === 1 && formData.message.trim()) {
      setStep(2)
    }
  }

  const handleClick = () => {
    // Validate current step before proceeding
    if (step === 0) {
      if (!formData.name.trim()) {
        setValidationError("Please fill out all fields")
        return
      }
      setStep(1)
    } else if (step === 1) {
      if (!formData.message.trim()) {
        setValidationError("Please fill out all fields")
        return
      }
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation on submit
    if (!formData.name || !formData.message || !formData.email) {
      setValidationError("Please fill out all fields")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setValidationError("")

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        })

        setTimeout(() => {
          setFormData({
            name: "",
            message: "",
            email: "",
          })
          setStep(0)
          setSubmitStatus(null)
          setValidationError("")
        }, 3000)
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinalSubmit = () => {
    // Validate email field when clicking arrow on final step
    if (!formData.email.trim()) {
      setValidationError("Please fill out all fields")
      return
    }

    // If email is filled, proceed with form submission
    const form = document.querySelector("form") as HTMLFormElement
    if (form) {
      form.requestSubmit()
    }
  }

  return (
    <div className="relative min-h-[50vh] md:min-h-screen translate-y-10 md:translate-y-20 z-10 max-w-6xl mx-auto px-4 md:px-6">
      <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 md:p-[60px] text-white max-w-4xl mx-auto">
        <div className="relative w-full max-w-[900px] h-[120px] sm:h-[160px] md:h-[200px] lg:h-[250px] xl:h-[300px] mx-auto">
          <Image
            src="/images/WANNA-CREATE-SOMETHING.svg"
            alt="wanna create something"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 600px, (max-width: 768px) 700px, (max-width: 1024px) 800px, 900px"
          />
        </div>

        <p className="text-center -translate-y-6 md:-translate-y-10 lg:-translate-y-20 text-base md:text-lg mt-6 md:mt-10 mb-6 md:mb-8">
          Let's connect
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            {step === 0 && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full placeholder:text-center bg-gray-800/50 backdrop-blur rounded-lg pl-4 pr-20 py-4 sm:py-6 md:py-8 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              />
            )}
            {step === 1 && (
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full placeholder:text-center bg-gray-800/50 backdrop-blur rounded-lg pl-4 pr-20 py-4 sm:py-6 md:py-8 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px] text-sm sm:text-base resize-none"
              />
            )}
            {step === 2 && (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full placeholder:text-center bg-gray-800/50 backdrop-blur rounded-lg pl-4 pr-20 py-4 sm:py-6 md:py-8 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              />
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={handleClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-[#E90074] hover:bg-pink-500 text-white flex items-center justify-center rounded-sm touch-manipulation transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-[#E90074] hover:bg-pink-500 disabled:bg-pink-300 text-white flex items-center justify-center rounded-sm touch-manipulation transition-colors duration-200"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="text-center mt-4 p-3 rounded-md bg-red-500/20 text-red-300 max-w-xl mx-auto">
              {validationError}
            </div>
          )}

          {/* Submit Status Message */}
          {submitStatus && (
            <div
              className={`text-center mt-4 p-3 rounded-md max-w-xl mx-auto ${
                submitStatus.success ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="flex gap-2 justify-center mt-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${step === index ? "bg-pink-500" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}

const SketchSlider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[50vh] md:min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16 md:pt-32"
    >
      <CarouselBackground />
      <ContactForm />
    </motion.div>
  )
}

export default SketchSlider
