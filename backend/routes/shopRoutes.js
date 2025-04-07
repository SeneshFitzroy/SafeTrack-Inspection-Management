const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const auth = require('../middleware/auth');

// @route   POST /api/shops
// @desc    Create a new shop
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { 
      name, 
      address, 
      owner, 
      telephone, 
      licenseNo, 
      employees, 
      gnDivision, 
      category, 
      status,
      nicNumber,
      businessRegNo,
      district,
      phiArea,
      privateAddress,
      licenseYear
    } = req.body;

    // Check if shop with license number already exists
    if (licenseNo) {
      const existingShop = await Shop.findOne({ licenseNo });
      if (existingShop) {
        return res.status(400).json({ message: 'Shop with this license number already exists' });
      }
    }

    // Create new shop
    const newShop = new Shop({
      name,
      address,
      owner,
      telephone,
      licenseNo,
      employees,
      gnDivision,
      category,
      status,
      nicNumber,
      businessRegNo,
      district,
      phiArea,
      privateAddress,
      licenseYear,
      createdBy: req.user._id
    });

    const shop = await newShop.save();

    res.status(201).json(shop);
  } catch (error) {
    console.error('Create shop error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/shops
// @desc    Get all shops
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    console.error('Get shops error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/shops/:id
// @desc    Get shop by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json(shop);
  } catch (error) {
    console.error('Get shop error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/shops/:id
// @desc    Update shop
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    // Update fields
    const updatedFields = { ...req.body, updatedAt: Date.now() };
    
    // If license number is being changed, check if it's unique
    if (updatedFields.licenseNo && updatedFields.licenseNo !== shop.licenseNo) {
      const existingShop = await Shop.findOne({ licenseNo: updatedFields.licenseNo });
      if (existingShop) {
        return res.status(400).json({ message: 'Shop with this license number already exists' });
      }
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedShop);
  } catch (error) {
    console.error('Update shop error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/shops/:id
// @desc    Delete shop
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    await shop.remove();
    res.json({ message: 'Shop deleted' });
  } catch (error) {
    console.error('Delete shop error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
