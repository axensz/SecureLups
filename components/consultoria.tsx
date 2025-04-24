"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Consultoria() {
  const [formData, setFormData] = useState({
    empresa: "",
    contacto: "",
    email: "",
    telefono: "",
    mensaje: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.empresa.trim()) {
      newErrors.empresa = "El nombre de la empresa es obligatorio"
    }

    if (!formData.contacto.trim()) {
      newErrors.contacto = "El nombre de contacto es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulación de envío del formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          empresa: "",
          contacto: "",
          email: "",
          telefono: "",
          mensaje: "",
        })
        setIsSuccess(false)
        setIsOpen(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-16 bg-[#0a0a0a]" id="consultoria">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda para mejorar tu seguridad?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Nuestro equipo de expertos puede ayudarte a implementar las recomendaciones y fortalecer la postura de
          seguridad de tu empresa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-8 py-6">
                Solicitar Consultoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-xl">Solicitud de Consultoría</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Complete el formulario y nos pondremos en contacto con usted a la brevedad.
                </DialogDescription>
              </DialogHeader>

              {isSuccess ? (
                <div className="py-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">¡Solicitud enviada!</h3>
                  <p className="text-gray-400">
                    Gracias por contactarnos. Un miembro de nuestro equipo se pondrá en contacto con usted pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Nombre de la empresa</Label>
                    <Input
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        errors.empresa ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empresa && <p className="text-red-500 text-sm">{errors.empresa}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contacto">Nombre de contacto</Label>
                    <Input
                      id="contacto"
                      name="contacto"
                      value={formData.contacto}
                      onChange={handleChange}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        errors.contacto ? "border-red-500" : ""
                      }`}
                    />
                    {errors.contacto && <p className="text-red-500 text-sm">{errors.contacto}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono (opcional)</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="bg-[#252525] border-gray-700 focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={4}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        errors.mensaje ? "border-red-500" : ""
                      }`}
                    />
                    {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
                  </div>

                  <DialogFooter className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-600 text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </Button>
                  </DialogFooter>
                </form>
              )}

              <div className="pt-4 text-center border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3">O contáctanos directamente por WhatsApp</p>
                <a
                  href="https://wa.me/573004366237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </DialogContent>
          </Dialog>

          <a
            href="https://wa.me/573004366237"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
