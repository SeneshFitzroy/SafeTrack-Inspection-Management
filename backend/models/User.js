const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  phiId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  nic: { 
    type: String, 
    required: true, 
    unique: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  officeLocation: { 
    type: String, 
    required: true 
  },
  district: { 
    type: String, 
    required: true 
  },
  divisions: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['phi', 'admin'],
    default: 'phi'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Pre-save hook to hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    
    console.log(`Password hashed successfully. Hash length: ${this.password.length}`);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Use bcrypt to compare the plain password with the hashed one
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
