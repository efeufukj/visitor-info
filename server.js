const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const botToken = '8202396680:AAFfYGGCL1IKl1ZouzXMTuXN3X4aSID4sR8';
const chatId = '8202396680';

app.post('/send-info', async (req, res) => {
  const data = req.body;
  const message = `
Yeni Ziyaretçi Bilgisi:
IP: ${data.ip}
Ülke: ${data.country}
Şehir: ${data.city}
ISS: ${data.isp}
Tarayıcı: ${data.browser}
İşletim Sistemi: ${data.os}
Ekran Çözünürlüğü: ${data.resolution}
Zaman Dilimi: ${data.timezone}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    });
    res.status(200).send('Bilgiler Telegram’a gönderildi');
  } catch (error) {
    res.status(500).send('Telegram mesajı gönderilemedi');
  }
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
