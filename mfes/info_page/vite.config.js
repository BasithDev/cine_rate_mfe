import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'info_page',
    filename: 'remoteEntry.js',
    exposes: {
      './InfoPage': './src/InfoPage.jsx',
    },
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
      'react-router-dom': { singleton: true },
    },
  })],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5176,
  },
  preview: {
    port: 5005,
  },
})
