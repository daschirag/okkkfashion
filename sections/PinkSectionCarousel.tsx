"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const PinkSectionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    initial: 0,
    loop: true,
    rubberband: true,
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const slides = [
    {
      type: "text",
      image: "/images/pink-statue.png",
      para1:
        "It is an avant-garde leather garment collection inspired by Miley Cyrus, celebrating her fearless approach to fashion and individuality. It pays homage to rock 'n' roll culture, and embraces an eclectic fusion of styles.",
      para2:
        "It represents not only the sunny side of self-expression, but also the darker, more introspective aspects of human existence. Each garment is a reflection of her life's highs and lows, translating her personal triumphs and traumas into intricate designs.",
    },
    {
      type: "text",
      image: "/images/secondCarouselImage.jpg",
      para1:
        "This collection is divided into five phases of Miley's life, each representing a key turning point in her personal and artistic journey. Hannah Montana Era – Miley's early rise to fame as a Disney star balancing two identities.",
      para2:
        "Breakout of Character – Letting go of her Disney image to explore who she truly is. Paws of Remembrance – A period when she dealt with the loss of her pets and processed grief. The Heartbreak – A time of emotional pain after a breakup. Musical Liberation – Using music as a way to express herself.",
    },
    { type: "image", src: "/images/miley-hannah-montana-merged.jpg" },
    { type: "image", src: "/images/miley-breaking-character-merged.jpg" },
    { type: "image", src: "/images/miley-paws-remembrance-merged.jpg" },
    { type: "image", src: "/images/miley-heartbreak-merged.jpg" },
    { type: "image", src: "/images/miley-pink-fringe-model.jpg" },
  ]

  const goToSlide = (index: number) => instanceRef.current?.moveToIdx(index)
  const prevSlide = () => instanceRef.current?.prev()
  const nextSlide = () => instanceRef.current?.next()

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        {/* Arrows only on Desktop */}
        <div className="hidden md:flex absolute inset-y-0 w-full justify-between items-center z-20 px-2 pointer-events-none">
          <button onClick={prevSlide} className="pointer-events-auto group" aria-label="Prev">
            <div className="w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 shadow-lg transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </button>
          <button onClick={nextSlide} className="pointer-events-auto group" aria-label="Next">
            <div className="w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 shadow-lg transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        </div>

        {/* Slides */}
        <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden">
          {slides.map((slide, index) => (
            <div
              className="keen-slider__slide flex flex-col items-center justify-start px-4 py-6 min-h-[600px] md:min-h-0"
              key={index}
            >
              {slide.type === "image" ? (
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] border-2 border-white/20 rounded-lg overflow-hidden">
                  <a
                    href="https://www.behance.net/gallery/201336963/FASHION-COLLECTION"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={slide.src || "/placeholder.svg"}
                      fill
                      alt={`Slide ${index + 1}`}
                      className="object-contain hover:scale-105 transition duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    />
                  </a>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6 items-center w-full">
                  <div className="w-full lg:w-1/2">
                    <a
                      href="https://www.behance.net/gallery/201336963/FASHION-COLLECTION"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] border-2 border-white/20 rounded-lg overflow-hidden">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          fill
                          alt={`Slide ${index + 1}`}
                          className="object-contain hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="w-full lg:w-1/2 text-white space-y-6 px-2">
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-center lg:text-left">
                      {slide.para1}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-center lg:text-left">
                      {slide.para2}
                    </p>
                    <div className="pt-2 text-center lg:text-left">
                      <a
                        href="https://www.behance.net/gallery/201336963/FASHION-COLLECTION"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm transition border border-white/20 hover:border-white/40"
                      >
                        <span>View Full Story</span>
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
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pagination Dots - Desktop Only */}
      <div className="hidden md:flex mt-6 gap-2 bg-pink-700/80 backdrop-blur-sm rounded-full p-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "bg-yellow-200 scale-125" : "bg-pink-400 hover:bg-pink-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PinkSectionCarousel
