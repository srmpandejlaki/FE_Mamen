import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProfileGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  // DETAIL UMKM
  gsap.from('.imgSection', {
    opacity: 0,
    x: -30,
    duration: 3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.detail-umkm',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });

  gsap.from('.title-con', {
    opacity: 0,
    y: -30,
    duration: 3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.detail-umkm',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });

  gsap.from('.detail-con', {
    opacity: 0,
    x: 30,
    duration: 3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.detail-umkm',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });

  gsap.from('.category-con', {
    opacity: 0,
    x: 30,
    duration: 3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.detail-umkm',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.description-con', {
    opacity: 0,
    y: 30,
    duration: 3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.detail-umkm',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
}
