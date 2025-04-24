import { Clock, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Workshops() {
  const workshops = [
    {
      title: "Fundamentos de Ciberseguridad",
      description:
        "Aprende los conceptos básicos de la seguridad informática y cómo proteger tu empresa de las amenazas más comunes.",
      duration: "4 horas",
      participants: "Hasta 15 personas",
      level: "Principiante",
      price: "350.000",
    },
    {
      title: "Gestión de Incidentes de Seguridad",
      description:
        "Desarrolla un plan efectivo para responder a incidentes de seguridad y minimizar el impacto en tu organización.",
      duration: "6 horas",
      participants: "Hasta 12 personas",
      level: "Intermedio",
      price: "450.000",
    },
    {
      title: "Seguridad en el Desarrollo de Software",
      description:
        "Implementa prácticas de desarrollo seguro y aprende a identificar vulnerabilidades en el código desde las primeras etapas.",
      duration: "8 horas",
      participants: "Hasta 10 personas",
      level: "Avanzado",
      price: "600.000",
    },
    {
      title: "Protección de Datos y Cumplimiento Normativo",
      description:
        "Conoce las regulaciones de protección de datos aplicables y cómo implementar medidas para cumplir con la normativa.",
      duration: "5 horas",
      participants: "Hasta 15 personas",
      level: "Intermedio",
      price: "400.000",
    },
  ]

  return (
    <section className="py-16" id="workshops">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Workshops de Formación</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Capacita a tu equipo con nuestros workshops especializados en ciberseguridad, impartidos por expertos del
            sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <Card
              key={index}
              className="border-gray-800 bg-[#1a1a1a] hover:border-gray-700 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">{workshop.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{workshop.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{workshop.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Nivel: {workshop.level}</span>
                  </div>
                  <div className="text-sm font-medium text-white">COP ${workshop.price}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#252525] hover:bg-[#303030] border border-cyan-900 hover:border-cyan-700">
                  Inscribirme
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
