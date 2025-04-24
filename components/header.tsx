"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ShieldCheck } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Cuestionario", href: "/cuestionario" },
    { name: "Resultados", href: "/resultados" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#121212]/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-cyan-500" />
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            SECURELUPS
          </span>
        </Link>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-400",
                pathname === item.href ? "text-cyan-500" : "text-gray-300",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
