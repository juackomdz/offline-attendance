import { ref, inject } from 'vue'
import type { ToastMessageOptions } from 'primevue/toast'

export const useResponsiveToast = () => {
  const toast = inject('toast') as any

  const isMobile = ref(false)
  
  // Detectar si es móvil basándose en el viewport
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 640 // Tailwind's sm breakpoint
  }
  
  // Verificar en montaje y en cambios de tamaño
  if (process.client) {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  }

  // Función mejorada de toast responsivo
  const showToast = (options: ToastMessageOptions) => {
    const responsiveOptions: ToastMessageOptions = {
      ...options,
      position: isMobile.value ? 'top-center' : options.position || 'top-center',
      life: options.life || (isMobile.value ? 4000 : 3000), // Más tiempo en móvil
      closable: options.closable !== false, // Por defecto cerrable
      style: {
        ...(options.style || {}),
        // Estilos adicionales para móvil
        ...(isMobile.value ? {
          maxWidth: '95vw',
          width: '90vw',
          margin: '0 auto',
          transform: 'translateX(-50%)',
          left: '50%'
        }: {})
      }
    }
    
    if (toast) {
      toast.add(responsiveOptions)
    }
  }

  // Funciones helper específicas
  const success = (detail: string, summary = 'Éxito', options?: ToastMessageOptions) => {
    showToast({
      severity: 'success',
      summary,
      detail,
      ...options
    })
  }

  const error = (detail: string, summary = 'Error', options?: ToastMessageOptions) => {
    showToast({
      severity: 'error',
      summary,
      detail,
      life: 5000, // Más tiempo para errores
      ...options
    })
  }

  const info = (detail: string, summary = 'Información', options?: ToastMessageOptions) => {
    showToast({
      severity: 'info',
      summary,
      detail,
      ...options
    })
  }

  const warn = (detail: string, summary = 'Advertencia', options?: ToastMessageOptions) => {
    showToast({
      severity: 'warn',
      summary,
      detail,
      ...options
    })
  }

  return {
    showToast,
    success,
    error,
    info,
    warn,
    isMobile
  }
}