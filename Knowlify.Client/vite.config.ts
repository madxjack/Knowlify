import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'
import child_process from 'child_process'

// Determinar la carpeta base dependiendo del entorno de usuario
const baseFolder = process.env.APPDATA || `${process.env.HOME}/.aspnet/https`

const certificateName = 'Knowlify.Client'
const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

// Función para generar certificados en desarrollo
function ensureCertificates() {
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    const result = child_process.spawnSync(
      'dotnet',
      [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ],
      { stdio: 'inherit' },
    )

    if (result.status !== 0) {
      throw new Error('Could not create certificate.')
    }
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
    },
  },
  server: {
    port: 5173,
    https:
      process.env.NODE_ENV === 'development'
        ? {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
          }
        : undefined,
  },
  // Llamar a ensureCertificates solo en desarrollo
  ...(process.env.NODE_ENV === 'development' && {
    onConfigResolved: ensureCertificates,
  }),
})
