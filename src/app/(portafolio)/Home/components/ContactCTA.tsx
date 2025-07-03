'use client'

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ArrowRight, Mail, MessageSquare, Send, Check, X } from "lucide-react"
import { toast } from "sonner"

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
    this.size = Math.random() * 2 + 1 // Partículas más pequeñas
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.color = theme === 'dark' 
      ? `rgba(220, 215, 247, ${Math.random() * 0.4})` // Lavanda suave para oscuro
      : `rgba(100, 116, 139, ${Math.random() * 0.4})` // Gris azulado para claro
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

  // Nueva paleta de colores más sofisticada
  const colors = {
    light: {
      primary: 'from-slate-100 to-slate-200', // Fondo claro muy suave
      text: 'text-slate-800',
      button: 'bg-slate-800 text-white hover:bg-slate-700',
      secondaryButton: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200',
      formBg: 'bg-white',
      formText: 'text-slate-800',
      accent: 'text-slate-600'
    },
    dark: {
      primary: 'from-slate-900 to-slate-800', // Fondo oscuro elegante
      text: 'text-slate-100',
      button: 'bg-slate-700 text-white hover:bg-slate-600',
      secondaryButton: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700',
      formBg: 'bg-slate-800',
      formText: 'text-slate-100',
      accent: 'text-slate-300'
    }
  }

  const currentColors = theme === 'dark' ? colors.dark : colors.light

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

    const particleCount = window.innerWidth < 768 ? 40 : 80 // Más partículas pero más sutiles
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle(ctx, theme || 'light'))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dibujar conexiones primero (para que queden detrás)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) { // Conexiones más amplias
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(220, 215, 247, ${0.3 - distance/400})` 
              : `rgba(100, 116, 139, ${0.3 - distance/400})`
            ctx.lineWidth = 0.3 // Líneas más finas
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
      toast.success("Mensaje enviado con éxito", {
        description: "Te responderé lo antes posible.",
        duration: 5000,
      })
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setIsFormOpen(false)
        setFormStatus('idle')
      }, 2000)
    } catch (error) {
      setFormStatus('error')
      toast.error("Error al enviar", {
        description: error instanceof Error ? error.message : "Intenta nuevamente más tarde.",
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
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-20 w-32 h-32 bg-indigo-300 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-slate-400 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <div className="container px-6 mx-auto text-center relative z-10">
        {!isFormOpen ? (
          <div className="max-w-3xl mx-auto">
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-6",
              currentColors.text
            )}>
              ¿Listo para colaborar?
            </h2>
            <p className={cn(
              "text-lg md:text-xl mb-8",
              currentColors.accent
            )}>
              Hablemos sobre tu proyecto. Estoy disponible para freelance y oportunidades interesantes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => setIsFormOpen(true)}
                className={cn(
                  currentColors.button,
                  "group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                  "flex items-center gap-2 px-6 py-3 text-lg"
                )}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactar
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <a
                href="mailto:mseragonf@gmail.com"
                className={cn(
                  currentColors.secondaryButton,
                  "group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                  "flex items-center gap-2 px-6 py-3 text-lg rounded-md"
                )}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email directo
              </a>
            </div>
          </div>
        ) : (
          <div className={cn(
            "max-w-2xl mx-auto p-8 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90",
            currentColors.formBg,
            "border",
            theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
          )}>
            <h3 className={cn(
              "text-2xl font-bold mb-6",
              currentColors.formText
            )}>
              Envíame un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label 
                  htmlFor="name" 
                  className={cn(
                    "block text-sm font-medium mb-1",
                    theme === 'dark' ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={cn(
                    "dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400",
                    "focus-visible:ring-slate-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className={cn(
                    "block text-sm font-medium mb-1",
                    theme === 'dark' ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={cn(
                    "dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400",
                    "focus-visible:ring-slate-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className={cn(
                    "block text-sm font-medium mb-1",
                    theme === 'dark' ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={cn(
                    "dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400",
                    "focus-visible:ring-slate-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false)
                    setFormStatus('idle')
                  }}
                  className={cn(
                    "dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700",
                    "hover:bg-slate-100"
                  )}
                  disabled={formStatus === 'submitting'}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    "bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600",
                    "flex items-center gap-2 transition-all"
                  )}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <Check className="h-4 w-4" />
                      Enviado
                    </>
                  ) : formStatus === 'error' ? (
                    <>
                      <X className="h-4 w-4" />
                      Error
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensaje
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