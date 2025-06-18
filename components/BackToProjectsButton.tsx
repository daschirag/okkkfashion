"use client"
import { usePathname } from "next/navigation"
import type React from "react"
import Image from "next/image"

interface BackToProjectsButtonProps {
  className?: string
  showLogo?: boolean
  theme?: "maniac" | "metaverse" | "orange" | "tropical" | "default"
  variant?: "logo" | "text" | "minimal"
}

export default function BackToProjectsButton({
  className = "",
  showLogo = true,
  theme = "default",
  variant = "logo",
}: BackToProjectsButtonProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // If we're already on the home page, scroll directly to projects
    if (pathname === "/") {
      const projectsSection = document.getElementById("projects-section")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "instant" })
      }
    } else {
      // Navigate to home page and immediately jump to projects section
      sessionStorage.setItem("hasSeenSplash", "true")
      sessionStorage.setItem("jumpToProjects", "true")
      window.location.href = "/"
    }
  }

  // Theme-based styling
  const getThemeStyles = () => {
    switch (theme) {
      case "maniac":
        return {
          bg: "bg-gradient-to-r from-purple-900/80 to-black/80",
          border: "border-purple-500/50",
          text: "text-purple-200",
          hover: "hover:text-purple-100 hover:border-purple-400",
          accent: "#8B5CF6",
        }
      case "metaverse":
        return {
          bg: "bg-gradient-to-r from-cyan-900/80 to-blue-900/80",
          border: "border-cyan-500/50",
          text: "text-cyan-200",
          hover: "hover:text-cyan-100 hover:border-cyan-400",
          accent: "#06B6D4",
        }
      case "orange":
        return {
          bg: "bg-gradient-to-r from-orange-900/80 to-red-900/80",
          border: "border-orange-500/50",
          text: "text-orange-200",
          hover: "hover:text-orange-100 hover:border-orange-400",
          accent: "#F97316",
        }
      case "tropical":
        return {
          bg: "bg-gradient-to-r from-green-900/80 to-emerald-900/80",
          border: "border-green-500/50",
          text: "text-green-200",
          hover: "hover:text-green-100 hover:border-green-400",
          accent: "#10B981",
        }
      default:
        return {
          bg: "bg-black/80",
          border: "border-white/30",
          text: "text-white",
          hover: "hover:text-pink-400 hover:border-pink-400",
          accent: "#E90074",
        }
    }
  }

  const themeStyles = getThemeStyles()

  if (variant === "minimal") {
    return (
      <button
        onClick={handleClick}
        className={`group flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${themeStyles.bg} ${themeStyles.border} ${themeStyles.text} ${themeStyles.hover} ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>
    )
  }

  if (variant === "text") {
    return (
      <button
        onClick={handleClick}
        className={`group flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${themeStyles.bg} ${themeStyles.border} ${themeStyles.text} ${themeStyles.hover} ${className}`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current/30 group-hover:border-current/60 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-70">Return to</span>
          <span className="text-sm font-medium">Projects</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${themeStyles.bg} ${themeStyles.border} ${themeStyles.hover} ${className}`}
    >
      {showLogo && (
        <div className="flex-shrink-0">
          <Image
            src="/images/final-small-logo.svg"
            alt="small logo"
            width={80}
            height={27}
            className="transition-opacity group-hover:opacity-80"
          />
        </div>
      )}
      <div className="flex items-center gap-2 text-white group-hover:text-current transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <span className="text-sm font-medium">Back to Projects</span>
      </div>
    </button>
  )
}
