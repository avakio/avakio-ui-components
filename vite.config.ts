import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// Check if we're building the library or the app
const isLibBuild = process.env.BUILD_MODE === 'lib'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages deployment - change 'avakio-ui-components' to your repo name
  base: process.env.NODE_ENV === 'production' ? '/avakio-ui-components/' : '/',
  server: {
    port: 5000,
    // Proxy API requests to the mock backend server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    ...(isLibBuild ? [dts({ insertTypesEntry: true })] : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: isLibBuild ? {
    // Library build configuration
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AvakioUIComponents',
      fileName: (format) => `avakio-ui-components.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  } : {
    // App build configuration (for deployment)
    outDir: 'dist',
    sourcemap: true
  }
})
