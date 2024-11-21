import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function footerGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  // FOOTER
  gsap.from('footer-bar', {
    opacity: 0,
    y: 40,
    duration: 3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: 'footer', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
