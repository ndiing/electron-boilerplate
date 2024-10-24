## Struktur Folder

```
.env                      # File untuk menyimpan variabel environment seperti konfigurasi database, API keys, dll.

src/                      # Root folder untuk kode sumber aplikasi
├── index.js              # Entry point aplikasi

├── lib/                  # Fungsi utilitas dan library umum
│   └── index.js          # Mengimpor dan mengekspor fungsi-fungsi utilitas

├── middleware/           # Middleware khusus aplikasi
│   └── index.js          # (Opsional) Mengimpor semua middleware jika diperlukan

└── api/                  # Folder untuk semua endpoint API
    ├── index.js          # Router utama untuk semua API

    └── api1/             # Modul API pertama
        ├── index.js      # Router untuk api1
        ├── model.js      # Interaksi dengan database untuk api1
        ├── controller.js # Logika bisnis untuk api1
        └── service.js    # Logika tambahan atau interaksi dengan API pihak ketiga

nodemon.json              # Konfigurasi untuk Nodemon, alat yang secara otomatis me-restart server saat ada perubahan file.
.prettierrc               # Konfigurasi untuk Prettier, alat format kode otomatis yang menjaga konsistensi gaya penulisan kode.
eslint.config.mjs         # Konfigurasi untuk ESLint, alat linter untuk menemukan dan memperbaiki masalah dalam kode JavaScript.
webpack.config.js         # Konfigurasi untuk Webpack, bundler yang digunakan untuk mengelola dan mengoptimalkan file JavaScript dan aset lainnya.
node_modules              # Folder yang berisi semua dependensi yang diinstal melalui npm.
package-lock.json         # File yang mencatat versi tepat dari setiap dependensi yang diinstal, memastikan bahwa setiap instalasi paket konsisten di berbagai lingkungan.
package.json              # File yang mendefinisikan metadata proyek, termasuk dependensi, skrip, dan informasi lain yang diperlukan untuk proyek Node.js.
README.md                 # File dokumentasi proyek yang memberikan informasi dasar, cara menjalankan, dan penjelasan tentang aplikasi.
```

## SEA

```bash

npx webpack --mode=production --node-env=production

node --experimental-sea-config sea-config.json

node -e "require('fs').copyFileSync(process.execPath, 'out/bundle.exe')"

signtool remove /s out/bundle.exe

npx postject out/bundle.exe NODE_SEA_BLOB out/bundle.blob ^
--sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

signtool sign /fd SHA256 /a out/bundle.exe

```

```
test update v2
```