const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Hapus semua data sebelumnya (opsional)
  await prisma.news.deleteMany();

  // Data seed
  const newsData = [
    {
      title: 'Peluncuran Produk Baru dari Perusahaan Teknologi Terkemuka',
      description: '<p>Perusahaan teknologi terkemuka meluncurkan produk terbaru yang diharapkan akan merevolusi industri. Produk ini memiliki berbagai fitur canggih yang belum pernah ada sebelumnya.</p>',
      image: 'https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      publishedAt: new Date('2025-01-01T10:00:00Z'),
    },
    {
      title: 'Pencapaian Baru dalam Dunia Pendidikan',
      description: '<p>Sebuah sekolah internasional berhasil mencetak prestasi dengan mencetak 10 siswa berprestasi di ajang kompetisi internasional.</p>',
      image: 'https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      publishedAt: new Date('2025-01-10T15:00:00Z'),
    },
    {
      title: 'Inovasi di Bidang Energi Terbarukan',
      description: '<p>Sebuah startup berhasil menciptakan inovasi dalam teknologi energi terbarukan yang ramah lingkungan.</p>',
      image: 'https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      publishedAt: new Date('2025-01-12T12:00:00Z'),
    },
  ];

  // Masukkan data ke database
  for (const news of newsData) {
    await prisma.news.create({
      data: news,
    });
  }

  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
