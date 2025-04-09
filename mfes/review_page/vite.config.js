import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'review_page',
    filename: 'remoteEntry.js',
    exposes: {
      './ReviewPage': './src/ReviewPage.jsx',
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
    port: 5179,
  },
  preview: {
    port: 5006,
  },
})
