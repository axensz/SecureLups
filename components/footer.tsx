import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-gray-800">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                SECURELUPS
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Tu socio en ciberseguridad. Evaluamos, protegemos y capacitamos para mantener tu empresa segura.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cuestionario" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Cuestionario
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="#precios" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#workshops" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Workshops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">info@securelups.com</li>
              <li className="text-gray-400">+57 (1) 234 5678</li>
              <li className="text-gray-400">Bogotá, Colombia</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white">Creadores del Proyecto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Camilo Guzmán</li>
              <li className="text-gray-400">Robert Suárez</li>
              <li className="text-gray-400">Isaac Ospina</li>
              <li className="text-gray-400">Mateo Acevedo</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SECURELUPS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
