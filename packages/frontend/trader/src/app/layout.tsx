import React from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'Trader',
  description: 'E-commerce Trader Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
