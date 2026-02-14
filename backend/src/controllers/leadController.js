// controllers/leadController.js
const Lead = require('../models/Lead')
const mongoose = require('mongoose')

exports.createLead = async (req, res) => {
  try {
    const { name, phone, country, problem } = req.body

    // Basic validation
    if (!name || !phone || !country || !problem) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Sanitize input
    const cleanData = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      country: String(country).trim(),
      problem: String(problem).trim()
    }

    // Create lead
    const lead = await Lead.create({
      ...cleanData,
      status: 'new',
      source: 'website',
      createdAt: new Date()
    })

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: {
        id: lead._id,
        name: lead.name,
        phone: lead.phone,
        country: lead.country
      }
    })

  } catch (err) {
    console.error('CreateLead Error:', err)

    // Duplicate key error (e.g. phone unique)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Lead already exists'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}


exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    })
  } catch (err) {
    console.error('GetLeads Error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads'
    })
  }
}


exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid lead ID' })
    }

    const lead = await Lead.findById(id)

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    res.status(200).json({ success: true, data: lead })
  } catch (err) {
    console.error('GetLeadById Error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}


exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowedStatus = ['new', 'contacted', 'in-progress', 'converted', 'closed']

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Lead status updated',
      data: lead
    })

  } catch (err) {
    console.error('UpdateLead Error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}


exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params

    const lead = await Lead.findByIdAndDelete(id)

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    })

  } catch (err) {
    console.error('DeleteLead Error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
