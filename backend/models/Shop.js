const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: String, 
    required: true 
  },
  telephone: { 
    type: String 
  },
  licenseNo: { 
    type: String, 
    unique: true 
  },
  employees: { 
    type: Number, 
    default: 0 
  },
  gnDivision: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String 
  },
  status: { 
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active'
  },
  nicNumber: { 
    type: String 
  },
  businessRegNo: { 
    type: String 
  },
  district: { 
    type: String 
  },
  phiArea: { 
    type: String 
  },
  privateAddress: { 
    type: String 
  },
  licenseYear: { 
    type: String 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('Shop', shopSchema);
