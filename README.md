# 🎉 Kahoot Clone (Gerçek Zamanlı Quiz Uygulaması)

## Projenin Amacı

Bu proje, Kahoot benzeri bir gerçek zamanlı quiz uygulamasıdır.  
Kullanıcılar quizler oluşturabilir, canlı oyun başlatabilir, arkadaşlarını PIN ile davet edebilir ve aynı anda yarışabilirler.

---

## Özellikler

- JWT ile güvenli kullanıcı kayıt/giriş
- Her kullanıcı kendi quizlerini oluşturabilir, düzenleyebilir, silebilir
- Gerçek zamanlı çok oyunculu oyun (Socket.IO)
- Oyun başlatma ve PIN ile katılım
- Her soruya özel süre limiti
- Doğru/yanlış ses efektleri ve geri sayım sesi
- Soru sonrası anlık skor tablosu
- Arka plan müziği (isteğe bağlı)
- Host ve oyuncular için ayrı ekranlar

---

## Ekran Görüntüleri

> Örnek:  
> ![Giriş Ekranı](docs/screens/login.png)  
> ![Oyun Ekranı](docs/screens/game.png)  
> ![Skor Tablosu](docs/screens/score.png)

---

## Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın

```sh
git clone https://github.com/kullanici-adi/proje-adi.git
cd proje-adi

cd backend
npm install
# .env dosyası oluştur (örn. .env.example içinden kopyala)
npm start
# veya geliştirme için:
# npx nodemon src/server.js


.env dosyanız şu şekilde olmalı:

ini
Kopyala
Düzenle
MONGODB_URI=mongodb://localhost:27017/projeisim
JWT_SECRET=supersecretkey

3. Frontend’i Başlat
sh
Kopyala
Düzenle
# Ayrı bir terminal aç:
cd frontend/public
# Statik olarak çalıştırmak için:
npx http-server .
# veya VSCode Live Server ile açabilirsin.


proje-adi/
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # API iş mantığı
│   │   ├── models/         # Mongoose şemaları
│   │   ├── routes/         # Express rotaları
│   │   ├── sockets/        # Socket.IO yönetimi
│   │   └── server.js       # Express ana sunucu
│   └── package.json
│
├── frontend/
│   └── public/
│       ├── src/
│       │   ├── js/         # Tüm sayfa scriptleri
│       │   └── assets/     # Sesler ve görseller
│       ├── login.html
│       ├── dashboard.html
│       ├── host.html
│       ├── host-game.html
│       ├── join.html
│       ├── player-game.html
│       ├── score.html
│       └── ...             # Diğer sayfalar
├── README.md
└── ...

