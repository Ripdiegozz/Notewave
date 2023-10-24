import { Toaster } from "sonner";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { EdgeStoreProvider } from "@/lib/edgestore";

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notewave',
  description: 'The connected workspace where ideas come to life.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-dark.ico',
        href: '/favicon-dark.ico',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:url" content="https://notewave-lake.vercel.app/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Notewave"/>
        <meta property="og:description" content="The connected workspace where ideas come to life."/>
        <meta property="og:image" content="https://i.imgur.com/QDxqMIS.png"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="notewave-lake.vercel.app"/>
        <meta property="twitter:url" content="https://notewave-lake.vercel.app/"/>
        <meta name="twitter:title" content="Notewave"/>
        <meta name="twitter:description" content="The connected workspace where ideas come to life."/>
        <meta name="twitter:image" content="https://i.imgur.com/QDxqMIS.png"/>
      </head>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='notewave-theme-2'
            >
              <Toaster position='bottom-center' />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
