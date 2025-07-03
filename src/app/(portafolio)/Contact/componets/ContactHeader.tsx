import { TEXT_CONTENT } from "./constants"
import { ColorPalette } from "./types"
import { cn } from "@/lib/utils"

interface ContactHeaderProps {
  currentColors: ColorPalette
}

export const ContactHeader = ({ currentColors }: ContactHeaderProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold mb-6",
        currentColors.text
      )}>
        {TEXT_CONTENT.mainTitle}
      </h2>
      <p className={cn(
        "text-lg md:text-xl mb-8",
        currentColors.accent
      )}>
        {TEXT_CONTENT.mainDescription}
      </p>
    </div>
  )
}