import "@/styles/globals.css"
import { Metadata } from "next"
import { store } from "@/store"
import { ReduxProvider } from "@/store/Providers"
import { Languages } from "lucide-react"
import { Provider } from "react-redux"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { lang: string }
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  /**
   * Destruct client selected language
   */
  const { lang } = await params

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SidebarProvider>
                <ConfirmDialog />
                <AppSidebar lang={lang} />
                <main className="w-full">
                  {/* BEGIN: LAYOUT HEADER */}
                  <div className="flex justify-between items-center pl-5 pr-7 py-2 border-b mb-3">
                    <SidebarTrigger size={18} />
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-gray-800 py-1 px-2 rounded-lg">
                        <span className="flex items-center gap-1">
                          <span>{lang}</span>
                          <Languages size={18} />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>En</DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {/* END: LAYOUT HEADER */}

                  {children}
                </main>
              </SidebarProvider>
              <TailwindIndicator />
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </>
  )
}
