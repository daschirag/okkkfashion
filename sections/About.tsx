"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export const About = () => {
  return (
    <section className="w-full flex justify-center items-center text-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          {/* Pink Arrow and About Label */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 lg:mb-8">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-2 h-[60px] w-[30px] sm:h-[80px] sm:w-[40px] md:h-[100px] md:w-[50px] lg:h-[120px] lg:w-[60px] relative"
            >
              <svg width="100%" height="100%" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30 2C30 2 45 30 30 60C15 90 30 110 30 110M20 100L30 110L40 100"
                  stroke="#E90074"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <span className="text-base sm:text-lg lg:text-xl xl:text-[20px] mb-4 sm:mb-6 lg:mb-8 xl:mb-10">
              [ About ]
            </span>
          </div>

          {/* Transcending Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 xl:mb-16 text-center px-2 sm:px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed text-white">
              Transcending conventional fashion norms into a form of{" "}
              <span
                className="font-medium text-[#E90074] inline-block"
                style={{
                  color: "#E90074",
                  display: "inline",
                  fontWeight: "500",
                }}
              >
                ART
              </span>{" "}
              that people can wear with pride
            </h2>
          </motion.div>

          {/* About Card */}
          <div className="w-full max-w-[1151px] mx-auto bg-[#171717] rounded-lg overflow-hidden flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-[420px] flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[420px] aspect-[420/634]">
                <Image
                  alt="mk"
                  src="/images/image-7.png"
                  fill
                  className="object-contain rounded-md"
                  priority
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 420px"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-4 sm:p-6 lg:p-8 xl:p-10 lg:pt-12 xl:pt-20 flex-1">
              <div className="flex justify-start mb-4 sm:mb-6">
                <div className="relative w-[140px] h-[70px] sm:w-[170px] sm:h-[85px] md:w-[220px] md:h-[95px] lg:w-[270px] lg:h-[100px] xl:w-[300px] xl:h-[100px]">
                  <Image
                    src="/images/MAHINDER-KAUR.svg"
                    alt="mk"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, (max-width: 1024px) 220px, (max-width: 1280px) 270px, 300px"
                  />
                </div>
              </div>

              {/* Removed Mobile Text Duplication */}

              {/* Bottom Image */}
              <div className="flex justify-start mt-4 sm:mt-6 lg:mt-8 xl:mt-10">
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[570px] xl:max-w-[600px] aspect-[600/300]">
                  <Image
                    src="/images/Asaimage.png"
                    alt="paraphoto"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 420px, (max-width: 1024px) 520px, (max-width: 1280px) 570px, 600px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
