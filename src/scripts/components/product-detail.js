/* eslint-disable class-methods-use-this */
import UmkmsDbSource from '../api/umkms-api';

class ProductDetail extends HTMLElement {
  constructor() {
    super();
    this.product = {
      id: null,
      name: null,
      product_type: null,
      description: null,
      price: null,
      cover_url: null,
      umkms_id: null,
    };
  }

  set productw(value) {
    this.product = value;

    // Render ulang
    this.render();
  }

  get productw() {
    return this.product;
  }

  emptyContent() {
    this.innerHTML = '';
  }

  async namaUmkm() {
    const umkmDetails = await UmkmsDbSource.getUmkmById(this.product.umkms_id);

    const namaUmkm = umkmDetails.name;

    document.querySelector('#namaUmkm').innerHTML = `<a href="/#/umkms/${this.product.umkms_id}">${namaUmkm}</a>`;
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
         <article class="detail-card">
              <div class="detail-title">
               <h2>${this.product.name}</h2>
              </div>
              <div class="detail-img">
                <img fetchpriority="high" src="${this.product.cover_url ? this.product.cover_url : './images/hero-image2.webp'}" alt="${this.product.name}" />
              </div>

              <div class="detail-info">
              <div id="info-umkm" class="infos">
                <h3 class="labels">Nama UMKM</h3>
                <p id="namaUmkm"></p>
               </div>
               <div id="info-tipe" class="infos">
                <h3 class="labels">Tipe</h3>
                <p>${this.product.product_type}</p>
               </div>
               <div id="info-price" class="infos">
                <h3 class="labels">Price</h3>
                <p>${this.product.price}</p>
               </div>
               <div id="info-desc" class="infos">
                <h3 class="labels">Description</h3>
                <p>${this.product.description}</p>
               </div>
               </div>
            </article>
        `;

    this.namaUmkm();
  }
}

customElements.define('product-detail', ProductDetail);
