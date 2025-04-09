import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'search_result',
    filename: 'remoteEntry.js',
    exposes: {
      './Search_result': './src/Search_result',
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
    port: 5177,
  },
  preview: {
    port: 5003,
  },
})
