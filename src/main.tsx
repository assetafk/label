import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/queryClient.ts'
import { LenisProvider } from './app/LenisProvider.tsx'
import { ThemeProvider } from './app/theme.tsx'
import { UiProvider } from './app/ui.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UiProvider>
          <LenisProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LenisProvider>
        </UiProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
