import { TEXT_CONTENT } from "./constants"
import { ColorPalette } from "./types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, MessageSquare } from "lucide-react"

interface ContactButtonsProps {
  currentColors: ColorPalette
  onOpenForm: () => void
}

export const ContactButtons = ({ currentColors, onOpenForm }: ContactButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={onOpenForm}
          className={cn(
            currentColors.button.primary,
            "group transition-all duration-300 hover:shadow-lg",
            "flex items-center gap-2 px-8 py-4 text-lg w-full sm:w-auto"
          )}
        >
          <MessageSquare className="h-5 w-5" />
          {TEXT_CONTENT.contactButton}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <span className="text-sm text-gray-500 dark:text-gray-400">o</span>
        
        <a
          href="mailto:mseragonf@gmail.com"
          className={cn(
            currentColors.button.secondary,
            "group transition-all duration-300 hover:shadow-lg",
            "flex items-center gap-2 px-8 py-4 text-lg rounded-md w-full sm:w-auto"
          )}
        >
          <Mail className="h-5 w-5" />
          {TEXT_CONTENT.emailButton}
        </a>
      </div>
    </div>
  )
}