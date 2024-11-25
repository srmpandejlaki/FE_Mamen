import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function produkItemGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.list-product', {
    opacity: 0,
    y: 30,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.list-product', // Elemen container yang memicu animasi
      start: 'top 50%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
      once: true,
    },
  });
}
