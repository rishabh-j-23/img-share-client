import './globals.css'
import type { Metadata } from 'next'
import { Tilt_Neon } from 'next/font/google';

const inter = Tilt_Neon({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Img Share',
  description: 'Project made by Rishabh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className='bg-neutral-800'>
      <body className={inter.className}>
        <div className=''>
          {children}
        </div>
      </body>
    </html>
  )
}
