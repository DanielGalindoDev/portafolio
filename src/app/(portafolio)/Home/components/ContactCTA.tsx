'use client'

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ArrowRight, Mail, MessageSquare, Send } from "lucide-react"

export const ContactCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const { theme } = useTheme()

  const gradientBg = theme === 'dark' 
    ? "bg-gradient-to-r from-blue-900/90 to-slate-900/90"
    : "bg-gradient-to-r from-blue-700/90 to-slate-700/90"

  const buttonClass = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "group transition-all duration-300 hover:shadow-lg",
    "bg-white text-blue-800 hover:bg-white/90 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setIsFormOpen(false)
  }

  return (
    <section 
      id="contacto" 
      className={cn(
        "py-20 relative overflow-hidden",
        gradientBg
      )}
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-slate-400 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <div className="container px-6 mx-auto text-center relative z-10">
        {!isFormOpen ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              ¿Listo para trabajar juntos?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-blue-200">
              Si tienes un proyecto en mente o quieres conocer más sobre mi trabajo, estaré encantado de conversar contigo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => setIsFormOpen(true)}
                className={buttonClass}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactar ahora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <a
                href="mailto:mseragonf@gmail.com"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "group transition-all duration-300 hover:shadow-lg",
                  "text-gray-900 bg-gray-100 hover:bg-gray-200",
                  "dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                )}
              >
                <Mail className="mr-2 h-5 w-5" />
                Enviar email
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="dark:border-gray-600 dark:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
