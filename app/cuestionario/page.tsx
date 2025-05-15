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
import { saveQuestionnaireResult } from "@/lib/firestore"
import { toast } from "sonner"

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

type QuestionType = "text" | "email" | "radio" | "checkbox"

type BaseQuestion = {
  id: keyof FormData
  title: string
  type: QuestionType
}

type TextQuestion = BaseQuestion & {
  type: "text" | "email"
  placeholder: string
  options?: never
  validation: (value: string) => boolean
}

type RadioQuestion = BaseQuestion & {
  type: "radio"
  options: string[]
  placeholder?: never
  validation: (value: string) => boolean
}

type CheckboxQuestion = BaseQuestion & {
  type: "checkbox"
  options: string[]
  placeholder?: never
  validation: (value: string[]) => boolean
}

type Question = TextQuestion | RadioQuestion | CheckboxQuestion

type QuestionValidation = {
  text: (value: string) => boolean
  email: (value: string) => boolean
  radio: (value: string) => boolean
  checkbox: (value: string[]) => boolean
}

const validations: QuestionValidation = {
  text: (value: string) => value.trim().length > 0,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  radio: (value: string) => value.length > 0,
  checkbox: (value: string[]) => value.length > 0,
}

// Preguntas del cuestionario
const questions: Question[] = [
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
] as const

export default function Cuestionario() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleTextChange = (id: keyof FormData, value: string) => {
    setFormData({ ...formData, [id]: value })
    setTouched({ ...touched, [id]: true })
    
    const question = questions.find(q => q.id === id) as TextQuestion
    if (question) {
      const isValid = question.validation(value)
      setErrors({ ...errors, [id]: !isValid })
    }
  }

  const handleRadioChange = (id: keyof FormData, value: string) => {
    setFormData({ ...formData, [id]: value })
    setTouched({ ...touched, [id]: true })
    
    const question = questions.find(q => q.id === id) as RadioQuestion
    if (question) {
      const isValid = question.validation(value)
      setErrors({ ...errors, [id]: !isValid })
    }
  }

  const handleCheckboxChange = (id: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[id] as string[]
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value)

    setFormData({ ...formData, [id]: newValues })
    setTouched({ ...touched, [id]: true })

    const question = questions.find(q => q.id === id) as CheckboxQuestion
    if (question) {
      const isValid = question.validation(newValues)
      setErrors({ ...errors, [id]: !isValid })
    }
  }

  const validateCurrentStep = () => {
    const question = currentQuestion
    const value = formData[question.id]
    
    if (question.type === "checkbox") {
      return question.validation(value as string[])
    }
    return question.validation(value as string)
  }

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      try {
        // Calcular el riesgo total basado en las respuestas
        const riesgoTotal = calculateRiskScore(formData)
        
        // Guardar el resultado en Firestore
        const resultId = await saveQuestionnaireResult({
          ...formData,
          riesgoTotal
        })

        // Guardar el ID del resultado en localStorage
        localStorage.setItem("lastQuestionnaireId", resultId)
        
        toast.success("Resultados guardados correctamente")
        router.push(`/resultados?id=${resultId}`)
      } catch (error) {
        console.error("Error saving results:", error)
        toast.error("Error al guardar los resultados")
      }
    }
  }

  const calculateRiskScore = (data: FormData): number => {
    let score = 0
    const maxScore = 100

    // Evaluar herramientas de seguridad
    if (data.herramientasSeguridad === "Soluciones avanzadas (EDR, SIEM)") score += 25
    else if (data.herramientasSeguridad === "Solución completa (antivirus, firewall, etc.)") score += 15
    else if (data.herramientasSeguridad === "Antivirus básico") score += 5

    // Evaluar formación
    if (data.formacion === "Programa continuo de formación") score += 25
    else if (data.formacion === "Completa para todos los empleados") score += 15
    else if (data.formacion === "Básica para algunos empleados") score += 5

    // Evaluar política de contraseñas
    if (data.politicaContrasenas === "Uso de gestores de contraseñas y 2FA") score += 25
    else if (data.politicaContrasenas === "Política avanzada con requisitos de complejidad") score += 15
    else if (data.politicaContrasenas === "Política básica") score += 5

    // Evaluar eliminación de datos
    if (data.eliminacionDatos === "Procedimiento certificado") score += 25
    else if (data.eliminacionDatos === "Borrado seguro") score += 15
    else if (data.eliminacionDatos === "Eliminación básica") score += 5

    return Math.min(score, maxScore)
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
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Progress value={progress} className="mb-8" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">{currentQuestion.title}</h2>

              {currentQuestion.type === "text" && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id={currentQuestion.id}
                      value={formData[currentQuestion.id as keyof FormData] as string}
                      onChange={(e) => handleTextChange(currentQuestion.id as keyof FormData, e.target.value)}
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

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Anterior
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid() || isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : currentStep === questions.length - 1 ? "Finalizar" : "Siguiente"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
