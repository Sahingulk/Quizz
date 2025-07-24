
-----

# 🎮 Kahoot Clone (Gerçek Zamanlı Quiz Platformu)

Bu proje, **Kahoot\!** benzeri, **gerçek zamanlı** ve **çok oyunculu** bir quiz uygulamasıdır. Kullanıcılar kendi quiz'lerini oluşturabilir, oyunlar başlatabilir ve PIN kodu aracılığıyla başkalarını davet ederek heyecanlı yarışmalara katılabilirler.

-----

## 🚀 Başlarken

Projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

### 1\. Projeyi Klonla

Öncelikle projenin deposunu klonlayın ve proje dizinine gidin:

```bash
git clone https://github.com/kullanici-adiniz/proje-adi.git
cd proje-adi
```

### 2\. Backend Kurulumu

Backend sunucusunu kurmak ve başlatmak için aşağıdaki adımları uygulayın:

```bash
cd backend
npm install
```

Ortama özel ayarlar için `.env.example` dosyasını `backend/.env` olarak kopyalayın ve gerekli değerleri doldurun:

```bash
cp .env.example .env
```

`.env` dosyası örneği:

```ini
MONGODB_URI=mongodb://localhost:27017/kahoot-clone
JWT_SECRET=supersecretkey
```

Sunucuyu başlatın:

```bash
npm start
# veya geliştirme için:
# npx nodemon src/server.js
```

### 3\. Frontend Kurulumu

Frontend uygulamasını başlatmak için ayrı bir terminal açın ve aşağıdaki adımları izleyin:

```bash
cd frontend/public
```

Basit bir statik sunucu kullanarak frontend'i çalıştırabilirsiniz (örneğin, `http-server`):

```bash
npx http-server .
# veya VS Code'un Live Server eklentisini kullanabilirsiniz
```

-----

## 👁️‍🗨️ Ekran Görüntüleri

*(Buraya uygulamanızın ekran görüntülerini ekleyebilirsiniz. Örneğin:)*

| Giriş Ekranı | Dashboard | Oyun Başlatma | Oyun İçi |
| :----------: | :-------: | :-----------: | :------: |
|  |  |  |  |

-----

## 🗂️ Dosya & Klasör Yapısı

Projenin temel dizin yapısı aşağıdaki gibidir:

```
proje-adi/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API iş mantığı (kullanıcı, quiz yönetimi vb.)
│   │   ├── models/         # MongoDB/Mongoose şemaları
│   │   ├── routes/         # Express API rotaları
│   │   ├── sockets/        # Socket.IO gerçek zamanlı iletişim mantığı
│   │   └── server.js       # Express ana sunucusu ve Socket.IO entegrasyonu
│   └── package.json        # Backend bağımlılıkları ve scriptleri
│
├── frontend/
│   └── public/
│       ├── src/
│       │   ├── js/             # Tüm sayfa scriptleri ve etkileşim mantığı
│       │   └── assets/         # Sesler, görseller ve diğer medya dosyaları
│       ├── login.html          # Kullanıcı giriş/kayıt sayfası
│       ├── dashboard.html      # Kullanıcı ana paneli, quiz listeleme
│       ├── host.html           # Quiz başlatma ve oyun yönetimi
│       ├── host-game.html      # Host'un oyun içi ekranı
│       ├── join.html           # Oyuncuların PIN ile katılım sayfası
│       ├── player-game.html    # Oyuncunun oyun içi ekranı
│       ├── score.html          # Skor tablosu ve sonuçlar
│       └── ... (diğer HTML sayfaları)
│
└── README.md
```

-----

## 🧑‍💻 Temel Oyun Akışı

Uygulamanın ana akışı şu adımları takip eder:

1.  **Kullanıcı Kayıt/Giriş**: Kullanıcılar sisteme kaydolur veya mevcut hesaplarıyla giriş yapar.
2.  **Dashboard (Quiz Listesi)**: Kullanıcılar kendi oluşturdukları quiz'leri görüntüleyebilir veya yeni bir quiz oluşturabilir.
3.  **Quiz Oluştur / Oyun Başlat**: Kullanıcı bir quiz seçer ve yeni bir oyun oturumu başlatır. Bu işlem, oyuncuların katılması için benzersiz bir PIN kodu oluşturur.
4.  **PIN ile Katılım**: Oyuncular, host tarafından verilen PIN kodunu kullanarak oyuna katılırlar.
5.  **Canlı Oyun Başlangıcı**: Host "Başlat" butonuna tıkladığında, oyun başlar ve tüm oyunculara eş zamanlı olarak sorular gösterilir.
6.  **Soru Gösterimi & Cevaplar**: Her soru belirli bir süre boyunca gösterilir ve oyuncular cevaplarını seçer.
7.  **Her Sorudan Sonra Skor Tablosu**: Her sorunun ardından, güncel skor tablosu tüm oyunculara anlık olarak gösterilir.
8.  **Son Soru → Final Skoru**: Tüm sorular tamamlandığında, nihai skor tablosu ve kazananlar ilan edilir.
9.  **İstenirse Yeni Oyun\!**: Kullanıcılar dilerlerse aynı veya farklı bir quiz ile yeni bir oyun başlatabilirler.

-----

## 🛠️ Kullanılan Teknolojiler

Bu projenin geliştirilmesinde aşağıdaki teknolojiler kullanılmıştır:

  * **Frontend**:
      * **HTML5**: Sayfa yapısı
      * **CSS3**: Stil ve tasarım
      * **JavaScript (Vanilla JS)**: Dinamik etkileşimler ve oyun mantığı
      * **Bootstrap**: Duyarlı ve modern UI bileşenleri için CSS framework'ü
  * **Backend**:
      * **Node.js**: Sunucu tarafı çalışma zamanı ortamı
      * **Express.js**: Node.js için web uygulama framework'ü
      * **Socket.IO**: Gerçek zamanlı, çift yönlü iletişim için kütüphane
      * **Mongoose**: MongoDB için ODM (Object Data Modeling) kütüphanesi
      * **JWT (JSON Web Tokens)**: Kullanıcı kimlik doğrulaması ve oturum yönetimi
  * **Veritabanı**:
      * **MongoDB**: NoSQL veritabanı

-----

## 🎵 Ses & Müzik Özellikleri

Uygulama, oyun deneyimini zenginleştirmek için çeşitli ses efektleri ve müzikler kullanır:

  * **Arka Plan Müziği**: `/src/assets/music/arka.mp3`
  * **Son 3 Saniye Uyarısı**: Geri sayım için `tick.mp3` sesi.
  * **Cevap Efektleri**: Doğru cevaplar için `dogru.mp3`, yanlış cevaplar için `yanlis.mp3` sesleri.

Tüm ses dosyaları `assets/music/` dizini altında yer alır ve JavaScript ile dinamik olarak oynatılır.

-----

## ⚙️ Geliştirici Notları

  * **Özelleştirme**: Kendi ses dosyalarınızı `/frontend/public/src/assets/music/` klasörüne ekleyerek veya `style.css` dosyasında tema ve renk paletini değiştirerek uygulamayı kişiselleştirebilirsiniz.
  * **Soru Süresi**: Her soru nesnesinde bulunan `timeLimit` alanı, o sorunun cevaplanma süresini belirler.
  * **Katkıda Bulunma**: Gelişmiş özellikler eklemek, hata düzeltmeleri yapmak veya başka iyileştirmeler önermek için **pull request** gönderebilir veya **issue** açabilirsiniz.

-----

## 📄 Lisans

Bu proje **MIT Lisansı** altında yayımlanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakınız.

-----
