import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "A creative portfolio showcasing design and artwork",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add a script to handle navigation state */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        if (typeof window !== 'undefined') {
          // Check if we need to scroll to projects section
          if (sessionStorage.getItem('scrollToProjects') === 'true') {
            console.log('Layout script: Will scroll to projects section');
            
            // Scroll to projects section after a delay
            setTimeout(function() {
              var projectsSection = document.getElementById('projects-section');
              if (projectsSection) {
                console.log('Layout script: Scrolling to projects section');
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                console.warn('Layout script: Projects section not found');
                // Try to scroll to an approximate position
                window.scrollTo({
                  top: document.body.scrollHeight / 2,
                  behavior: 'smooth'
                });
              }
            }, 1000); // Wait for DOM to be ready
          }
        }
      })();
    `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
