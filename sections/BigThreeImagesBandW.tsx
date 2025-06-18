"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const BigThreeImagesBandW = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full flex justify-center"
    >
      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="relative w-full overflow-hidden rounded-lg">
          {/* Base color image */}
          <Image
            src="/images/BigThreeImg.png"
            width={1200}
            height={600}
            alt="Performance Images"
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            priority
          />

          {/* Grayscale overlay for bottom half */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/BigThreeImg.png"
              width={1200}
              height={600}
              alt="Performance Images Grayscale"
              className="w-full h-auto object-contain"
              style={{
                filter: "grayscale(100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%, black 100%)",
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BigThreeImagesBandW
