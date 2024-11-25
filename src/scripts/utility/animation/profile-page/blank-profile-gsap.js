import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function blankProfileGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.blankImg', {
    opacity: 0,
    x: -20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.blank-profile',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.blankCon h2', {
    opacity: 0,
    y: -20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.blank-profile',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.blankCon p', {
    opacity: 0,
    x: 20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.blank-profile',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
  gsap.from('.blankCon button', {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.blank-profile',
      start: 'top 70%', // Animasi dimulai saat elemen berada 80% dari bawah viewport
      end: 'bottom 60%', // Animasi berakhir saat elemen 60% dari bawah viewport
      toggleActions: 'play none none reverse', // Mainkan animasi ke depan saat elemen masuk viewport
    },
  });
}
