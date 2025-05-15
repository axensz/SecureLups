"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllResults } from '@/lib/firestore'
import type { QuestionnaireResult } from '@/lib/firestore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Shield, AlertTriangle, Clock, CheckCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut, onAuthStateChange } from '@/lib/auth'

export default function Dashboard() {
  const router = useRouter()
  const [results, setResults] = useState<QuestionnaireResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push('/dashboard/login')
        return
      }

      const loadResults = async () => {
        try {
          const data = await getAllResults()
          setResults(data)
        } catch (error) {
          console.error('Error loading results:', error)
        } finally {
          setLoading(false)
        }
      }

      loadResults()
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/dashboard/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { text: 'Excelente', color: 'text-green-500', icon: CheckCircle }
    if (score >= 60) return { text: 'Regular', color: 'text-yellow-500', icon: Clock }
    if (score >= 40) return { text: 'Bajo', color: 'text-orange-500', icon: AlertTriangle }
    return { text: 'Crítico', color: 'text-red-500', icon: Shield }
  }

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/${id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando resultados...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Evaluaciones</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evaluaciones</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riesgo Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.filter(r => r.riesgoTotal < 40).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riesgo Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.filter(r => r.riesgoTotal >= 40 && r.riesgoTotal < 60).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Riesgo Regular</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.filter(r => r.riesgoTotal >= 60 && r.riesgoTotal < 80).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evaluaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <p className="text-center text-muted-foreground">No hay evaluaciones registradas</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Nivel de Riesgo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const riskLevel = getRiskLevel(result.riesgoTotal)
                  const Icon = riskLevel.icon
                  return (
                    <TableRow 
                      key={result.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewDetails(result.id!)}
                    >
                      <TableCell>{result.empresa}</TableCell>
                      <TableCell>{result.sector}</TableCell>
                      <TableCell>{result.email}</TableCell>
                      <TableCell>
                        {new Date(result.fechaCreacion || '').toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${riskLevel.color}`} />
                          <span className={riskLevel.color}>{riskLevel.text}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 