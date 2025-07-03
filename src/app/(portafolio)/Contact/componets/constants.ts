import { ThemeColors } from "./types"

export const TEXT_CONTENT = {
  mainTitle: "¿Listo para colaborar?",
  mainDescription: "Hablemos sobre tu proyecto. Estoy disponible para freelance y oportunidades interesantes.",
  contactButton: "Contactarme",
  emailButton: "Email directo",
  formTitle: "Envíame un mensaje",
  nameLabel: "Nombre",
  emailLabel: "Email",
  messageLabel: "Mensaje",
  sendButton: "Enviar mensaje",
  sendingButton: "Enviando...",
  sentButton: "Enviado",
  errorButton: "Error",
  cancelButton: "Cancelar",
  successMessage: "Mensaje enviado con éxito",
  successDescription: "Te responderé lo antes posible.",
  errorMessage: "Error al enviar",
  errorDescription: "Por favor intenta nuevamente más tarde."
}

export const PARTICLE_SETTINGS = {
  count: {
    mobile: 30,
    desktop: 60
  },
  size: {
    min: 1,
    max: 3
  },
  speed: 0.5,
  connectionDistance: 100,
  lineWidth: 0.5
}

export const COLORS: ThemeColors = {
  light: {
    primary: 'from-gray-50 to-gray-100',
    text: 'text-gray-800',
    button: {
      primary: 'bg-gray-800 text-white hover:bg-gray-700',
      secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
      outline: 'border-gray-300 text-gray-700 hover:bg-gray-100'
    },
    form: {
      bg: 'bg-white',
      text: 'text-gray-800',
      input: {
        text: 'text-gray-900',
        bg: 'bg-white',
        border: 'border-gray-300',
        placeholder: 'placeholder-gray-500'
      }
    },
    accent: 'text-gray-600'
  },
  dark: {
    primary: 'from-gray-900 to-gray-800',
    text: 'text-gray-100',
    button: {
      primary: 'bg-gray-700 text-white hover:bg-gray-600',
      secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700',
      outline: 'border-gray-600 text-gray-200 hover:bg-gray-700'
    },
    form: {
      bg: 'bg-gray-800',
      text: 'text-gray-100',
      input: {
        text: 'text-gray-100',
        bg: 'bg-gray-700',
        border: 'border-gray-600',
        placeholder: 'placeholder-gray-400'
      }
    },
    accent: 'text-gray-300'
  }
}