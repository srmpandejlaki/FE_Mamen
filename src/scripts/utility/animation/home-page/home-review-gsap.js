import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function homeReviewGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.review-item', {
    opacity: 0,
    x: 30,
    duration: 2,
    ease: 'power2.out',
    stagger: 0.5,
    scrollTrigger: {
      trigger: '#reviews', // Elemen container yang memicu animasi
      start: 'top 80%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
