"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Download, Mail, ShieldAlert, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

type FormData = {
  empresa: string
  email: string
  sector: string
  tecnologias: string[]
  mantenimientoTI: string
  herramientasSeguridad: string
  formacion: string
  politicaContrasenas: string
  eliminacionDatos: string
  redesSociales: string
}

type ResultLevel = "bajo" | "medio" | "alto"

export default function Resultados() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [securityLevel, setSecurityLevel] = useState<ResultLevel>("medio")
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Recuperar datos del localStorage
    const savedData = localStorage.getItem("securelups-results")
    if (savedData) {
      const parsedData = JSON.parse(savedData) as FormData
      setFormData(parsedData)

      // Calcular nivel de seguridad basado en las respuestas
      calculateSecurityLevel(parsedData)
    }

    // Simular tiempo de carga para análisis
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const calculateSecurityLevel = (data: FormData) => {
    // Sistema simple de puntuación para determinar el nivel de seguridad
    let score = 0

    // Herramientas de seguridad
    if (data.herramientasSeguridad === "Soluciones avanzadas (EDR, SIEM)") {
      score += 3
    } else if (data.herramientasSeguridad === "Solución completa (antivirus, firewall, etc.)") {
      score += 2
    } else if (data.herramientasSeguridad === "Antivirus básico") {
      score += 1
    }

    // Formación
    if (data.formacion === "Programa continuo de formación") {
      score += 3
    } else if (data.formacion === "Completa para todos los empleados") {
      score += 2
    } else if (data.formacion === "Básica para algunos empleados") {
      score += 1
    }

    // Política de contraseñas
    if (data.politicaContrasenas === "Uso de gestores de contraseñas y 2FA") {
      score += 3
    } else if (data.politicaContrasenas === "Política avanzada con requisitos de complejidad") {
      score += 2
    } else if (data.politicaContrasenas === "Política básica") {
      score += 1
    }

    // Eliminación de datos
    if (data.eliminacionDatos === "Procedimiento certificado") {
      score += 3
    } else if (data.eliminacionDatos === "Borrado seguro") {
      score += 2
    } else if (data.eliminacionDatos === "Eliminación básica") {
      score += 1
    }

    // Determinar nivel basado en puntuación
    let level: ResultLevel = "medio"
    if (score <= 4) {
      level = "bajo"
    } else if (score <= 8) {
      level = "medio"
    } else {
      level = "alto"
    }

    setSecurityLevel(level)

    // Generar recomendaciones personalizadas
    const recs: string[] = []

    if (data.herramientasSeguridad !== "Soluciones avanzadas (EDR, SIEM)") {
      recs.push(
        "Implementar soluciones avanzadas de seguridad como EDR o SIEM para mejorar la detección y respuesta a amenazas.",
      )
    }

    if (data.formacion !== "Programa continuo de formación") {
      recs.push("Establecer un programa continuo de formación en ciberseguridad para todos los empleados.")
    }

    if (data.politicaContrasenas !== "Uso de gestores de contraseñas y 2FA") {
      recs.push(
        "Implementar gestores de contraseñas y autenticación de dos factores (2FA) para todas las cuentas críticas.",
      )
    }

    if (!data.tecnologias.includes("Servidores propios") && data.mantenimientoTI !== "Departamento interno") {
      recs.push("Considerar la contratación de servicios de monitorización de seguridad gestionados (MSSP).")
    }

    if (data.eliminacionDatos !== "Procedimiento certificado" && data.eliminacionDatos !== "Borrado seguro") {
      recs.push("Implementar procedimientos de borrado seguro para la eliminación de datos y dispositivos.")
    }

    // Si no hay recomendaciones específicas, agregar una genérica
    if (recs.length === 0) {
      recs.push("Mantener actualizadas todas las soluciones de seguridad y realizar auditorías periódicas.")
    }

    setRecommendations(recs)
  }

  const handleDownloadReport = () => {
    alert("Funcionalidad de descarga de informe en desarrollo")
  }

  const handleSendEmail = () => {
    alert(`Se enviará el informe al correo: ${formData?.email}`)
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 rounded-full bg-[#1a1a1a] animate-pulse">
              <ShieldAlert className="h-12 w-12 text-cyan-500" />
            </div>
            <h2 className="text-xl font-medium">Analizando resultados...</h2>
            <p className="text-gray-400">
              Estamos procesando tus respuestas para generar un diagnóstico personalizado.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!formData) {
    return (
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <Card className="max-w-md w-full bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle>No hay datos disponibles</CardTitle>
              <CardDescription>
                No se encontraron resultados de evaluación. Por favor, complete el cuestionario primero.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
                <a href="/cuestionario">Ir al Cuestionario</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container max-w-4xl py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
            <div
              className={`h-2 ${
                securityLevel === "alto" ? "bg-green-500" : securityLevel === "medio" ? "bg-yellow-500" : "bg-red-500"
              }`}
            />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Conclusión de Seguridad</CardTitle>
                <div
                  className={`p-2 rounded-full ${
                    securityLevel === "alto"
                      ? "bg-green-500/20"
                      : securityLevel === "medio"
                        ? "bg-yellow-500/20"
                        : "bg-red-500/20"
                  }`}
                >
                  {securityLevel === "alto" ? (
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  ) : securityLevel === "medio" ? (
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <ShieldAlert className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </div>
              <CardDescription className="text-gray-400">
                Resultados para {formData.empresa} ({formData.sector})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Diagnóstico</h3>
                <p className="text-gray-300">
                  {securityLevel === "alto"
                    ? "Tu empresa muestra un nivel de madurez alto en ciberseguridad. Cuentas con buenas prácticas y medidas de protección adecuadas, aunque siempre hay margen para mejorar en un entorno de amenazas en constante evolución."
                    : securityLevel === "medio"
                      ? "Tu empresa muestra un nivel de madurez medio en ciberseguridad. Has implementado algunas medidas importantes, pero existen áreas de mejora significativas para fortalecer tu postura de seguridad."
                      : "Tu empresa muestra un nivel de madurez bajo en ciberseguridad. Es urgente implementar medidas básicas de protección para reducir el riesgo de incidentes que podrían tener un impacto significativo en tu negocio."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Recomendaciones Personalizadas</h3>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-[#151515] p-4 border border-gray-800">
                <h4 className="font-medium mb-2">Resumen de Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tecnologias.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadReport}
                className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black"
              >
                <Download className="mr-2 h-4 w-4" /> Descargar informe en PDF
              </Button>
              <Button
                onClick={handleSendEmail}
                variant="outline"
                className="w-full sm:w-auto border-cyan-700 hover:bg-cyan-950/30 text-cyan-400"
              >
                <Mail className="mr-2 h-4 w-4" /> Enviar informe por correo
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">¿Necesitas ayuda para mejorar tu seguridad?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos puede ayudarte a implementar las recomendaciones y fortalecer la postura de
            seguridad de tu empresa.
          </p>
          <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">Solicitar Consultoría</Button>
        </div>
      </div>
    </main>
  )
}
