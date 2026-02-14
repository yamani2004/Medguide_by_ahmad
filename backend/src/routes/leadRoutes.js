// routes/leadRoutes.js
const express = require('express')
const router = express.Router()

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead
} = require('../controllers/leadController')

// Middlewares (future-ready)
// const auth = require('../middlewares/auth')
// const admin = require('../middlewares/admin')

// Public Routes
router.post('/', createLead)  // Create lead (public form)

// Protected Routes (Admin / Dashboard)
router.get('/', getAllLeads)              // Get all leads
router.get('/:id', getLeadById)           // Get single lead
router.patch('/:id/status', updateLeadStatus) // Update lead status
router.delete('/:id', deleteLead)         // Delete lead

module.exports = router
