import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = ref<Theme>('dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateDocumentTheme()
  }

  const updateDocumentTheme = () => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme.value)
  }

  const initializeTheme = () => {
    const storedTheme = localStorage.getItem('theme') as Theme

    theme.value = storedTheme || 'dark'

    updateDocumentTheme()
  }

  watch(theme, updateDocumentTheme)

  onMounted(() => {
    initializeTheme()
  })

  return {
    theme,
    toggleTheme,
  }
}
