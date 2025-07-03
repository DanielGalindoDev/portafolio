import { ThemeProvider } from '@/components/theme-provider'
import MainLayout from '@/components/MainLayout'
import './globals.css'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tu Nombre - Portafolio',
  description: 'Portafolio profesional de [Tu Nombre], mostrando proyectos de desarrollo y diseño.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider 
          attribute="class"  
          enableSystem
          disableTransitionOnChange // Recomendado para evitar flashes
        >
          <MainLayout>
            <Toaster 
              position="top-center" 
              richColors
              closeButton
              toastOptions={{
                classNames: {
                  toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border',
                  title: 'group-[.toast]:text-foreground',
                  description: 'group-[.toast]:text-muted-foreground',
                  actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                  cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                },
              }}
            />
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}