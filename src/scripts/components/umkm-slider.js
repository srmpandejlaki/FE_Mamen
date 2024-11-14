/* eslint-disable class-methods-use-this */
import UmkmsDbSource from '../api/umkms-api';
import { createUmkmSliderTemplate } from '../view/templates/template-creator';

class UmkmSlider extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  async umkm() {
    const umkmContainer = document.querySelector('.slider');
    umkmContainer.innerHTML = '';
    const umkms = await UmkmsDbSource.getUmkms();

    umkms.forEach((umkm) => {
      umkmContainer.innerHTML += createUmkmSliderTemplate(umkm);
    });

    if (umkmContainer.innerHTML === '') {
      umkmContainer.innerHTML = 'Tidak ada umkm untuk ditampilkan.';
    }
  }

  buttons() {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slider = document.querySelector('.slider');

    next.addEventListener('click', () => {
      const slides = document.querySelectorAll('.slides');
      slider.appendChild(slides[0]);
    });

    prev.addEventListener('click', () => {
      const slides = document.querySelectorAll('.slides');
      slider.prepend(slides[slides.length - 1]);
    });
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <section class="sliderumkm-secton">
        <div class="slider-con">
          <div class="slider">
          </div>
        </div>
        <div class="slider-buttons">
          <span class="prev"><i class="fa-solid fa-chevron-left"></i></span>
          <span class="next"><i class="fa-solid fa-chevron-right"></i></span>
        </div>
      </section>
        `;
    this.umkm();
    this.buttons();
  }
}

customElements.define('umkm-slider', UmkmSlider);
