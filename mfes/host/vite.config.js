import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        header: 'http://localhost:5001/assets/remoteEntry.js',
        home: 'http://localhost:5002/assets/remoteEntry.js',
        search_result: 'http://localhost:5003/assets/remoteEntry.js',
        watchlist: 'http://localhost:5004/assets/remoteEntry.js',
        info_page: 'http://localhost:5005/assets/remoteEntry.js',
        review_page: 'http://localhost:5006/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 5000,
  },
})