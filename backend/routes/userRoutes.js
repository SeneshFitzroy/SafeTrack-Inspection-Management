const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Generate JWT token with user ID
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body.email);
    
    const { 
      name, 
      phiId, 
      nic, 
      address, 
      email, 
      phone, 
      officeLocation, 
      district, 
      divisions,
      password 
    } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ 
      $or: [
        { email },
        { phiId },
        { nic }
      ]
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with all required fields
    const newUser = new User({
      name,
      phiId,
      nic,
      address,
      email,
      phone,
      officeLocation,
      district,
      divisions,
      password
    });

    // Save user to database - this will trigger the pre-save hook to hash password
    await newUser.save();
    console.log('New user created:', newUser._id);

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Return success with token and user data
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phiId: newUser.phiId,
        role: newUser.role,
        district: newUser.district,
        divisions: newUser.divisions,
        officeLocation: newUser.officeLocation
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received for:', req.body.email);
    
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password using the method from the User model
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    console.log('Login successful for:', email);

    // Return success with token and user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phiId: user.phiId,
        role: user.role,
        district: user.district,
        divisions: user.divisions,
        officeLocation: user.officeLocation
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const {
    name,
    address,
    phone,
    officeLocation,
    district,
    divisions
  } = req.body;

  try {
    let user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (officeLocation) user.officeLocation = officeLocation;
    if (district) user.district = district;
    if (divisions) user.divisions = divisions;

    await user.save();
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phiId: user.phiId,
        role: user.role,
        district: user.district,
        divisions: user.divisions,
        officeLocation: user.officeLocation
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
router.put('/password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password matches
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Set new password and save
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
