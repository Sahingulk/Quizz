const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Kayıt başarılı!' });
  } catch (err) {
    res.status(400).json({ message: 'Kayıt başarısız.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Kullanıcı bulunamadı.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Şifre yanlış.' });

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, user: payload });
  } catch (err) {
    res.status(400).json({ message: 'Giriş başarısız.', error: err.message });
  }
};


