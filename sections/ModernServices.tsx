"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Palette, Scissors, Gem } from "lucide-react"
import SlideArrowButton from "@/components/Button" // Assuming this is the correct import for your button
// Removed: import Image from "next/image" // No longer needed for the heading

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
  color: string
  gradient: string
}

interface ModernServicesProps {
  contactRef?: React.RefObject<HTMLDivElement>
  scrollToSection?: (ref: React.RefObject<HTMLDivElement>) => void
}

const ModernServices = ({ contactRef, scrollToSection }: ModernServicesProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile, { passive: true })
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const services: ServiceCard[] = [
    {
      id: "styling",
      title: "",
      description: "",
      icon: <Scissors className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      image: "/images/blueedyt.png",
      color: "#ff6b9d",
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      id: "art",
      title: "",
      description: "",
      icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      image: "/images/service-image.png",
      color: "#c471ed",
      gradient: "from-purple-500/20 to-violet-500/20",
    },
    {
      id: "accessories",
      title: "",
      description: "",
      icon: <Gem className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      image: "/images/mask-group.png",
      color: "#ff6b9d",
      gradient: "from-pink-500/20 to-purple-500/20",
    },
  ]

  // Reduced particles for mobile performance
  const particles = Array.from({ length: isMobile ? 20 : 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      setIsLoaded(true)
    }
  }, [isInView, controls])

  // Handle book consultation click
  const handleBookConsultation = () => {
    if (scrollToSection && contactRef) {
      scrollToSection(contactRef)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      } as any,
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      } as any,
    },
  }

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.42, 0, 0.58, 1],
      } as any,
    },
  }

  const particleVariants = {
    animate: (custom: any) => ({
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: custom.duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: [0.42, 0, 0.58, 1],
        delay: custom.delay,
      } as any,
    }) as any,
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      {/* Animated Particle Background - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: particle.x + '%',
              top: particle.y + '%',
              width: particle.size + 'px',
              height: particle.size + 'px',
            }}
            variants={particleVariants}
            animate="animate"
            custom={particle}
          />
        ))}
      </div>

      {/* Gradient Orbs - Reduced on mobile */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full opacity-10 sm:opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ff6b9d 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-10 sm:opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #c471ed 0%, transparent 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start gap-4 mb-12 sm:mb-14 lg:mb-16 text-white px-4 md:px-20 md:translate-x-24"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Replaced the Image component with an h2 tag */}
          <h2 className="text-3xl md:text-4xl font-bold">SERVICES</h2>
        </motion.div>

        {/* Services Grid - Responsive */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative"
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{
                scale: isMobile ? 1 : 1.02,
                y: isMobile ? 0 : -5,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Floating Animation Container - Reduced on mobile */}
              <motion.div variants={isMobile ? {} : floatingVariants} animate={isMobile ? "" : "animate"}>
                {/* Card Container */}
                <div
                  className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}20 0%, transparent 50%)`,
                      boxShadow: `0 0 40px ${service.color}40`,
                    }}
                  />

                  {/* Image Section */}
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    {service.id === "styling" || service.id === "art" ? ( // Apply object-contain to both styling and art
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain transition-transform duration-700"
                        style={{
                          filter: "grayscale(20%)",
                        }}
                        whileHover={{
                          scale: isMobile ? 1 : 1.05,
                          filter: "grayscale(0%)",
                        }}
                      />
                    ) : (
                      <motion.div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700"
                        style={{
                          backgroundImage: `url('${service.image}')`,
                          filter: "grayscale(20%)",
                        }}
                        whileHover={{
                          scale: isMobile ? 1 : 1.1,
                          filter: "grayscale(0%)",
                        }}
                      />
                    )}

                    {/* Image Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${service.gradient} to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300`}
                    />

                    {/* Service Icon */}
                    <motion.div
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full backdrop-blur-md"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: service.color + "40",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ color: service.color }}>{service.icon}</div>
                    </motion.div>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400"
                      initial={{ width: "0%" }}
                      animate={{
                        width: hoveredCard === service.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 lg:p-8 relative">
                    {/* Special content for all service cards */}
                    {service.id === "styling" ? (
                      <div className="flex justify-center items-center h-full">
                        <img
                          src="/images/service-custom-order.svg"
                          alt="Custom Order Service"
                          className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] h-auto"
                        />
                      </div>
                    ) : service.id === "art" ? (
                      <div className="flex justify-center items-center h-full">
                        <img
                          src="/images/service-illustration-design.svg"
                          alt="Illustration Design Service"
                          className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] h-auto"
                        />
                      </div>
                    ) : service.id === "accessories" ? (
                      <div className="flex justify-center items-center h-full">
                        <img
                          src="/images/service-personal-labels.png"
                          alt="Personal Labels Service"
                          className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] h-auto"
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* Shimmer Effect - Disabled on mobile for performance */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: hoveredCard === service.id ? ["0%", "100%"] : "0%",
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: hoveredCard === service.id ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 2,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Call to Action - Centered */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={() => scrollToSection && contactRef && scrollToSection(contactRef)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300 rounded-sm text-sm sm:text-base touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Book Consultation</span>
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
              className="sm:w-4 sm:h-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Accessibility Screen Reader Text */}
      <div className="sr-only">
        <h2>Fashion Services</h2>
        <p>
          We offer three main services: Styling consultations, Custom art and illustrations, and Luxury accessories
          curation.
        </p>
      </div>
    </section>
  )
}

export default ModernServices