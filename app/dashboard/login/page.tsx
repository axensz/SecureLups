"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // En una implementación real, esto debería ser una autenticación segura
    if (password === "admin123") {
      localStorage.setItem("securelups-admin-auth", "true")
      router.push("/dashboard")
    } else {
      setError(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container max-w-md py-12">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Acceso al Dashboard</CardTitle>
            <CardDescription>Ingrese la contraseña para acceder al panel de administración</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#252525] border-gray-700 focus:border-cyan-500"
                />
                {error && (
                  <p className="text-sm text-red-500">Contraseña incorrecta</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
                Acceder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 