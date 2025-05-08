"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"

type QuestionnaireResult = {
  id: string
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
  fechaCreacion: string
  riesgoTotal: number
}

export default function Dashboard() {
  const router = useRouter()
  const [results, setResults] = useState<QuestionnaireResult[]>([])

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem("securelups-admin-auth")
    if (!isAuthenticated) {
      router.push("/dashboard/login")
      return
    }

    // Cargar resultados
    const storedResults = localStorage.getItem("securelups-all-results")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("securelups-admin-auth")
    router.push("/dashboard/login")
  }

  const getRiskLevel = (score: number) => {
    if (score <= 30) return { label: "Alto", color: "bg-red-500" }
    if (score <= 70) return { label: "Medio", color: "bg-yellow-500" }
    return { label: "Bajo", color: "bg-green-500" }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container max-w-7xl py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard de Administrador</h1>
            <p className="text-gray-400">Monitoreo de evaluaciones de seguridad</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 hover:bg-gray-800 text-gray-300"
          >
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Total Evaluaciones</CardTitle>
              <CardDescription>Número de evaluaciones realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{results.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Riesgo Alto</CardTitle>
              <CardDescription>Empresas en riesgo alto</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">
                {results.filter((r) => r.riesgoTotal <= 30).length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Última Evaluación</CardTitle>
              <CardDescription>Tiempo desde la última evaluación</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl">
                {results.length > 0
                  ? formatDistanceToNow(new Date(results[results.length - 1].fechaCreacion), {
                      locale: es,
                      addSuffix: true,
                    })
                  : "No hay evaluaciones"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Evaluaciones Recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#252525] text-left">
                <tr>
                  <th className="p-4 font-medium">Empresa</th>
                  <th className="p-4 font-medium">Sector</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Fecha</th>
                  <th className="p-4 font-medium">Nivel de Riesgo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-[#252525]">
                    <td className="p-4">{result.empresa}</td>
                    <td className="p-4">{result.sector}</td>
                    <td className="p-4">{result.email}</td>
                    <td className="p-4">
                      {formatDistanceToNow(new Date(result.fechaCreacion), {
                        locale: es,
                        addSuffix: true,
                      })}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${getRiskLevel(result.riesgoTotal).color} text-black`}
                      >
                        {getRiskLevel(result.riesgoTotal).label}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-400">
                      No hay evaluaciones registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
} 