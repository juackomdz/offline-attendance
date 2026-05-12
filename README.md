# Control de Asistencia

Sistema web de registro de entrada y salida para empleados/alumnos, construido con **Nuxt 4**, **Vue 3**, **PrimeVue** y **Tailwind CSS**. Soporta validación de RUT chileno, funcionamiento offline con sincronización automática y persistencia en SQLite + IndexedDB.

## Características

- Registro de entrada y salida con RUT, nombre y apellido
- Validación y formateo automático de RUT chileno con `rut-kit` + Zod
- **Offline-first**: las marcas se guardan localmente en IndexedDB (Dexie) cuando no hay conexión y se sincronizan automáticamente al recuperarla
- Indicador visual de estado de conexión y progreso de sincronización
- Interfaz responsive con tema claro (PrimeVue Aura)
- API server-side con SQLite (bun:sqlite) en memoria

## Stack

| Capa        | Tecnología                     |
| ----------- | ------------------------------ |
| Framework   | Nuxt 4                         |
| UI          | Vue 3, PrimeVue 4, Tailwind CSS |
| Formularios | @tanstack/vue-form + Zod       |
| Base de datos | SQLite (bun:sqlite)         |
| Offline     | Dexie.js (IndexedDB)           |
| Testing     | Vitest + happy-dom             |
| Deploy      | Vercel (Bun 1.x)               |


## DEMO

https://offline-attendance.vercel.app

## Requisitos

- [Bun](https://bun.sh/) >= 1.x

## Instalación

```bash
bun install
```

## Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
bun run dev
```

## Producción

```bash
bun run build
bun run preview
```