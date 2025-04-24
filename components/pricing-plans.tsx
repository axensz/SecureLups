import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingPlans() {
  const plans = [
    {
      name: "Plan Básico",
      price: "200.000",
      description: "Ideal para pequeñas empresas y startups",
      features: [
        "1 evaluación de seguridad",
        "Acceso a informes básicos",
        "Soporte por correo electrónico",
        "Recomendaciones generales",
        "Validez de 3 meses",
      ],
      cta: "Contratar",
      popular: false,
    },
    {
      name: "Plan Profesional",
      price: "500.000",
      description: "Perfecto para empresas en crecimiento",
      features: [
        "3 evaluaciones de seguridad",
        "Informes detallados y personalizados",
        "Soporte prioritario",
        "1 workshop incluido",
        "Validez de 6 meses",
        "Análisis de vulnerabilidades",
      ],
      cta: "Contratar",
      popular: true,
    },
    {
      name: "Plan Enterprise",
      price: "1.200.000",
      description: "Solución completa para grandes organizaciones",
      features: [
        "Evaluaciones ilimitadas",
        "Informes ejecutivos y técnicos",
        "Soporte 24/7",
        "3 workshops incluidos",
        "Validez de 12 meses",
        "Análisis de vulnerabilidades avanzado",
        "Consultoría personalizada",
        "Auditoría de seguridad",
      ],
      cta: "Contratar",
      popular: false,
    },
  ]

  return (
    <section className="py-16 bg-[#0a0a0a]" id="precios">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Elige tu plan — Precios en COP (Pesos Colombianos)</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ofrecemos diferentes planes adaptados a las necesidades de tu empresa, desde pequeñas startups hasta grandes
            corporaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col border-gray-800 bg-[#1a1a1a] ${
                plan.popular ? "border-cyan-700 shadow-lg shadow-cyan-900/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-cyan-500 text-black text-sm font-medium rounded-full">
                  Más popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-3xl font-bold">COP ${plan.price}</span>
                  <span className="text-gray-400 ml-1">/mes</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                      : "bg-[#252525] hover:bg-[#303030] text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
