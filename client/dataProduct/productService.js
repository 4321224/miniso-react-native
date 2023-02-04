const Products = [
  {
    id: "1",
    name: "MINISO Squishy Mainan Boneka Boba Kucing Bear Binatang Mainan Anak Toy",
    slug: "miniso-squishy-mainan-boneka-boba-kucing-bear-binatang-mainan-anak-toy-kucing",
    description:
      "BAHAYA TERSEDAK-Bagian kecil. Tidak untuk anak di bawah 3 tahun.Simpan di tempat yang sejuk dan kering.Ukran:10x7x7cm",
    price: 62900,
    mainImg: require("../asset/b16c4865-c2af-4142-b8de-a3907e0feb43.jpg"),
    categoryId: 3,
    authorId: 1,
  },
  {
    id: "2",
    name: "MINISO Headset Bluetooth Headphone Wireless Henset Bloetooth TeksturCD",
    slug: "miniso-headset-bluetooth-headphone-wireless-henset-bloetooth-teksturcd-hijau",
    description:
      "Desain fashion dan warna-warni. Nirkabel dan portabel untuk berolahraga, mendengarkan musik, menonton film, dll.",
    price: 230000,
    mainImg: require("../asset/gambar2.jpg"),
    categoryId: 2,
    authorId: 3,
  },
  {
    id: "3",
    name: "MINISO Wajan Anti Lengket We Bare Bear Penggorengan Mini Fry Pan",
    slug: "miniso-wajan-anti-lengket-we-bare-bear-penggorengan-mini-fry-pan",
    description:
      "MINISO Wajan Anti Lengket We Bare Bear Penggorengan Mini Fry Pan Teflon Mini.Mudah untuk memasak telur mata sapi, pancake, hingga roti.Pegangan bakelite.Bodi baja karbon. Ukuran 14*12*2.5 cm",
    price: 49900,
    mainImg: require("../asset/gambar3.jpg"),
    categoryId: 5,
    authorId: 3,
  },
  {
    id: "4",
    name: "Miniso Official Parfum Cityscape perfume",
    slug: "miniso-official-parfum-cityscape-perfume",
    description:
      "Diproduksi oleh Givaudan, ini adalah seri parfum Miniso EDT yang terinspirasi oleh lanskap kota paling glamor di dunia, termasuk Danau Merah Muda Melbourne, Hijau Denmark, Aurora Islandia, Pagi Bali. Aroma yang luar biasa elegan dan canggih berbicara kepada rasa anggun gaya pribadi.",
    price: 63900,
    mainImg: require("../asset/gambar4.jpg"),
    categoryId: 4,
    authorId: 1,
  },
  {
    id: "5",
    name: "MINISO Tas Selempang Berlapis Dengan Tutup dan Kunci Crossbody Handbag",
    slug: "miniso-tas-selempang-berlapis-dengan-tutup-dan-kunci-crossbody-handbag",
    description:
      "MINISO Tas Selempang Berlapis Dengan Tutup dan Kunci Crossbody Handbag Tas Hitam Wanita Kapasitas Besar Tahan Air.",
    price: 159900,
    mainImg: require("../asset/gambar5.jpg"),
    categoryId: 5,
    authorId: 3,
  },
  {
    id: "6",
    name: "MINISO Bluetooth Headphone series MiniSounds Screw Cap TWS Headset M1",
    slug: "miniso-bluetooth-headphone-series-minisounds-screw-cap-tws-headset-m1",
    description:
      "MINISO Bluetooth Headphone series MiniSounds Screw Cap TWS Headset M1.Nyaman dipakai, sederhana dan fashion.Fitur mikrofon HD untuk membuat panggilan yang jernih - membuat hidup lebih mudah saat bepergian.Memutar / menghentikan musik atau menjawab / mengakhiri panggilan dengan satu klik",
    price: 169900,
    mainImg: require("../asset/gambar6.jpg"),
    categoryId: 2,
    authorId: 1,
  },
  {
    id: "7",
    name: "MINISO ID penguin berdiri 17 inci, biru, hadiah ulang tahun, boneka",
    slug: "miniso-id-penguin-berdiri-17-inci-biru-hadiah-ulang-tahun-boneka",
    description:
      "Teman yang indah - mainan ini nyaman dan indah plush akan menjadi teman Anda dalam kehidupan sehari-hari. Anak-anak, remaja dan orang dewasa akan menyukai mainan ini.",
    price: 149900,
    mainImg: require("../asset/gambar7.jpg"),
    categoryId: 3,
    authorId: 1,
  },
  {
    id: "8",
    name: "Miniso Official Marvel - Bento box kotak makanan",
    slug: "miniso-official-marvel-bento-box-kotak-makanan",
    description:
      "MARVEL- Bento Box From Miniso dengan design MARVEL ini sangat fashionable, pemakaian yang nyaman, dan juga multifungsi",
    price: 49900,
    mainImg: require("../asset/gambar8.jpg"),
    categoryId: 1,
    authorId: 3,
  },
];

export function fetchProducts() {
  return Products;
}

export function getProduct(id) {
  return Products.find((product) => product.id == id);
}
