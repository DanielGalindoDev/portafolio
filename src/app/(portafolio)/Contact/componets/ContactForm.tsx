'use client'

import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Check, X } from "lucide-react"
import { FormData, FormStatus, ColorPalette } from "./types"
import { TEXT_CONTENT } from "./constants"

interface ContactFormProps {
  currentColors: ColorPalette
  onCancel: () => void
}

export const ContactForm = ({ currentColors, onCancel }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    try {
      const response = await fetch("https://formspree.io/f/myzjvjba", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      setFormStatus('success')
      toast.success(TEXT_CONTENT.successMessage, {
        description: TEXT_CONTENT.successDescription,
        duration: 5000,
      })
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        onCancel()
        setFormStatus('idle')
      }, 2000)
    } catch (error) {
      setFormStatus('error')
      toast.error(TEXT_CONTENT.errorMessage, {
        description: error instanceof Error ? error.message : TEXT_CONTENT.errorDescription,
        duration: 5000,
      })
    }
  }

  return (
    <div className={cn(
      "max-w-2xl mx-auto p-8 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90",
      currentColors.form.bg,
      "border",
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    )}>
      <h3 className={cn(
        "text-2xl font-bold mb-6",
        currentColors.form.text
      )}>
        {TEXT_CONTENT.formTitle}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Campos del formulario permanecen igual */}
        <div>
          <label 
            htmlFor="name" 
            className={cn(
              "block text-sm font-medium mb-1",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}
          >
            {TEXT_CONTENT.nameLabel}
          </label>
          <Input
            id="name"
            name="name" // Añade name para Formspree
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={cn(
              currentColors.form.input.text,
              currentColors.form.input.bg,
              `border ${currentColors.form.input.border}`,
              currentColors.form.input.placeholder,
              "focus-visible:ring-gray-500 focus-visible:ring-2"
            )}
            disabled={formStatus === 'submitting'}
            placeholder={TEXT_CONTENT.nameLabel}
          />
        </div>
        
        <div>
          <label 
            htmlFor="email" 
            className={cn(
              "block text-sm font-medium mb-1",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}
          >
            {TEXT_CONTENT.emailLabel}
          </label>
          <Input
            id="email"
            name="email" // Añade name para Formspree
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={cn(
              currentColors.form.input.text,
              currentColors.form.input.bg,
              `border ${currentColors.form.input.border}`,
              currentColors.form.input.placeholder,
              "focus-visible:ring-gray-500 focus-visible:ring-2"
            )}
            disabled={formStatus === 'submitting'}
            placeholder="ejemplo@email.com"
          />
        </div>
        
        <div>
          <label 
            htmlFor="message" 
            className={cn(
              "block text-sm font-medium mb-1",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}
          >
            {TEXT_CONTENT.messageLabel}
          </label>
          <Textarea
            id="message"
            name="message" // Añade name para Formspree
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className={cn(
              currentColors.form.input.text,
              currentColors.form.input.bg,
              `border ${currentColors.form.input.border}`,
              currentColors.form.input.placeholder,
              "focus-visible:ring-gray-500 focus-visible:ring-2"
            )}
            disabled={formStatus === 'submitting'}
            placeholder="Cuéntame sobre tu proyecto..."
          />
        </div>
        
        {/* Botones permanecen igual */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={cn(
              currentColors.button.outline,
              "w-full sm:w-auto"
            )}
            disabled={formStatus === 'submitting'}
          >
            {TEXT_CONTENT.cancelButton}
          </Button>
          
          <Button
            type="submit"
            className={cn(
              currentColors.button.primary,
              "flex items-center gap-2 transition-all w-full sm:w-auto"
            )}
            disabled={formStatus === 'submitting'}
          >
            {/* Estado del botón permanece igual */}
            {formStatus === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {TEXT_CONTENT.sendingButton}
              </>
            ) : formStatus === 'success' ? (
              <>
                <Check className="h-4 w-4" />
                {TEXT_CONTENT.sentButton}
              </>
            ) : formStatus === 'error' ? (
              <>
                <X className="h-4 w-4" />
                {TEXT_CONTENT.errorButton}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {TEXT_CONTENT.sendButton}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}