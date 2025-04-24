"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Ramírez",
      position: "Director de TI, TechSolutions Colombia",
      content:
        "SECURELUPS transformó nuestra postura de seguridad. Su evaluación identificó vulnerabilidades críticas que habíamos pasado por alto durante años. El informe fue claro y las recomendaciones, implementables de inmediato.",
    },
    {
      name: "María Fernanda López",
      position: "CEO, FinTech Innovations",
      content:
        "Los workshops de formación fueron excelentes. Nuestro equipo ahora está mucho más consciente de las amenazas de seguridad y ha implementado prácticas que han fortalecido significativamente nuestra protección de datos.",
    },
    {
      name: "Andrés Gutiérrez",
      position: "CISO, Banco Nacional",
      content:
        "Como institución financiera, la seguridad es nuestra prioridad. El Plan Enterprise de SECURELUPS nos ha proporcionado una visión completa de nuestras vulnerabilidades y un roadmap claro para remediarlas.",
    },
    {
      name: "Laura Sánchez",
      position: "Gerente General, Retail Express",
      content:
        "Después de sufrir un incidente de seguridad, contratamos a SECURELUPS para evaluar nuestros sistemas. Su enfoque metódico y recomendaciones precisas nos ayudaron a recuperar la confianza en nuestra infraestructura.",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-16 bg-[#0a0a0a]" id="testimonios">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empresas de todos los sectores confían en SECURELUPS para proteger su información y sistemas.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-gray-800 bg-[#1a1a1a] max-w-3xl mx-auto">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-2 rounded-full bg-cyan-900/20">
                      <Quote className="h-6 w-6 text-cyan-500" />
                    </div>
                  </div>
                  <blockquote className="text-center mb-6">
                    <p className="text-lg text-gray-200 italic">"{testimonials[current].content}"</p>
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold text-white">{testimonials[current].name}</p>
                    <p className="text-sm text-gray-400">{testimonials[current].position}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index)
                  setAutoplay(false)
                }}
                className={`h-2 w-2 rounded-full ${
                  current === index ? "bg-cyan-500" : "bg-gray-700"
                } transition-colors duration-300`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#1a1a1a] text-gray-300 hidden md:flex"
            onClick={() => {
              prev()
              setAutoplay(false)
            }}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#1a1a1a] text-gray-300 hidden md:flex"
            onClick={() => {
              next()
              setAutoplay(false)
            }}
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
