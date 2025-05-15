"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getResultById } from '@/lib/firestore'
import type { QuestionnaireResult } from '@/lib/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import { onAuthStateChange } from '@/lib/auth'

export default function ResultDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [result, setResult] = useState<QuestionnaireResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push('/dashboard/login')
        return
      }

      const loadResult = async () => {
        try {
          const data = await getResultById(params.id)
          setResult(data)
        } catch (error) {
          console.error('Error loading result:', error)
        } finally {
          setLoading(false)
        }
      }

      loadResult()
    })

    return () => unsubscribe()
  }, [params.id, router])

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { text: 'Excelente', color: 'text-green-500', icon: CheckCircle }
    if (score >= 60) return { text: 'Regular', color: 'text-yellow-500', icon: Clock }
    if (score >= 40) return { text: 'Bajo', color: 'text-orange-500', icon: AlertTriangle }
    return { text: 'Crítico', color: 'text-red-500', icon: Shield }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando resultado...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Resultado no encontrado</h1>
        </div>
      </div>
    )
  }

  const riskLevel = getRiskLevel(result.riesgoTotal)
  const Icon = riskLevel.icon

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold">Detalles de la Evaluación</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground">Empresa</h3>
              <p>{result.empresa}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Sector</h3>
              <p>{result.sector}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Email</h3>
              <p>{result.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground">Fecha de Evaluación</h3>
              <p>{new Date(result.fechaCreacion || '').toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nivel de Riesgo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Icon className={`h-8 w-8 ${riskLevel.color}`} />
              <div>
                <h3 className="text-2xl font-bold">{riskLevel.text}</h3>
                <p className="text-muted-foreground">Puntuación: {result.riesgoTotal}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalles de la Evaluación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-muted-foreground mb-2">Tecnologías Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {result.tecnologias.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Mantenimiento TI</h3>
                <p>{result.mantenimientoTI}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Herramientas de Seguridad</h3>
                <p>{result.herramientasSeguridad}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Formación</h3>
                <p>{result.formacion}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Política de Contraseñas</h3>
                <p>{result.politicaContrasenas}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Eliminación de Datos</h3>
                <p>{result.eliminacionDatos}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Redes Sociales</h3>
                <p>{result.redesSociales}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 