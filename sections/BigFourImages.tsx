"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const BigFourImages = () => {
  const images = [
    {
      src: "/images/Frame2.png",
      titleImg: "/images/MANIAC-BIKER-JACKET.png",
      subtitle: "Leather Design",
      alt: "Maniac Biker Jacket Image",
      page: "project1",
    },
    {
      src: "/images/Frame3.png",
      titleImg: "/images/METAVERSE-COSTUME.png",
      subtitle: " Leather Design",
      alt: "Urban Style Image",
      page: "project2",
    },
    {
      src: "/images/Frame4.png",
      titleImg: "/images/PRECOCIOUS-ORANGE.png",
      subtitle: " Leather Design",
      alt: "Street Fashion Image",
      page: "project3",
    },
    {
      src: "/images/frame1.png",
      titleImg: "/images/TROPICAL-SENSATION.svg",
      subtitle: "Leather Design",
      alt: "Street Fashion Design",
      page: "project4",
    },
  ]

  return (
    <motion.div
      id="projects-section"
      initial={{ opacity: 0, y: 100, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 max-w-6xl w-full">
        {images.map((image, index) => (
          <Link href={`/${image.page}`} key={index}>
            <div className="w-full touch-manipulation">
              <div className="relative aspect-[4/3] sm:aspect-[5/3] md:aspect-[3/2] lg:aspect-[3/1] xl:aspect-[4/1] overflow-hidden rounded-lg group">
                <Image
                  src={image.src || "/placeholder.svg"}
                  width={1200}
                  height={400}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-50"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/30 opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300">
                  <div className="flex flex-col items-start gap-1 sm:gap-2 ml-1 sm:ml-2 md:ml-4">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="h-6 sm:h-8 md:h-12 lg:h-16 xl:h-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={image.titleImg || "/placeholder.svg"}
                        width={300}
                        height={80}
                        alt={image.alt}
                        className="h-full w-auto object-contain"
                        sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
                      />
                    </motion.div>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                      [ {image.subtitle} ]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default BigFourImages
