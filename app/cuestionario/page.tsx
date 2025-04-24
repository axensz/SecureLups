"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"

// Definir los tipos para las respuestas
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

// Preguntas del cuestionario
const questions = [
  {
    id: "empresa",
    title: "Nombre de la empresa",
    type: "text",
    placeholder: "Ingrese el nombre de su empresa",
    validation: (value: string) => value.trim().length > 0,
  },
  {
    id: "email",
    title: "Correo electrónico de contacto",
    type: "email",
    placeholder: "correo@empresa.com",
    validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  {
    id: "sector",
    title: "Sector o industria",
    type: "radio",
    options: ["Tecnología", "Salud", "Manufactura", "Comercio", "Finanzas"],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "tecnologias",
    title: "Tecnologías utilizadas",
    type: "checkbox",
    options: ["Correo electrónico", "Página web", "Servidores propios", "Teletrabajo", "Dispositivos móviles"],
    validation: (value: string[]) => value.length > 0,
  },
  {
    id: "mantenimientoTI",
    title: "Gestión del mantenimiento de TI",
    type: "radio",
    options: ["Departamento interno", "Proveedor externo", "Mixto", "Sin gestión formal"],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "herramientasSeguridad",
    title: "Herramientas de seguridad en uso",
    type: "radio",
    options: [
      "Antivirus básico",
      "Solución completa (antivirus, firewall, etc.)",
      "Soluciones avanzadas (EDR, SIEM)",
      "Ninguna",
    ],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "formacion",
    title: "Formación en ciberseguridad el último año",
    type: "radio",
    options: [
      "Ninguna",
      "Básica para algunos empleados",
      "Completa para todos los empleados",
      "Programa continuo de formación",
    ],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "politicaContrasenas",
    title: "Política de gestión de contraseñas",
    type: "radio",
    options: [
      "Sin política formal",
      "Política básica",
      "Política avanzada con requisitos de complejidad",
      "Uso de gestores de contraseñas y 2FA",
    ],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "eliminacionDatos",
    title: "Prácticas de eliminación de datos y dispositivos",
    type: "radio",
    options: ["Sin procedimiento", "Eliminación básica", "Borrado seguro", "Procedimiento certificado"],
    validation: (value: string) => value.length > 0,
  },
  {
    id: "redesSociales",
    title: "Nivel de actividad en redes sociales",
    type: "radio",
    options: ["Sin presencia", "Presencia básica", "Presencia activa", "Estrategia completa de redes sociales"],
    validation: (value: string) => value.length > 0,
  },
]

export default function Cuestionario() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    empresa: "",
    email: "",
    sector: "",
    tecnologias: [],
    mantenimientoTI: "",
    herramientasSeguridad: "",
    formacion: "",
    politicaContrasenas: "",
    eliminacionDatos: "",
    redesSociales: "",
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const currentQuestion = questions[currentStep]
  const progress = (currentStep / questions.length) * 100

  const handleTextChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
    setTouched({ ...touched, [id]: true })

    const isValid = currentQuestion.validation(value)
    setErrors({ ...errors, [id]: !isValid })
  }

  const handleRadioChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
    setTouched({ ...touched, [id]: true })
    setErrors({ ...errors, [id]: false })
  }

  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    const currentValues = [...(formData[id as keyof FormData] as string[])]

    if (checked) {
      currentValues.push(value)
    } else {
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      }
    }

    setFormData({ ...formData, [id]: currentValues })
    setTouched({ ...touched, [id]: true })

    const isValid = currentQuestion.validation(currentValues)
    setErrors({ ...errors, [id]: !isValid })
  }

  const validateCurrentStep = () => {
    const id = currentQuestion.id
    const value = formData[id as keyof FormData]
    const isValid = currentQuestion.validation(value)

    setTouched({ ...touched, [id]: true })
    setErrors({ ...errors, [id]: !isValid })

    return isValid
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Guardar resultados en localStorage para acceder desde la página de resultados
      localStorage.setItem("securelups-results", JSON.stringify(formData))
      router.push("/resultados")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isCurrentStepValid = () => {
    const id = currentQuestion.id
    if (!touched[id]) return false
    return !errors[id]
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container max-w-3xl py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Responde estas preguntas para evaluar tu nivel de seguridad
          </h1>
          <p className="text-gray-300">Completa el siguiente cuestionario para recibir un diagnóstico personalizado.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>
              Pregunta {currentStep + 1} de {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-cyan-500" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6 shadow-lg"
          >
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>

              {currentQuestion.type === "text" && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id={currentQuestion.id}
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        touched[currentQuestion.id] && errors[currentQuestion.id] ? "border-red-500" : ""
                      }`}
                    />
                    {touched[currentQuestion.id] && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {errors[currentQuestion.id] ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched[currentQuestion.id] && errors[currentQuestion.id] && (
                    <p className="text-sm text-red-500">
                      {currentQuestion.id === "email"
                        ? "Por favor, ingrese un correo electrónico válido"
                        : "Este campo es obligatorio"}
                    </p>
                  )}
                </div>
              )}

              {currentQuestion.type === "email" && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id={currentQuestion.id}
                      type="email"
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className={`bg-[#252525] border-gray-700 focus:border-cyan-500 ${
                        touched[currentQuestion.id] && errors[currentQuestion.id] ? "border-red-500" : ""
                      }`}
                    />
                    {touched[currentQuestion.id] && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {errors[currentQuestion.id] ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched[currentQuestion.id] && errors[currentQuestion.id] && (
                    <p className="text-sm text-red-500">Por favor, ingrese un correo electrónico válido</p>
                  )}
                </div>
              )}

              {currentQuestion.type === "radio" && (
                <RadioGroup
                  value={formData[currentQuestion.id as keyof FormData] as string}
                  onValueChange={(value) => handleRadioChange(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 rounded-md border border-gray-700 p-3 transition-colors hover:bg-[#252525]"
                    >
                      <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                      <Label htmlFor={`${currentQuestion.id}-${option}`} className="flex-grow cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "checkbox" && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 rounded-md border border-gray-700 p-3 transition-colors hover:bg-[#252525]"
                    >
                      <Checkbox
                        id={`${currentQuestion.id}-${option}`}
                        checked={(formData[currentQuestion.id as keyof FormData] as string[]).includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(currentQuestion.id, option, checked as boolean)
                        }
                      />
                      <Label htmlFor={`${currentQuestion.id}-${option}`} className="flex-grow cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                  {touched[currentQuestion.id] && errors[currentQuestion.id] && (
                    <p className="text-sm text-red-500">Seleccione al menos una opción</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-700 hover:bg-gray-800 text-gray-300"
          >
            Anterior
          </Button>

          <Button onClick={handleNext} className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
            {currentStep === questions.length - 1 ? "Ver Resultados" : "Siguiente"}
          </Button>
        </div>
      </div>
    </main>
  )
}
