import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function pageListUmkmGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.judul-list-umkm h2', {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.judul-list-umkm', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
  gsap.from('.quote-umkm-list p', {
    opacity: 0,
    y: 30,
    duration: 3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.quote-umkm-list', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
  gsap.from('.searchContainer', {
    opacity: 0,
    y: 40,
    duration: 4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.searchContainer', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
