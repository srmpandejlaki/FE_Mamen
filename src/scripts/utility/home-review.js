/* eslint-disable no-use-before-define */
import gsap from 'gsap';

const reviewScroll = () => {
  const scrollContainer = document.querySelector('.infinite-scroll');
  const items = [...scrollContainer.children];
  const scrollSpeed = 4; // Kecepatan pergeseran dalam px per frame

  // Menyimpan lebar elemen untuk mempermudah perhitungan pergerakan
  const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);

  // Setel posisi awal kontainer
  gsap.set(scrollContainer, { x: 0 });

  // Fungsi untuk melakukan animasi scroll menggunakan GSAP
  function animateScroll() {
    gsap.to(scrollContainer, {
      x: `-=${scrollSpeed}`, // Geser kontainer ke kiri
      ease: 'linear', // Gerakan linear untuk pergerakan konstan
      duration: 0.02, // Durasi pendek untuk animasi mulus
      onComplete: moveItem, // Pindahkan item setelah animasi selesai
    });
  }

  // Memindahkan elemen pertama ke akhir untuk scroll infinite
  function moveItem() {
    // Jika seluruh kontainer telah digeser keluar dari viewport
    if (parseFloat(scrollContainer.style.transform.split('(')[1]) <= -totalWidth) {
      // Setel ulang posisi ke 0
      gsap.set(scrollContainer, { x: 0 });
    }

    animateScroll(); // Lanjutkan animasi scroll
  }

  animateScroll(); // Mulai animasi scroll
};
export default reviewScroll;
