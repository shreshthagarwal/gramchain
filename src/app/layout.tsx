import './globals.css'
import { Inter } from 'next/font/google'
import { Web3Modal } from '@web3modal/react'
import { ethereumClient } from '@/lib/web3'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Web3Modal 
          projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''}
          ethereumClient={ethereumClient}
        />
      </body>
    </html>
  )
}