// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   options: [{ type: String, required: true }],
//   correctIndex: { type: Number, required: true },  // doğru cevabın options dizisindeki index'i
//   media: { type: String }, // varsa resim/video url
//   explanation: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Question', questionSchema);

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  media: { type: String }, // opsiyonel: görsel/video
  timeLimit: { type: Number, default: 10 } // <<< BURADA! (varsayılan 10sn)
});

module.exports = mongoose.model('Question', questionSchema);
