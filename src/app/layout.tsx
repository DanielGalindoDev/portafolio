import { ThemeProvider } from '@/components/theme-provider';
import MainLayout from '@/components/MainLayout'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainLayout>
          {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}