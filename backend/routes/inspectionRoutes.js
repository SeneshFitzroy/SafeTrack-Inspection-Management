const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// @route   POST /api/inspections
// @desc    Create a new inspection
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);

    const { 
      shopName, 
      shopAddress,
      GNDivision,
      inspectionType, 
      overallRating,
      status,
      photos,
      notes,
      foodPreparationArea,
      locationEnvironment,
      buildingStructure,
      healthInstructions,
    } = req.body;

    // Create new inspection
    const newInspection = new Inspection({
      inspectionId: new mongoose.Types.ObjectId(),
      shopName,
      shopAddress,
      GNDivision,
      inspector: req.user.userId,
      inspectorName: req.user.name,
      inspectionType,
      overallRating,
      status,
      photos,
      notes,
      foodPreparationArea,
      locationEnvironment,
      buildingStructure,
      healthInstructions,
    });

    console.log('Creating new inspection:', newInspection);
    const inspection = await newInspection.save();

    console.log('Inspection created successfully:', inspection);
    res.status(201).json(inspection);
  } catch (error) {
    console.error('Create inspection error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inspections
// @desc    Get all inspections
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const inspections = await Inspection.find()
      .sort({ inspectionDate: -1 })
      .populate('shopId', 'name address');
    
    res.json(inspections);
  } catch (error) {
    console.error('Get inspections error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/inspections/:id
// @desc    Get inspection by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findOne({ inspectionId: req.params.id })
      .populate('shopId', 'name address gnDivision category')
      .populate('inspector', 'name email');
    
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    res.json(inspection);
  } catch (error) {
    console.error('Get inspection error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/inspections/:id
// @desc    Update inspection
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);
    
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    // Update fields
    const updatedFields = { ...req.body, updatedAt: Date.now() };
    
    const updatedInspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedInspection);
  } catch (error) {
    console.error('Update inspection error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/inspections/:id
// @desc    Delete inspection
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Use findByIdAndDelete to directly delete the inspection
    const inspection = await Inspection.findByIdAndDelete(req.params.id);

    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    res.json({ message: 'Inspection deleted successfully' });
  } catch (error) {
    console.error('Delete inspection error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;