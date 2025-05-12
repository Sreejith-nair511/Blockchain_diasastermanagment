import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import EmergencyBot from "@/components/emergency-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dinai - Decentralized Disaster Management",
  description: "Web3 disaster management platform with blockchain verification",
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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
          key="leaflet-css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="bg-dinai-green text-dinai-cream py-6">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dinai Platform</h3>
                    <p className="text-sm text-dinai-cream/80">
                      Decentralized disaster management powered by blockchain technology.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="#" className="hover:text-dinai-orange transition">
                          Report Disaster
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-dinai-orange transition">
                          Volunteer
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-dinai-orange transition">
                          NGO Portal
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Emergency</h3>
                    <p className="text-sm text-dinai-cream/80">Helpline: 1800-XXX-XXXX</p>
                    <p className="text-sm text-dinai-cream/80 mt-2">Smart Contract: 0x1234...5678</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-dinai-cream/20 text-center text-sm text-dinai-cream/60">
                  © {new Date().getFullYear()} Dinai Platform. All rights reserved.
                </div>
              </div>
            </footer>
            <EmergencyBot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
