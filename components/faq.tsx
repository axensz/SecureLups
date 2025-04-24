"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQ() {
  const faqs = [
    {
      question: "¿Qué incluye la evaluación de seguridad?",
      answer:
        "Nuestra evaluación de seguridad incluye un análisis completo de tu infraestructura tecnológica, políticas de seguridad, prácticas de gestión de datos y formación de personal. Identificamos vulnerabilidades, evaluamos riesgos y proporcionamos recomendaciones específicas para mejorar tu postura de seguridad.",
    },
    {
      question: "¿Cuánto tiempo toma completar una evaluación?",
      answer:
        "El tiempo varía según el tamaño y complejidad de tu organización. Típicamente, una evaluación básica puede completarse en 1-2 semanas, mientras que evaluaciones más exhaustivas para empresas grandes pueden tomar 3-4 semanas. Trabajamos contigo para establecer un cronograma que minimice las interrupciones en tus operaciones.",
    },
    {
      question: "¿Cómo se diferencian los planes entre sí?",
      answer:
        "Los planes se diferencian principalmente en la profundidad del análisis, el número de evaluaciones incluidas, el nivel de soporte proporcionado y los servicios adicionales como workshops y consultoría personalizada. El Plan Básico es ideal para pequeñas empresas, el Profesional para empresas medianas, y el Enterprise para grandes organizaciones con necesidades complejas.",
    },
    {
      question: "¿Puedo actualizar mi plan más adelante?",
      answer:
        "Sí, puedes actualizar tu plan en cualquier momento. Te recomendaremos el mejor camino de actualización basado en tus necesidades específicas y te ofreceremos un descuento proporcional al tiempo restante en tu plan actual.",
    },
    {
      question: "¿Ofrecen soporte después de la evaluación?",
      answer:
        "Absolutamente. Todos nuestros planes incluyen algún nivel de soporte post-evaluación. Desde asistencia por correo electrónico en el Plan Básico hasta soporte 24/7 en el Plan Enterprise. Además, ofrecemos servicios de consultoría continua para ayudarte a implementar nuestras recomendaciones.",
    },
    {
      question: "¿Los workshops pueden personalizarse para mi empresa?",
      answer:
        "Sí, todos nuestros workshops pueden adaptarse a las necesidades específicas de tu organización. Podemos enfocarnos en las áreas más relevantes para tu industria y ajustar el contenido según el nivel de conocimiento de tus empleados.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16" id="faq">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden bg-[#1a1a1a] hover:border-gray-700 transition-all duration-300"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 border-t border-gray-800 text-gray-300 text-sm">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
