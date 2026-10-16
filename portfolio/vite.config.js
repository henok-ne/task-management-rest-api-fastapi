import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serve the resume files with real download headers (vite has no mime entry for .docx).
const resumeDownloads = () => {
  const attach = (server) => {
    server.middlewares.use((req, res, next) => {
      if (req.url && /\.docx(\?|$)/i.test(req.url)) {
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        )
        res.setHeader('Content-Disposition', 'attachment; filename="Henok-Mesfin-Resume.docx"')
      }
      next()
    })
  }
  return { name: 'resume-download-headers', configureServer: attach, configurePreviewServer: attach }
}

export default defineConfig({
  plugins: [react(), resumeDownloads()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // allow the sandboxed preview host (*.e2b.app) to load the app in an iframe
    allowedHosts: true,
    hmr: { protocol: 'wss', clientPort: 443 },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
})
