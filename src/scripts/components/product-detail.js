/* eslint-disable class-methods-use-this */

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

  render() {
    this.emptyContent();
    this.innerHTML += `
  <article id="detailProduct">
    <section id="imgSection" class="imgSection prod">
      <picture>
        <img
          id="umkm-img"
          src="${this.product.cover_url ? this.product.cover_url : './images/hero-image2.webp'}"
          alt="${this.product.name}"
        />
      </picture>
    </section>
    <section class="infoSection prod">
      <div class="title-con">
        <h1 id="title-umkm">${this.product.name}</h1>
      </div>
      <div class="detail-con prod">
        <div class="details prod">
          <div>
            <p id="tipe">${this.product.product_type}</p>
          </div>
          <div>
            <p id="harga">${this.product.price}</p>
          </div>
        </div>
        <div class="desc">
          <div>
            <p id="deskripsi">${this.product.description}</p>
          </div>
        </div>
      </div>
    </section>
  </article>
        `;
  }
}

customElements.define('product-detail', ProductDetail);
