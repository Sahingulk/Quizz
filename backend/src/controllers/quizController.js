const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body; // questions: [{text, options, correctIndex, ...}]
    // Soruları topluca ekle
    const savedQuestions = await Question.insertMany(questions);
    const quiz = new Quiz({
      title,
      description,
      questions: savedQuestions.map(q => q._id),
      createdBy: req.user._id
    });
    await quiz.save();
    res.status(201).json({ message: "Quiz oluşturuldu!", quiz });
  } catch (err) {
    res.status(400).json({ message: "Quiz oluşturulamadı.", error: err.message });
  }
};


exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username').populate('questions');
    res.json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: "Quizler alınamadı.", error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'username').populate('questions');
    if (!quiz) return res.status(404).json({ message: "Quiz bulunamadı." });
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ message: "Quiz alınamadı.", error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('questions');
    if (!quiz) return res.status(404).json({ message: "Quiz bulunamadı." });
    res.json({ quiz }); // Bu şekilde bırakabilirsin
  } catch (err) {
    res.status(500).json({ message: "Quiz alınamadı.", error: err.message });
  }
};

// controllers/quizController.js
exports.getMyQuizzes = async (req, res) => {
  try {
    // Sadece kendi oluşturduğu quizleri getir
    const quizzes = await Quiz.find({ createdBy: req.user._id }).populate('questions');
    res.json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: "Quizler alınamadı.", error: err.message });
  }
  console.log('getMyQuizzes called for user:', req.user.username);
};


// controllers/quizController.js
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    // Sadece kendi oluşturduğu quiz silinebilsin!
    if (!quiz) return res.status(404).json({ message: "Quiz bulunamadı." });
    if (quiz.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Bu quiz'i silme yetkiniz yok." });

    await quiz.deleteOne();
    res.json({ message: "Quiz silindi!" });
  } catch (err) {
    res.status(500).json({ message: "Quiz silinemedi.", error: err.message });
  }
};
