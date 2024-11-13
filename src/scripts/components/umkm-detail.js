/* eslint-disable class-methods-use-this */
import UmkmsDbSource from '../api/umkms-api';
import CategoriesDbSource from '../api/categories-api';
import UrlParser from '../routes/url-parser';

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
    let categories;

    if (window.location.hash === '#/profile') {
      const umkmDetails = await UmkmsDbSource.getUmkmByUser();
      categories = await CategoriesDbSource.getCategoriesByUmkm(umkmDetails[0].id);

      // RENDER CATEGORIES BY UMKM
      if (categories.length === 0) {
        document.querySelector('#listCategory').innerHTML = 'Belum terdapat kategori. Silahkan menambah terlebih dahulu';
      } else {
        document.querySelector('#listCategory').innerHTML = categories.map((category) => `
            <div class="category" data-id="${category.id}">
              <p>${category.name}</p>
              <button class="delete-category">X</button>
            </div>`)
          .join('');

        // DELETE CATEGORY
        const deleteCategoryButtons = document.querySelectorAll('.delete-category');
        deleteCategoryButtons.forEach((button) => {
          button.addEventListener('click', async (event) => {
            const categoryId = event.target.parentElement.dataset.id;
            await CategoriesDbSource.deleteCategoryById(umkmDetails[0].id, categoryId);
            button.parentElement.remove();
          });
        });
      }
    } else {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      categories = await CategoriesDbSource.getCategoriesByUmkm(url.id);

      // RENDER CATEGORIES BY UMKM
      if (categories.length === 0) {
        document.querySelector('#listCategory').innerHTML = '-';
      } else {
        document.querySelector('#listCategory').innerHTML = categories.map((category) => `
            <div class="category" data-id="${category.id}">
              <p>${category.name}</p>
            </div>`)
          .join('');
      }

      document.getElementById('addImageForm').style.display = 'none';
      document.getElementById('edit-detail').style.display = 'none';
      document.getElementById('addCategory').style.display = 'none';
    }
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <article id="detail-umkm" class="detail-umkm">
      <section id="imgSection" class="imgSection">
        <picture>
          <img id="umkm-img" src="${this.umkm.cover_url ? this.umkm.cover_url : './images/hero-image2.webp'}" alt="${this.umkm.name}">
        </picture>
        <span><i></i> ${this.umkm.rating}</span>
        <form id="addImageForm">
          <label id="addImgLabel" for="addimage"><i>add</i></label>
          <input type="file" id="addimage" accept="image/*" name="addimage" placeholder="Maks. 2mb" required>
          <button id="resetImg" type="reset">reset</button>
          <button id="submitImg" type="submit">Submit</button>
        </form>
      </section>
      <section class="infoSection">
        <div class="title-con">
          <h1 id="title-umkm">${this.umkm.name}</h1>
          <button id="edit-detail"><i>edit</i></button>
        </div>
        <div class="detail-con">
          <div>
            <p>Alamat</p><span>:</span><p id="alamat">${this.umkm.address}</p>
          </div>
          <div>
            <p>Kecamatan</p><span>:</span><p id="kecamatan">${this.umkm.subdistrict}</p>
          </div>
          <div>
            <p>Kontak</p><span>:</span><p id="kontak">${this.umkm.contact}</p>
          </div>
          <div>
            <p>Tahun</p><span>:</span><p id="tahun">${this.umkm.year}</p>
          </div>
        </div>
        <div class="category-con">
          <div>
            <p>Kategori :</p>
            <button id="addCategory">Tambah</button>
            <form id="form-addCategory">
              <input type="text" id="input-category" required>
              <button type="submit">Tambah</button>
            </form>
          </div>
          <div id="listCategory">
          </div>
        </div>
        <div class="description-con">
          <div>
            <p>Deskripsi :</p>
            <p id="deskripsi">${this.umkm.description}</p>
          </div>
        </div>
      </section>
     </article>
        `;
    this.categories();
  }
}

customElements.define('umkm-detail', UmkmDetail);
