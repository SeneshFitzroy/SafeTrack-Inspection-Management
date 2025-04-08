const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  inspectionId: {
    type: String,
    required: true,
    unique: true
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    type: String
  },
  GNDivision: {
    type: String
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  inspectorName: {
    type: String
  },
  inspectionType: {
    type: String,
    enum: ['Routine', 'Follow-up', 'Complaint-based', 'Special'],
    default: 'Routine'
  },
  inspectionDate: {
    type: Date,
    default: Date.now
  },
  overallRating: {
    type: String,
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
  },
  locationEnvironment: {
    type: Array,
  },
  buildingStructure: {
    type: Array,
  },
  foodPreparationArea: {
    type: Array,
  },
  healthInstructions: {
    type: Array
  }
});

module.exports = mongoose.model('Inspection', inspectionSchema);