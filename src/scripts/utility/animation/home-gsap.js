import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function homeGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  // HERO SECTION
  gsap.from('header-bar', {
    opacity: 0,
    y: -30,
    duration: 2,
    ease: 'power2.inOut',
  });
  gsap.from('.home-content h1', {
    opacity: 0,
    y: -20,
    duration: 2,
    ease: 'power2.inOut',
  });
  gsap.from('.home-content p', {
    opacity: 0,
    y: -20,
    duration: 2.5,
    ease: 'power2.inOut',
  });
  gsap.from('.home-content button', {
    opacity: 0,
    y: 20,
    duration: 3,
    ease: 'power2.inOut',
  });

  // INFO UMKM
  gsap.from('.infoUMKM .infoImage', {
    opacity: 0,
    x: -20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.infoUMKM',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.infoUMKM .info', {
    opacity: 0,
    x: 20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.infoUMKM', // Elemen pemicu
      start: 'top 70%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // SLIDER
  gsap.from('.slider', {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.slider',
      start: 'top 65%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.prev', {
    opacity: 0,
    x: -20,
    duration: 1.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.prev',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.next', {
    opacity: 0,
    x: 20,
    duration: 1.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.next',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // INFO PRODUK
  gsap.from('.infoProduk .infoImage', {
    opacity: 0,
    x: 20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.infoProduk',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.infoProduk .info', {
    opacity: 0,
    x: -20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.infoProduk', // Elemen pemicu
      start: 'top 70%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // PRODUK CARD
  gsap.from('.scroll', {
    opacity: 0,
    x: 40,
    duration: 3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.scroll', // Elemen container yang memicu animasi
      start: 'top 50%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
