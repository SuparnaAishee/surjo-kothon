import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: '🌞 Stellar Stories: Sunny\'s Space Adventure',
  description: 'Learn about space weather through stories and fun! Interactive educational experience with real NASA data.',
  keywords: 'NASA, space weather, education, solar flares, CME, aurora, interactive story',
  authors: [{ name: 'NASA Space Weather Education' }],
  openGraph: {
    title: '🌞 Stellar Stories: Sunny\'s Space Adventure',
    description: 'Interactive space weather education with real NASA data',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-space-bg1 via-space-bg2 to-space-bg3 relative overflow-hidden">
          {/* Animated background stars */}
          <div className="fixed inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-0.5 h-0.5 bg-space-primary rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-60 left-48 w-0.8 h-0.8 bg-space-aurora rounded-full animate-pulse delay-2000"></div>
            <div className="absolute bottom-80 right-20 w-0.6 h-0.6 bg-space-accent rounded-full animate-pulse delay-3000"></div>
          </div>

          {/* Floating animation layer */}
          <div className="fixed inset-0 animate-float pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-2 h-2 bg-gradient-radial from-space-primary to-transparent rounded-full"></div>
            <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-gradient-radial from-space-aurora to-transparent rounded-full"></div>
            <div className="absolute bottom-40 left-32 w-1 h-1 bg-gradient-radial from-space-accent to-transparent rounded-full"></div>
          </div>

          {children}
        </div>
      </body>
    </html>
  )
}