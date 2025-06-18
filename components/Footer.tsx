"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"

interface FooterProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void
  aboutRef: React.RefObject<HTMLDivElement>
  contactRef: React.RefObject<HTMLDivElement>
  workRef: React.RefObject<HTMLDivElement>
  servicesRef: React.RefObject<HTMLDivElement>
}

export default function Footer({ scrollToSection, aboutRef, contactRef, workRef, servicesRef }: FooterProps) {
  return (
    <footer className="bg-[#E90074] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 w-full flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 xl:gap-0">
        {/* Logo Section */}
        <div className="flex-1 w-full lg:w-auto">
          <Link href="/" aria-label="MKaepae Home">
            <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] aspect-[400/100]">
              <Image
                src="/images/final-small-logo.svg"
                alt="MKaepae Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, (max-width: 1280px) 350px, 400px"
              />
            </div>
          </Link>
          <div className="mt-2 sm:mt-3">
            {/* Mobile-specific underline positioning */}
            <div className="sm:hidden relative w-[120px] h-0.5 mx-auto">
              <Image src="/images/Line 9.png" alt="underline" fill className="object-contain" sizes="120px" />
            </div>
            {/* Desktop underline positioning */}
            <div className="hidden sm:block relative w-full max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] h-0.5">
              <Image
                src="/images/Line 9.png"
                alt="underline"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, (max-width: 1280px) 350px, 400px"
              />
            </div>
          </div>
        </div>

        {/* Footer Navigation Groups */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-32 w-full lg:w-auto lg:-translate-x-10">
          {/* Explore Links */}
          <div className="text-white">
            <h2 className="text-base sm:text-lg md:text-xl font-extralight text-black mb-3 sm:mb-4 md:mb-6">Explore</h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg">
              <li>
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="hover:opacity-80 transition-opacity cursor-pointer text-left touch-manipulation min-h-[44px] sm:min-h-0 flex items-center"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(servicesRef)}
                  className="hover:opacity-80 transition-opacity cursor-pointer text-left touch-manipulation min-h-[44px] sm:min-h-0 flex items-center"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  className="hover:opacity-80 transition-opacity cursor-pointer text-left touch-manipulation min-h-[44px] sm:min-h-0 flex items-center"
                  onClick={() => scrollToSection(workRef)}
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="hover:opacity-80 transition-opacity cursor-pointer text-left touch-manipulation min-h-[44px] sm:min-h-0 flex items-center"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("hasSeenSplash")
                    window.location.reload()
                  }}
                  className="hover:opacity-80 transition-opacity cursor-pointer text-pink-300 text-left touch-manipulation min-h-[44px] sm:min-h-0 flex items-center"
                >
                  Replay Intro
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-white">
            <h2 className="text-base sm:text-lg md:text-xl font-extralight text-black mb-3 sm:mb-4 md:mb-6">Follow</h2>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg">
              <li>
                <a
                  href="https://www.instagram.com/studio.mkaebae?igsh=MTBsb3V4d3J0MXRnbw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity touch-manipulation min-h-[44px] sm:min-h-0 inline-flex items-center"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mahinder-kaur-b05a351b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity touch-manipulation min-h-[44px] sm:min-h-0 inline-flex items-center"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-pink-800 h-[20px] sm:h-[30px] md:h-[40px] lg:h-[50px]"></div>
    </footer>
  )
}
