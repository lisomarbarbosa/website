import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lisomar Barbosa Adv | Direito Digital e LGPD',
  description: 'Advocacia especializada em direito digital, LGPD, crimes ciberneticos, protecao de dados e compliance. Atendimento online para todo o Brasil.',
  metadataBase: new URL('https://www.lisomarbarbosa.adv.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Lisomar Barbosa Adv',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
