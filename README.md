# Rick & Morty Character Arena 🛸

Challenge técnico desarrollado para **Conexa**. Esta aplicación permite comparar dos personajes de la serie para encontrar episodios compartidos y exclusivos en una interfaz temática de combate.

## 🧠 Decisiones de Arquitectura (Architectural Decisions)

Para este proyecto, prioricé la **simplicidad y la mantenibilidad** sobre la sobre-ingeniería:

- **State Management:** Utilicé hooks nativos (`useState`, `useEffect`) y composición de componentes. Decidí **no usar Redux o Zustand** porque el flujo de datos es lineal y el estado global no era necesario para este alcance.
- **Data Fetching:** Implementé `fetch` nativo de Next.js. No utilicé React Query para mantener el bundle size ligero, aunque reconozco sus ventajas en caching para aplicaciones de mayor escala.
- **Logic Separation (DRY):** La lógica de comparación de conjuntos se extrajo a una utilidad pura (`episodeLogic.ts`). Esto permite testear la "inteligencia" del negocio sin depender de React.
- **Tailwind CSS v4:** Elegí la última versión de Tailwind para aprovechar el rendimiento mejorado y las nuevas capacidades de configuración de temas (red vs blue arena).

## ⚖️ Trade-offs & Suposiciones

- **Client-side focus:** Dado que la interactividad (seleccionar/deseleccionar) es el core de la experiencia, la mayor parte de la lógica vive en el cliente.
- **API Edge Cases:** Se implementó una lógica de normalización para la API de Rick & Morty, ya que esta devuelve objetos o arrays de forma inconsistente según la cantidad de IDs solicitados.

## 🤖 Transparencia en el proceso (AI Disclosure)

Este proyecto fue desarrollado utilizando **IA (Gemini)** como partner de programación para:
1. Prototipado rápido de componentes visuales de Tailwind.
2. Generación de casos de prueba para Jest.
3. Refactorización de código para mejorar el tipado de TypeScript.

**Decisión Humana:** El diseño de la "Arena", la estructura de carpetas, la estrategia de testing y la elección de no sobre-abstraer el código fueron decisiones tomadas por mí para cumplir con los requisitos del challenge de forma eficiente.

## 🛠️ Instalación y Uso

### Prerrequisitos
- **Node.js**: Se recomienda la versión **18.x o superior** (LTS).
- **Gestor de paquetes**: npm o yarn.

> **Tip:** Si manejas varias versiones de Node, te recomiendo usar [nvm](https://github.com/nvm-sh/nvm) para asegurar la compatibilidad.

### Pasos
1. Instalar dependencias: `npm install`
2. Correr en desarrollo: `npm run dev`
3. Ejecutar tests: `npm test`