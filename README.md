# Securelups - Prototipo de Evaluación de Ciberseguridad

**Securelups** es una plataforma moderna e interactiva para evaluar la ciberseguridad de empresas. A través de un cuestionario dinámico, genera un diagnóstico detallado con recomendaciones personalizadas, y ofrece además planes de servicio, workshops especializados y consultoría personalizada.

---

## Características Principales

-  **Cuestionario Interactivo**: Evaluación paso a paso con retroalimentación inmediata
-  **Diagnóstico Personalizado**: Recomendaciones específicas según las respuestas
-  **Planes y Precios**: Comparativa clara de servicios en formato de columnas
-  **Workshops Especializados**: Talleres de formación en ciberseguridad
-  **Formulario de Consultoría**: Solicita apoyo personalizado o conecta vía WhatsApp
-  **Estética Moderna**: Paleta oscura con acentos neón, diseño limpio y animaciones sutiles
-  **100% Responsive**: Optimizado para móviles, tablets y escritorio

---

##🛠️ Tecnologías y Herramientas Usadas

### Frameworks y Librerías Principales

- [**Next.js 14**](https://nextjs.org/) – Framework React con soporte SSR y routing
- [**React**](https://reactjs.org/) – Biblioteca para construir interfaces dinámicas
- [**TypeScript**](https://www.typescriptlang.org/) – Tipado estático para mayor robustez
- [**Tailwind CSS**](https://tailwindcss.com/) – Framework de estilos utilitario
- [**Framer Motion**](https://www.framer.com/motion/) – Animaciones suaves para React
- [**Lucide React**](https://lucide.dev/) – Iconos SVG optimizados
- [**shadcn/ui**](https://ui.shadcn.com/) – Componentes accesibles y estilizados para interfaces

---

## Estructura del Proyecto

```
securelups/
├── app/                  
│   ├── cuestionario/     # Lógica del cuestionario
│   ├── resultados/       # Diagnóstico y resultados
│   ├── layout.tsx        # Layout base de la aplicación
│   └── page.tsx          # Página de inicio
├── components/
│   ├── consultoria.tsx   # Formulario de consultoría
│   ├── faq.tsx           # Preguntas frecuentes
│   ├── footer.tsx        # Pie de página con autores
│   ├── header.tsx        # Navegación principal
│   ├── pricing-plans.tsx # Tabla de planes y precios
│   ├── testimonials.tsx  # Opiniones de clientes
│   ├── workshops.tsx     # Sección de workshops
│   └── ui/               # Componentes reutilizables UI
├── styles/               # Estilos adicionales
├── public/               # Recursos estáticos
└── tailwind.config.ts    # Configuración de Tailwind CSS
```

---

## Instalación y Uso

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/axensz/SecureLups.git
   cd SecureLups
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Levanta el entorno local**:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:3000`

---

## Autores

- Camilo Guzmán  
- Robert Suárez  
- Isaac Ospina  
- Mateo Acevedo
