import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function footerGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  // FOOTER
  gsap.from('footer-bar', {
    opacity: 0,
    y: 50,
    duration: 5.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: 'footer-bar', // Elemen container yang memicu animasi
      start: 'top 90%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 10%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
