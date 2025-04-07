const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  inspectionId: {
    type: String,
    required: true,
    unique: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    type: String
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inspectorName: {
    type: String
  },
  inspectionDate: {
    type: Date,
    required: true
  },
  inspectionType: {
    type: String,
    enum: ['Routine', 'Follow-up', 'Complaint-based', 'Special'],
    default: 'Routine'
  },
  findings: {
    type: String
  },
  recommendations: {
    type: String
  },
  compliance: {
    foodHandling: {
      type: Number,
      min: 0,
      max: 10
    },
    sanitationCleanliness: {
      type: Number,
      min: 0,
      max: 10
    },
    wasteManagement: {
      type: Number,
      min: 0,
      max: 10
    },
    pestControl: {
      type: Number,
      min: 0,
      max: 10
    },
    waterQuality: {
      type: Number,
      min: 0,
      max: 10
    }
  },
  overallRating: {
    type: Number,
    min: 0,
    max: 10
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed', 'Passed'],
    default: 'Completed'
  },
  photos: [{
    url: String,
    caption: String,
    timestamp: Date
  }],
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inspection', inspectionSchema);
