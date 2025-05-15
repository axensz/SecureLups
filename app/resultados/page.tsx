"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { QuestionnaireResult, getResultById } from "@/lib/firestore"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react"

export default function Resultados() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [result, setResult] = useState<QuestionnaireResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Intentar obtener el ID de los parámetros de la URL
        let id = searchParams.get("id")
        
        // Si no hay ID en la URL, intentar obtenerlo del localStorage
        if (!id) {
          id = localStorage.getItem("lastQuestionnaireId")
          if (id) {
            // Si encontramos el ID en localStorage, actualizar la URL
            router.replace(`/resultados?id=${id}`)
          } else {
            // Si no hay ID en ningún lado, redirigir al inicio
            router.push('/')
            return
          }
        }

        if (!id) {
          setError("No se encontró el ID del resultado")
          return
        }

        console.log("Buscando resultado con ID:", id)
        const currentResult = await getResultById(id)
        console.log("Resultado encontrado:", currentResult)

        if (!currentResult) {
          setError("No se encontró el resultado")
          return
        }

        setResult(currentResult)
      } catch (error) {
        console.error("Error fetching result:", error)
        setError("Error al cargar los resultados")
        toast.error("Error al cargar los resultados")
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [searchParams, router])

  const getRiskLevelColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  const getRiskLevelIcon = (score: number) => {
    if (score >= 80) return <ShieldCheck className="h-8 w-8 text-green-500" />
    if (score >= 60) return <AlertTriangle className="h-8 w-8 text-yellow-500" />
    if (score >= 40) return <AlertTriangle className="h-8 w-8 text-orange-500" />
    return <ShieldAlert className="h-8 w-8 text-red-500" />
  }

  const getRiskLevelText = (score: number) => {
    if (score >= 80) return "Excelente"
    if (score >= 60) return "Regular"
    if (score >= 40) return "Bajo"
    return "Crítico"
  }

  const getRiskLevelDescription = (score: number) => {
    if (score >= 80) return "Se recomienda mantener las buenas prácticas actuales"
    if (score >= 60) return "Se recomienda implementar mejoras en seguridad"
    if (score >= 40) return "Se requieren mejoras urgentes en seguridad"
    return "Se necesitan acciones inmediatas en seguridad"
  }

  const getRecommendations = (result: QuestionnaireResult) => {
    const recommendations = []

    // Herramientas de seguridad
    if (result.herramientasSeguridad === "Antivirus básico" || result.herramientasSeguridad === "Ninguna") {
      recommendations.push({
        title: "Herramientas de Seguridad",
        description: "Implementar soluciones avanzadas de seguridad como EDR o SIEM para mejorar la detección y respuesta a amenazas. Considere también la implementación de un firewall de próxima generación (NGFW) y un sistema de prevención de intrusiones (IPS).",
        priority: "Alta"
      })
    }

    // Formación
    if (result.formacion === "Ninguna" || result.formacion === "Básica para algunos empleados") {
      recommendations.push({
        title: "Formación en Ciberseguridad",
        description: "Establecer un programa continuo de formación en ciberseguridad para todos los empleados. Incluya simulacros de phishing, talleres de concienciación y actualizaciones periódicas sobre nuevas amenazas.",
        priority: "Alta"
      })
    }

    // Política de contraseñas
    if (result.politicaContrasenas === "Sin política formal" || result.politicaContrasenas === "Política básica") {
      recommendations.push({
        title: "Gestión de Contraseñas",
        description: "Implementar gestores de contraseñas y autenticación de dos factores (2FA) para todas las cuentas críticas. Establecer una política de rotación de contraseñas y requisitos mínimos de complejidad.",
        priority: "Alta"
      })
    }

    // Mantenimiento TI
    if (result.mantenimientoTI === "Sin gestión formal") {
      recommendations.push({
        title: "Gestión de TI",
        description: "Establecer un departamento interno de TI o contratar servicios de gestión de seguridad gestionados (MSSP). Implementar un sistema de gestión de tickets y un proceso de resolución de incidentes.",
        priority: "Media"
      })
    }

    // Eliminación de datos
    if (result.eliminacionDatos === "Sin procedimiento" || result.eliminacionDatos === "Eliminación básica") {
      recommendations.push({
        title: "Eliminación de Datos",
        description: "Implementar procedimientos de borrado seguro para la eliminación de datos y dispositivos. Considerar la certificación de eliminación de datos y mantener registros de los dispositivos eliminados.",
        priority: "Media"
      })
    }

    // Redes sociales
    if (result.redesSociales === "Sin presencia" || result.redesSociales === "Presencia básica") {
      recommendations.push({
        title: "Gestión de Redes Sociales",
        description: "Desarrollar una estrategia de seguridad para redes sociales que incluya políticas de publicación, gestión de accesos y monitoreo de menciones de la marca.",
        priority: "Media"
      })
    }

    // Tecnologías
    if (!result.tecnologias.includes("Servidores propios") && result.mantenimientoTI !== "Departamento interno") {
      recommendations.push({
        title: "Infraestructura Cloud",
        description: "Considerar la migración a servicios cloud con certificaciones de seguridad. Implementar políticas de acceso y cifrado para datos sensibles en la nube.",
        priority: "Media"
      })
    }

    // Backup y recuperación
    if (!result.tecnologias.includes("Servidores propios")) {
      recommendations.push({
        title: "Backup y Recuperación",
        description: "Implementar un sistema de backup automático con almacenamiento redundante. Realizar pruebas periódicas de recuperación de datos y documentar los procedimientos.",
        priority: "Alta"
      })
    }

    // Cumplimiento normativo
    recommendations.push({
      title: "Cumplimiento Normativo",
      description: "Revisar y actualizar las políticas de seguridad para cumplir con regulaciones relevantes (GDPR, ISO 27001, etc.). Realizar auditorías periódicas de cumplimiento.",
      priority: "Media"
    })

    return recommendations
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
              <p className="text-center">Analizando resultados...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#121212]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
              <p className="text-center text-red-500 mb-4">{error || "No se encontraron resultados"}</p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => router.push('/cuestionario')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black"
                >
                  Volver al Cuestionario
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const recommendations = getRecommendations(result)

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Resumen Principal */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Evaluación de Seguridad</h1>
              <div className="text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {result.empresa}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
              <div className="flex items-center gap-4">
                {getRiskLevelIcon(result.riesgoTotal)}
                <div>
                  <h2 className="text-xl font-semibold">Nivel de Riesgo</h2>
                  <p className={`text-3xl font-bold ${getRiskLevelColor(result.riesgoTotal)}`}>
                    {result.riesgoTotal}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">{getRiskLevelText(result.riesgoTotal)}</p>
                <p className="text-sm text-gray-400">
                  {getRiskLevelDescription(result.riesgoTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recomendaciones Prioritarias</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-[#252525] rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      rec.priority === "Alta" ? "bg-red-500/20" : "bg-yellow-500/20"
                    }`}>
                      {rec.priority === "Alta" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{rec.title}</h3>
                      <p className="text-gray-400">{rec.description}</p>
                      <span className={`text-sm mt-2 inline-block px-2 py-1 rounded ${
                        rec.priority === "Alta" ? "bg-red-500/20 text-red-500" : "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        Prioridad {rec.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => router.push('/cuestionario')}
                className="bg-cyan-500 hover:bg-cyan-600 text-black"
              >
                Realizar Nueva Evaluación
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
