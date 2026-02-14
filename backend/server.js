// server.js
require('dotenv').config()
const http = require('http')
const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000

// ========================
// Database Connection
// ========================

connectDB()

// ========================
// Server Setup
// ========================

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`🚀 MedGuide API running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// ========================
// Graceful Shutdown
// ========================

const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`)

  server.close(() => {
    console.log('✅ HTTP server closed')
    process.exit(0)
  })

  // Force close after 10s
  setTimeout(() => {
    console.error('❌ Force shutdown')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
