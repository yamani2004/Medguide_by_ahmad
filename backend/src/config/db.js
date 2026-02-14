// src/config/db.js
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected')
    })

    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('🛑 MongoDB connection closed (App terminated)')
      process.exit(0)
    })

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
