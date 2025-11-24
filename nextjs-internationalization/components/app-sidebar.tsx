import Link from "next/link"
import { getDictionary } from "@/utils/localization/dictrionaries"
import { translate } from "@/utils/localization/helper"
import { House, Layers, SquareLibrary } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: House,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: SquareLibrary,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: Layers,
  },
]

export async function AppSidebar({ lang }: { lang: string }) {
  /**
   * Load dictionary translation object through lang prop for localization
   */
  const dictionary = await getDictionary(lang)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{translate("Application", dictionary)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{translate(item.title, dictionary)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
