# Cara Menambahkan Musik Shalawat

Untuk menambahkan musik shalawat ke aplikasi:

1. **Download file audio shalawat** (format MP3 atau WAV)
   - Cari "shalawat nabi mp3" di mesin pencari
   - Pastikan file memiliki kualitas baik dan durasi yang sesuai

2. **Simpan file audio** ke folder `public/`
   - Contoh: `shalawat-nabi.mp3`
   - `ya-habibal-qolbi.mp3`
   - `addinulana.mp3`

3. **Update kode di index.html**
   Ganti baris ini:
   ```html
   <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav">
   ```
   Menjadi:
   ```html
   <source src="shalawat-nabi.mp3" type="audio/mpeg">
   ```

4. **Sumber shalawat yang direkomendasikan:**
   - Shalawat Badar
   - Ya Habibal Qolbi
   - Addinulana
   - Shalawat Jibril
   - Man Kunto Maula

5. **Alternatif: Gunakan URL online**
   Jika ingin menggunakan audio dari internet:
   ```html
   <source src="https://example.com/shalawat.mp3" type="audio/mpeg">
   ```

**Catatan:** Pastikan audio yang digunakan memiliki lisensi yang sesuai untuk penggunaan komersial jika diperlukan.