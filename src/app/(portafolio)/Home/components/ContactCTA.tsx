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
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.color = theme === 'dark' 
      ? `rgba(147, 197, 253, ${Math.random() * 0.5})` 
      : `rgba(255, 255, 255, ${Math.random() * 0.7})`
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

  const colors = {
    light: {
      primary: 'from-blue-600 to-blue-800',
      text: 'text-white',
      button: 'bg-white text-blue-800 hover:bg-white/90',
      secondaryButton: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      formBg: 'bg-white',
      formText: 'text-gray-900'
    },
    dark: {
      primary: 'from-blue-800 to-blue-900',
      text: 'text-white',
      button: 'bg-blue-600 text-white hover:bg-blue-700',
      secondaryButton: 'bg-gray-800 text-white hover:bg-gray-700',
      formBg: 'bg-gray-800',
      formText: 'text-white'
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

    const particleCount = window.innerWidth < 768 ? 30 : 60
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle(ctx, theme || 'light'))

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Dibujar conexiones entre partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(147, 197, 253, ${1 - distance/100})` 
              : `rgba(255, 255, 255, ${1 - distance/100})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
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
      toast.success("Mensaje enviado con éxito!", {
        description: "Me pondré en contacto contigo pronto.",
        duration: 5000,
      })
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setIsFormOpen(false)
        setFormStatus('idle')
      }, 2000)
    } catch (error) {
      setFormStatus('error')
      toast.error("Error al enviar el mensaje", {
        description: error instanceof Error ? error.message : "Por favor intenta nuevamente más tarde.",
        duration: 5000,
      })
    }
  }

  return (
    <section 
      id="contacto" 
      className={cn(
        "py-20 relative overflow-hidden",
        `bg-gradient-to-r ${currentColors.primary}`
      )}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-slate-400 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <div className="container px-6 mx-auto text-center relative z-10">
        {!isFormOpen ? (
          <div className="max-w-3xl mx-auto">
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-6",
              currentColors.text
            )}>
              ¿Listo para trabajar juntos?
            </h2>
            <p className={cn(
              "text-lg md:text-xl mb-8",
              theme === 'dark' ? "text-blue-200" : "text-blue-100"
            )}>
              Si tienes un proyecto en mente o quieres conocer más sobre mi trabajo, estaré encantado de conversar contigo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => setIsFormOpen(true)}
                className={cn(
                  currentColors.button,
                  "group transition-all duration-300 hover:shadow-lg hover:scale-105",
                  "flex items-center gap-2 px-6 py-3 text-lg"
                )}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactar ahora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <a
                href="mailto:mseragonf@gmail.com"
                className={cn(
                  currentColors.secondaryButton,
                  "group transition-all duration-300 hover:shadow-lg hover:scale-105",
                  "flex items-center gap-2 px-6 py-3 text-lg rounded-md"
                )}
              >
                <Mail className="mr-2 h-5 w-5" />
                Enviar email
              </a>
            </div>
          </div>
        ) : (
          <div className={cn(
            "max-w-2xl mx-auto p-8 rounded-xl shadow-xl",
            currentColors.formBg
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
                    theme === 'dark' ? "text-gray-300" : "text-gray-700"
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
                    "dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    "focus-visible:ring-blue-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className={cn(
                    "block text-sm font-medium mb-1",
                    theme === 'dark' ? "text-gray-300" : "text-gray-700"
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
                    "dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    "focus-visible:ring-blue-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className={cn(
                    "block text-sm font-medium mb-1",
                    theme === 'dark' ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={cn(
                    "dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                    "focus-visible:ring-blue-500 focus-visible:ring-2"
                  )}
                  disabled={formStatus === 'submitting'}
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
                    "dark:border-gray-600 dark:text-white",
                    "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  disabled={formStatus === 'submitting'}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
                    "flex items-center gap-2"
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