import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function detailUmkmReviewGsapJs() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('form-review', {
    opacity: 0,
    x: 0,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.isiReview', // Elemen pemicu
      start: 'top 90%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.detailumkm-reviews', {
    opacity: 0,
    x: 0,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.isiReview', // Elemen container yang memicu animasi
      start: 'top 90%', // Mulai animasi saat container mencapai 80% dari viewport
      end: 'bottom 20%', // Selesai animasi saat container mencapai 20% dari viewport
      toggleActions: 'play none none reverse', // Mainkan animasi maju dan mundur
    },
  });
}
