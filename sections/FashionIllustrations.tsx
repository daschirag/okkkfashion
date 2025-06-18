"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const FashionIllustrations = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-8 sm:mb-10 lg:mb-12">
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] aspect-[600/150] mb-4">
            <Image
              src="/images/MY-ILLUSTRATIONS.png"
              alt="My Illustrations"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 600px"
              priority
            />
          </div>
        </div>

        {/* Main Illustration Display */}
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="relative w-full bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full aspect-[6/4] overflow-hidden">
              <Image
                src="/images/fashion-illustrations-complete.png"
                alt="Fashion Illustrations Collection"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* View Full Collection Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <motion.a
            href="https://www.behance.net/gallery/223542963/PORTFOLIO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300 rounded-sm text-sm sm:text-base touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>View Full Portfolio</span>
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
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default FashionIllustrations
