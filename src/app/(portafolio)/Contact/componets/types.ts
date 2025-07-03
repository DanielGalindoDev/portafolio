export type FormData = {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type ThemeColors = {
  light: ColorPalette
  dark: ColorPalette
}

export type ColorPalette = {
  primary: string
  text: string
  button: {
    primary: string
    secondary: string
    outline: string
  }
  form: {
    bg: string
    text: string
    input: {
      text: string
      bg: string
      border: string
      placeholder: string
    }
  }
  accent: string
}