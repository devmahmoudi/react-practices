"use client"

import { usePathname, useRouter } from "next/navigation"
import { removePathnameLocale } from "@/utils/localization/helper"
import { Languages } from "lucide-react"

import { siteConfig } from "@/config/site"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LanguagesDropdown({
  currentLang,
}: {
  currentLang: string
}) {
  /**
   * Router Next Hook
   */
  const router = useRouter()

  /**
   * Pathname Next Hook
   */
  const pathname = usePathname()

  /**
   * Handle switch locale
   * @param lang
   */
  const handleSwitchLocale = (locale: string) => {
    router.push(`/${locale}${removePathnameLocale(pathname)}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-800 py-1 px-2 rounded-lg">
        <span className="flex items-center gap-1">
          <span>{currentLang}</span>
          <Languages size={18} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {siteConfig.locales
          .filter((locale) => locale != currentLang)
          .map((locale) => (
            <DropdownMenuLabel
              className="cursor-pointer"
              onClick={() => handleSwitchLocale(locale)}
              key={locale}
            >
              {locale}
            </DropdownMenuLabel>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
