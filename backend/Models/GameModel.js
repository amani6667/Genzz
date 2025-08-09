const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "Game name is required"],
    trim: true
  },
  providerName: {
    type: String,
    required: [true, "Provider name is required"],
    trim: true
  },
  gameId: {
    type: String,
    required: [true, "Game ID is required"],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Game image is required"]
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

// Update the updatedAt field before saving
gameSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const GameModel = mongoose.model("Game", gameSchema);

module.exports = GameModel;