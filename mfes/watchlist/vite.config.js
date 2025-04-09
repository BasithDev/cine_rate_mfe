import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [react(), federation({
    name: 'watchlist',
    filename: 'remoteEntry.js',
    exposes: {
      './WatchList': './src/WatchList.jsx',
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
    port: 5178,
  },
  preview: {
    port: 5004,
  },
})
