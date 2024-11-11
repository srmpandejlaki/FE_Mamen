/* eslint-disable class-methods-use-this */
import UmkmsDbSource from '../api/umkms-api';
import CategoriesDbSource from '../api/categories-api';

class UmkmDetail extends HTMLElement {
  constructor() {
    super();
    this.umkm = {
      id: null,
      name: null,
      description: null,
      subdistrict: null,
      address: null,
      contact: null,
      year: null,
      rating: null,
      cover_url: null,
    };
  }

  set umkmw(value) {
    this.umkm = value;

    // Render ulang
    this.render();
  }

  get umkmw() {
    return this.umkm;
  }

  emptyContent() {
    this.innerHTML = '';
  }

  async categories() {
    const umkmDetails = await UmkmsDbSource.getUmkmByUser();
    // RENDER CATEGORIES BY UMKM
    const categories = await CategoriesDbSource.getCategoriesByUmkm(umkmDetails[0].id);
    document.querySelector('#list-cat').innerHTML = categories.categories.map((category) => `<p>${category.name}</p>`).join('');

    if (categories.length === 0) {
      document.querySelector('#list-cat').innerHTML = 'Tidak ada kategori yang ditampilkan.';
    }
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
         <article class="detail-card">
              <div class="detail-title">
               <h2>${this.umkm.name}</h2>
              </div>
              <div class="detail-img">
                <img fetchpriority="high" src="${this.umkm.cover_url ? this.umkm.cover_url : './images/hero-image2.webp'}" alt="${this.umkm.name}" />
              </div>

              <div class="detail-info">
               <div id="info-cat" class="infos">
                <h3 class="labels">Categories</h3>
                <div id="list-cat"></div>
               </div>
               <div id="info-subdistrict" class="infos">
                <h3 class="labels">Subdistrict</h3>
                <p>${this.umkm.subdistrict}</p>
               </div>
               <div id="info-address" class="infos">
                <h3 class="labels">Address</h3>
                <p>${this.umkm.address}</p>
               </div>
               <div id="info-contact" class="infos">
                <h3 class="labels">Contact</h3>
                <p>${this.umkm.contact}</p>
               </div>
               <div id="info-year" class="infos">
                <h3 class="labels">Year</h3>
                <p>${this.umkm.year}</p>
               </div>
               <div id="info-rating" class="infos">
                <h3 class="labels">Rating</h3>
                <p>${this.umkm.rating}</p>
               </div>
               </div>
               <div class="detail-desc">
               <div id="info-desc" class="infos">
                <h3 class="labels">Description</h3>
                <p>${this.umkm.description}</p>
               </div>
               </div>
            </article>
        `;
    this.categories();
  }
}

customElements.define('umkm-detail', UmkmDetail);
