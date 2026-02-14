// models/Lead.js
const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      // removed index: true to avoid duplicate index warning
    },

    language: {
      type: String,
      enum: ['en', 'ar', 'hi'],
      default: 'en'
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    problem: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
      default: 'new'
      // removed index: true to avoid duplicate index warning
    },

    source: {
      type: String,
      default: 'website'
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

// Indexes for performance
LeadSchema.index({ phone: 1 })
LeadSchema.index({ status: 1 })
LeadSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Lead', LeadSchema)
