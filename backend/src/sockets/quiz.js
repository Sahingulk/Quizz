
// backend/src/sockets/quiz.js
const GameSession = require('../models/GameSession');
const Quiz = require('../models/Quiz');
const { nanoid } = require('nanoid');

const inMemoryAnswers = {}; // { pin: [ { userId, answerIndex, isCorrect } ] }

function quizSocket(io) {
  io.of('/quiz').on('connection', (socket) => {
    console.log('Quiz Socket bağlandı:', socket.id);

    // 1. Oyun başlat
    socket.on('start_game', async ({ quizId, hostId, username }, callback) => {
      try {
        const pin = nanoid(6);
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) return callback({ error: 'Quiz bulunamadı!' });

        const gameSession = await GameSession.create({
          pin,
          quiz: quizId,
          host: hostId,
          currentQuestion: 0,
          // players: [{ userId: hostId, username, score: 0 }]
          players: []
        });

        socket.join(pin);
        callback({ pin, quizTitle: quiz.title });
        io.of('/quiz').to(pin).emit('player_list', gameSession.players);
      } catch (err) {
        callback({ error: err.message });
      }
    });

    // 2. Oyuncu katılımı
    socket.on('join_game', async ({ pin, userId, username }, callback) => {
      const session = await GameSession.findOne({ pin }).populate({
        path: 'quiz',
        populate: { path: 'questions' }
      });
      console.log("Yeni katılımcı:", username, "PIN:", pin);
      console.log("Tüm oyuncular:", session.players.map(p=>p.username));

      if (!session) return callback({ error: 'Oyun bulunamadı!' });

      if (!session.players.find(p => p.userId == userId)) {
        session.players.push({ userId, username, score: 0 });
        await session.save();
      }

      socket.join(pin);
      callback({ ok: true, pin, username });
      io.of('/quiz').to(pin).emit('player_list', session.players);

      // Varsa aktif soruyu göster
      const currentIndex = session.currentQuestion > 0 ? session.currentQuestion - 1 : null;
      if (currentIndex !== null) {
        const question = session.quiz.questions[currentIndex];
        socket.emit('question', {
          index: currentIndex,
          text: question.text,
          options: question.options,
          media: question.media
        });
      }
    });

    // 3. Yeni soru yayını (host tarafından)
    socket.on('next_question', async ({ pin }, callback) => {
      const session = await GameSession.findOne({ pin }).populate({
        path: 'quiz',
        populate: { path: 'questions' }
      });
      if (!session) return callback({ error: 'Oyun yok!' });

      const question = session.quiz.questions[session.currentQuestion];
      if (!question) return callback({ finished: true });

      // Cevapları sıfırla
      inMemoryAnswers[pin] = [];

      io.of('/quiz').to(pin).emit('question', {
        index: session.currentQuestion,
        text: question.text,
        options: question.options,
        media: question.media,
        timeLimit: question.timeLimit // <<< EKLE!
      });

      session.currentQuestion += 1;
      await session.save();

      callback({ ok: true });
    });

    // 4. Oyuncudan cevap al
    socket.on('answer', async ({ pin, userId, answerIndex }, callback) => {
      const session = await GameSession.findOne({ pin }).populate({
        path: 'quiz',
        populate: { path: 'questions' }
      });
      if (!session) return callback({ error: 'Oturum yok!' });

      const currentQ = session.currentQuestion - 1;
      const question = session.quiz.questions[currentQ];
      if (!question) return callback({ error: 'Soru yok!' });

      // Cevap belleği başlat
      if (!inMemoryAnswers[pin]) inMemoryAnswers[pin] = [];

      // Aynı kişi tekrar cevap veremesin
      if (inMemoryAnswers[pin].some(a => a.userId == userId)) {
        return callback({ error: 'Zaten cevap verdiniz!' });
      }

      const isCorrect = answerIndex === question.correctIndex;
      inMemoryAnswers[pin].push({ userId, answerIndex, isCorrect });

      // Oyuncuya anlık geri dönüş yap
      callback({
        correct: isCorrect,
        correctIndex: question.correctIndex
      });


      if (inMemoryAnswers[pin].length >= session.players.length) {
        inMemoryAnswers[pin].forEach(({ userId, isCorrect }) => {
          const player = session.players.find(p => p.userId == userId);
          if (player && isCorrect) player.score += 100;
        });
        await session.save();
        // SADECE SON SORUDA!
        if (session.currentQuestion >= session.quiz.questions.length) {
          io.of('/quiz').to(pin).emit('scoreboard', session.players);
        }
      }

      });

    

    // 5. Oyuncu çıkarsa
    socket.on('disconnect', () => {
      console.log('Oyuncu bağlantıyı kesti:', socket.id);
      // Gerekirse kullanıcı silme veya güncelleme yapılabilir
    });
  });
}

module.exports = { quizSocket };
