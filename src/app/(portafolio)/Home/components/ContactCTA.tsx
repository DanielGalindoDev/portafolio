'use client'

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ArrowRight, Mail, MessageSquare, Send, Check, X } from "lucide-react"
import { toast } from "sonner"

// Constantes para el texto
const TEXT_CONTENT = {
  mainTitle: "¿Listo para colaborar?",
  mainDescription: "Hablemos sobre tu proyecto. Estoy disponible para freelance y oportunidades interesantes.",
  contactButton: "Contactarme",
  emailButton: "Email directo",
  formTitle: "Envíame un mensaje",
  nameLabel: "Nombre",
  emailLabel: "Email",
  messageLabel: "Mensaje",
  sendButton: "Enviar mensaje",
  sendingButton: "Enviando...",
  sentButton: "Enviado",
  errorButton: "Error",
  cancelButton: "Cancelar",
  successMessage: "Mensaje enviado con éxito",
  successDescription: "Te responderé lo antes posible.",
  errorMessage: "Error al enviar",
  errorDescription: "Por favor intenta nuevamente más tarde."
}

// Configuración de partículas
const PARTICLE_SETTINGS = {
  count: {
    mobile: 30,
    desktop: 60
  },
  size: {
    min: 1,
    max: 3
  },
  speed: 0.5,
  connectionDistance: 100,
  lineWidth: 0.5
}

// Tipos
type FormData = {
  name: string
  email: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, theme: string) {
    this.ctx = ctx
    this.x = Math.random() * ctx.canvas.width
    this.y = Math.random() * ctx.canvas.height
    this.size = Math.random() * (PARTICLE_SETTINGS.size.max - PARTICLE_SETTINGS.size.min) + PARTICLE_SETTINGS.size.min
    this.speedX = Math.random() * PARTICLE_SETTINGS.speed - (PARTICLE_SETTINGS.speed / 2)
    this.speedY = Math.random() * PARTICLE_SETTINGS.speed - (PARTICLE_SETTINGS.speed / 2)
    this.color = theme === 'dark' 
      ? `rgba(200, 200, 255, ${Math.random() * 0.4})`
      : `rgba(80, 90, 120, ${Math.random() * 0.4})`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > this.ctx.canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > this.ctx.canvas.height) this.speedY *= -1
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fill()
  }
}

export const ContactCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  // Paleta de colores
  const colors = {
    light: {
      primary: 'from-gray-50 to-gray-100',
      text: 'text-gray-800',
      button: {
        primary: 'bg-gray-800 text-white hover:bg-gray-700',
        secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
        outline: 'border-gray-300 text-gray-700 hover:bg-gray-100'
      },
      form: {
        bg: 'bg-white',
        text: 'text-gray-800',
        input: {
          text: 'text-gray-900',
          bg: 'bg-white',
          border: 'border-gray-300',
          placeholder: 'placeholder-gray-500'
        }
      },
      accent: 'text-gray-600'
    },
    dark: {
      primary: 'from-gray-900 to-gray-800',
      text: 'text-gray-100',
      button: {
        primary: 'bg-gray-700 text-white hover:bg-gray-600',
        secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700',
        outline: 'border-gray-600 text-gray-200 hover:bg-gray-700'
      },
      form: {
        bg: 'bg-gray-800',
        text: 'text-gray-100',
        input: {
          text: 'text-gray-100',
          bg: 'bg-gray-700',
          border: 'border-gray-600',
          placeholder: 'placeholder-gray-400'
        }
      },
      accent: 'text-gray-300'
    }
  }

  const currentColors = theme === 'dark' ? colors.dark : colors.light

  // Efecto de partículas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particleCount = window.innerWidth < 768 ? PARTICLE_SETTINGS.count.mobile : PARTICLE_SETTINGS.count.desktop
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle(ctx, theme || 'light'))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dibujar conexiones
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < PARTICLE_SETTINGS.connectionDistance) {
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(200, 200, 255, ${0.3 - distance/400})` 
              : `rgba(80, 90, 120, ${0.3 - distance/400})`
            ctx.lineWidth = PARTICLE_SETTINGS.lineWidth
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Dibujar partículas
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Por favor completa todos los campos")
      }

      if (!formData.email.includes('@')) {
        throw new Error("Por favor ingresa un email válido")
      }
      
      setFormStatus('success')
      toast.success(TEXT_CONTENT.successMessage, {
        description: TEXT_CONTENT.successDescription,
        duration: 5000,
      })
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setIsFormOpen(false)
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
    <section 
      id="contacto" 
      className={cn(
        "py-20 relative overflow-hidden transition-colors duration-300",
        `bg-gradient-to-br ${currentColors.primary}`
      )}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-20 w-32 h-32 bg-indigo-300 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gray-400 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <div className="container px-6 mx-auto text-center relative z-10">
        {!isFormOpen ? (
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
            
            {/* Botones principales reorganizados */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => setIsFormOpen(true)}
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
          </div>
        ) : (
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
              
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setFormStatus('idle')
                  }}
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
        )}
      </div>
    </section>
  )
}