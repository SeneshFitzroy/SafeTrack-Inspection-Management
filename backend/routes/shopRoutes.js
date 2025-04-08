import express from 'express';
import Shop from '../models/Shop.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/shops
// @desc    Create a new shop
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // Debug user information
    
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

    // Create new shop with explicit user ID
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
// @desc    Get all shops for the current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    
    const shops = await Shop.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    
    res.json(shops);
  } catch (error) {
    console.error('Get shops error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ensure this route is defined before any route with ':id'
router.get('/divisions', auth, async (req, res) => {
  try {
    const shopsByDivision = await Shop.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: "$gnDivision", count: { $sum: 1 } } },
      { $project: { division: "$_id", count: 1, _id: 0 } }
    ]);

    res.json(shopsByDivision);
  } catch (error) {
    console.error('Error fetching shops by division:', error.message);
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

    // Check if the shop belongs to the current user
    if (shop.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. Not authorized to view this shop' });
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

// @route   GET /api/shops/name/:name
// @desc    Get shop by name
// @access  Private
router.get('/name/:name', auth, async (req, res) => {
  try {
    const shop = await Shop.findOne({ name: req.params.name, createdBy: req.user._id });

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json(shop);
  } catch (error) {
    console.error('Get shop by name error:', error.message);
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

    // Check if the shop belongs to the current user
    if (shop.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. Not authorized to update this shop' });
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

    // Check if the shop belongs to the current user
    if (shop.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. Not authorized to delete this shop' });
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

// @route   POST /api/shops/update-ownership
// @desc    Update all shops with no owner to the current user
// @access  Private
router.post('/update-ownership', auth, async (req, res) => {
  try {
    console.log('Updating shop ownership for user:', req.user._id);
    
    // Find all shops without a createdBy field or where createdBy is null
    const shops = await Shop.find({ 
      $or: [
        { createdBy: { $exists: false } },
        { createdBy: null }
      ]
    });
    
    console.log(`Found ${shops.length} shops without owner assignment`);
    
    // Update each shop with the current user's ID
    const updatedShops = [];
    for (const shop of shops) {
      shop.createdBy = req.user._id;
      await shop.save();
      updatedShops.push(shop);
      console.log(`Updated shop: ${shop.name} (${shop._id}) - assigned to user ${req.user._id}`);
    }
    
    res.json({ 
      message: `Successfully updated ${updatedShops.length} shops`,
      updatedShops: updatedShops.map(shop => shop.name)
    });
  } catch (error) {
    console.error('Update shop ownership error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;