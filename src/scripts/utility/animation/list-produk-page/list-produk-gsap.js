import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function pageListProdukGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.judul-list-prod h2', {
    opacity: 0,
    y: -20,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.judul-list-prod', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
      once: true,
    },
  });
  gsap.from('.quote-prod-list p', {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.quote-prod-list', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
      once: true,
    },
  });
  gsap.from('.searchContainer', {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.searchContainer', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
      once: true,
    },
  });
}
