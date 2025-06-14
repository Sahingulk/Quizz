// File: backend/src/models/GameSession.js
const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  pin: { type: String, required: true, unique: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentQuestion: { type: Number, default: 0 },
//   players: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       username: String,
//       score: { type: Number, default: 0 } 
//     }
//   ],

players: [
    {
      userId: { type: String }, // <-- DÜZELT (Eskisi: type: mongoose.Schema.Types.ObjectId)
      username: String,
      score: { type: Number, default: 0 }
    }
  ],
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GameSession', gameSessionSchema);
