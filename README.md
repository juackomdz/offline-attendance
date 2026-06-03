# Control de Asistencia

Sistema web de registro de entrada y salida para empleados/alumnos, construido con **Nuxt 4**. Soporta validación de RUT chileno, funcionamiento offline con sincronización automática y persistencia con **Turso** + **IndexedDB**.

## Características

- Registro de entrada y salida con RUT, nombre y apellido
- Validación y formateo automático de RUT chileno con `rut-kit` + Zod
- **Offline-first**: las marcas se guardan localmente en IndexedDB (Dexie) cuando no hay conexión y se sincronizan automáticamente al recuperarla
- Indicador visual de estado de conexión y progreso de sincronización
- Interfaz responsive
- API server-side con SQLite (Turso)
- Ruta para ver registros (/api/ver)

## Stack

| Capa          | Tecnología                        |
| ------------- | ----------------------------------|
| Framework     | Nuxt 4                            |
| UI            | Vue, PrimeVue, Tailwind CSS       |
| Formularios   | @tanstack/vue-form + Zod          |
| Base de datos | SQLite (Turso) + Drizzle ORM      |
| Offline       | Dexie.js (IndexedDB)              |
| Testing       | Vitest + happy-dom                |
| Deploy        | Vercel                            |

## DEMO

https://offline-attendance.vercel.app


## Instalación

```bash
bun install
# o
pnpm install
# o
yarn install
# o
npm install
```

## Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
# Con Bun
bun run dev

# Con pnpm
pnpm dev

# Con npm
npm run dev

# Con yarn
yarn dev
```
