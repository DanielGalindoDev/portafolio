'use client'

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { PARTICLE_SETTINGS } from "./constants"

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

export const ContactParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

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

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-20 w-32 h-32 bg-indigo-300 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-gray-400 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>
    </>
  )
}