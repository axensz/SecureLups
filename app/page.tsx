import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { PricingPlans } from "@/components/pricing-plans"
import { Workshops } from "@/components/workshops"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Consultoria } from "@/components/consultoria"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 md:py-32">
        <div className="container max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Bienvenido a SECURELUPS
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Detecta vulnerabilidades, gestiona riesgos y protege tu empresa.
            </p>
          </div>
          <div className="mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-8 py-6">
              <Link href="/cuestionario">Comenzar Evaluación</Link>
            </Button>
            <Button asChild variant="outline" className="border-cyan-700 hover:bg-cyan-950/30 text-cyan-400 px-8 py-6">
              <Link href="#servicios">Conocer Más</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-16 bg-[#0a0a0a]">
        <div className="container max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Nuestros Servicios de Ciberseguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Evaluación de Riesgos",
                description: "Identificamos y evaluamos las vulnerabilidades en tu infraestructura tecnológica.",
              },
              {
                title: "Gestión de Amenazas",
                description: "Desarrollamos estrategias para mitigar riesgos y proteger tus activos digitales.",
              },
              {
                title: "Formación en Seguridad",
                description: "Capacitamos a tu equipo para reconocer y responder ante amenazas cibernéticas.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 hover:border-cyan-900 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nueva sección destacando los workshops */}
      <section className="py-12 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
        <div className="container max-w-6xl">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Workshops de Formación Especializada</h2>
              <p className="text-gray-300 mb-6">
                Además de nuestras evaluaciones de seguridad, ofrecemos workshops especializados para capacitar a tu
                equipo en las mejores prácticas de ciberseguridad.
              </p>
              <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                <Link href="#workshops">Ver Workshops</Link>
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/30 to-fuchsia-500/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center text-black font-bold text-xl">
                    Workshops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Precios */}
      <PricingPlans />

      {/* Sección de Workshops */}
      <Workshops />

      {/* Nueva sección de Consultoría */}
      <Consultoria />

      {/* Sección de Testimonios */}
      <Testimonials />

      {/* Sección de FAQ */}
      <FAQ />

      {/* Footer con créditos */}
      <Footer />
    </main>
  )
}
