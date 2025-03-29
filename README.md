# Next.js Footer Particle Explosion Animation ✨

Este proyecto es una demostración de una animación de explosión de partículas (imágenes) que se activa cuando el usuario se desplaza cerca del pie de página (footer) de una página web. Está construido con Next.js, React, TypeScript y utiliza Bun como runtime/gestor de paquetes principal.


## 🚀 Tecnologías Utilizadas

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Librería UI:** [React](https://reactjs.org/)
*   **Runtime/Gestor de Paquetes:** [Bun](https://bun.sh/) (También compatible con Node.js/npm/yarn)
*   **Fuentes:** [next/font](https://nextjs.org/docs/basic-features/font-optimization) (usando Courier Prime de Google Fonts)
*   **Animación:** CSS Transforms y `requestAnimationFrame` gestionado en React.
*   **Estilos:** CSS Global (`globals.css`)

## 📋 Prerrequisitos

Para ejecutar este proyecto localmente, necesitarás tener instalado:

*   **Bun:** (Recomendado) [Instrucciones de instalación de Bun](https://bun.sh/docs/installation)
*   *Alternativa:* [Node.js](https://nodejs.org/) (versión 18.x o superior) y un gestor de paquetes como npm o yarn.
*   **Git:** Para clonar el repositorio.

## 🛠️ Cómo Empezar

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clona el Repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO_AQUÍ>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2.  **Instala las Dependencias:**
    *   **Usando Bun (Recomendado):**
        ```bash
        bun install
        ```
    *   *Alternativa usando npm:*
        ```bash
        npm install
        ```
    *   *Alternativa usando yarn:*
        ```bash
        yarn install
        ```

3.  **Ejecuta el Servidor de Desarrollo:**
    *   **Usando Bun:**
        ```bash
        bun run dev
        ```
    *   *Alternativa usando npm:*
        ```bash
        npm run dev
        ```
    *   *Alternativa usando yarn:*
        ```bash
        yarn dev
        ```

4.  **Abre tu Navegador:**
    Visita [`http://localhost:3000`](http://localhost:3000) para ver la aplicación en funcionamiento.


## ⚙️ Configuración de la Animación

Puedes modificar el comportamiento de la explosión ajustando el objeto `config` y otras constantes dentro del archivo `./src/app/components/ExplosionContainer.tsx` (o la ruta donde lo tengas):

```typescript
// Dentro de ExplosionContainer.tsx

const config: ExplosionConfig = {
    gravity: 0.25,        // Aceleración hacia abajo
    friction: 0.99,       // Resistencia (más cercano a 1 = menos resistencia)
    imageSize: 150,       // Tamaño de las imágenes (en px)
    horizontalForce: 20,  // Fuerza inicial horizontal (aleatoria +/-)
    verticalForce: 15,    // Fuerza inicial vertical (hacia arriba)
    rotationSpeed: 10,    // Velocidad de rotación inicial (aleatoria +/-)
    resetDelay: 500,      // Tiempo (ms) antes de permitir otra explosión
};

const imageParticleCount = 15; // Número de imágenes a explotar

const imagePaths: string[] = Array.from(
    { length: imageParticleCount },
    (_, i) => `/img/${i + 1}.jpg` // Asegúrate de que estas rutas coincidan con tus imágenes en /public/img/
);

📁 Estructura del Proyecto
.
├── public/
│   └── img/          # Imágenes estáticas (hero.jpg, outro.jpg, 1.jpg, 2.jpg, ...)
├── src/
│   └── app/
│       ├── components/
│       │   └── ExplosionContainer.tsx # Componente principal de la animación
│       ├── globals.css # Estilos globales
│       ├── layout.tsx  # Layout raíz (incluye configuración de fuente)
│       └── page.tsx    # Página principal donde se usa ExplosionContainer
├── bun.lockb         # Lockfile de Bun
├── package.json      # Dependencias y scripts
├── tsconfig.json     # Configuración de TypeScript
└── next.config.mjs   # Configuración de Next.js
└── README.md         # Este archivo