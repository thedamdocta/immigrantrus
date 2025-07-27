/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly SNUG_BASE_URL: string
  readonly SNUG_EMAIL: string
  readonly SNUG_PASSWORD: string
  // Add other Vite env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
