import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function umkmItemGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.umkm-card', {
    opacity: 0,
    y: 30,
    duration: 2,
    ease: 'power2.out',
    stagger: 0.5,
    scrollTrigger: {
      trigger: '#list-umkm', // Elemen container yang memicu animasi
      start: 'top 50%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
