/// <reference types="vite/client" />

// This tells TypeScript about the environment variables
interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
