const express = require('express');
const router = express.Router();
const passport = require('passport');
const quizController = require('../controllers/quizController');

// Yeni quiz oluştur (korumalı, eğitmen ya da admin)
router.post('/',
  passport.authenticate('jwt', { session: false }),
  quizController.createQuiz
);

// Tüm quizleri listele
router.get('/', quizController.getAllQuizzes);

router.get('/my',
  passport.authenticate('jwt', { session: false }),
  quizController.getMyQuizzes
);

// Tek quiz detayını al
router.get('/:id', quizController.getQuizById);
// routes/quiz.js

// routes/quiz.js
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  quizController.deleteQuiz
);


module.exports = router;
