import { useState } from "react"
import { create } from "@kodingdotninja/use-tailwind-breakpoint"

export const { useBreakpoint } = create({
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
})

export const useDisplay = () => {
  const [height, setHeight] = useState(window.innerHeight)

  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight)

    setWidth(window.innerWidth)
  })

  return { width, height }
}

export const useIsDesktop = () => useBreakpoint("md")

export const useIsMobile = () => !useIsDesktop

export const useIsLargeDisplay = () => useBreakpoint("lg")
