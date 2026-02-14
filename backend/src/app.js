// app.js
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const compression = require('compression')

const app = express()

// ========================
// Security & Performance
// ========================

app.use(helmet())
app.use(compression())

app.use(cors({
  origin: '*', // later restrict for production domains
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
})

app.use('/api', apiLimiter)

// ========================
// Routes
// ========================

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'MedGuide API', time: new Date() })
})

app.use('/api/leads', require('./routes/leadRoutes'))

// ========================
// Global Error Handler
// ========================

app.use((err, req, res, next) => {
  console.error('Global Error:', err)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
})

// ========================
// 404 Handler
// ========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

module.exports = app
