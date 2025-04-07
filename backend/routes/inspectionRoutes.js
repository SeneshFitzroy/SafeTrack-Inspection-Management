const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const auth = require('../middleware/auth');

// Generate unique inspection ID
const generateInspectionId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const prefix = `INS${year}${month}`;
  
  // Find the latest inspection to determine the next number
  const latestInspection = await Inspection.findOne({
    inspectionId: new RegExp(`^${prefix}`)
  }).sort({ inspectionId: -1 });
  
  let nextNumber = 1;
  if (latestInspection) {
    const latestNumber = parseInt(latestInspection.inspectionId.substr(7));
    nextNumber = latestNumber + 1;
  }
  
  return `${prefix}${String(nextNumber).padStart(3, '0')}`;
};

// @route   POST /api/inspections
// @desc    Create a new inspection
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { 
      shopId, 
      shopName, 
      shopAddress,
      inspectionDate, 
      inspectionType, 
      findings, 
      recommendations, 
      compliance,
      overallRating,
      status,
      photos,
      notes
    } = req.body;

    // Generate unique inspection ID
    const inspectionId = await generateInspectionId();

    // Create new inspection
    const newInspection = new Inspection({
      inspectionId,
      shopId,
      shopName,
      shopAddress,
      inspector: req.user._id,
      inspectorName: req.user.name,
      inspectionDate,
      inspectionType,
      findings,
      recommendations,
      compliance,
      overallRating,
      status,
      photos,
      notes
    });

    const inspection = await newInspection.save();

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
    const inspection = await Inspection.findById(req.params.id)
      .populate('shopId', 'name address gnDivision category')
      .populate('inspector', 'name email');
    
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    res.json(inspection);
  } catch (error) {
    console.error('Get inspection error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inspection not found' });
    }
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
    const inspection = await Inspection.findById(req.params.id);
    
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    await inspection.remove();
    res.json({ message: 'Inspection deleted' });
  } catch (error) {
    console.error('Delete inspection error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
