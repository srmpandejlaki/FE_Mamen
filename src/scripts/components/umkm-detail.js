/* eslint-disable class-methods-use-this */
import Swal from 'sweetalert2';
import CategoriesDbSource from '../api/categories-api';
import { addCategory, umkmImage } from '../utility/umkmFunction';
import { renderCategories } from '../view/pages/profile';
import UmkmsDbSource from '../api/umkms-api';

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

  async crud() {
    const umkmByUser = await UmkmsDbSource.getUmkmByUser();
    const { id } = umkmByUser[0];

    // EDIT UMKM
    const editUmkmButton = document.querySelector('#edit-detail');
    editUmkmButton.addEventListener('click', () => {
      document.querySelector('editumkm-form').style.display = 'block';
    });

    // DELETE UMKM
    const deleteUmkmButton = document.querySelector('.title-con');
    deleteUmkmButton.addEventListener('click', async (event) => {
      const target = event.target.closest('#delete-umkm');
      if (!target) return;

      Swal.fire({
        title: 'Hapus UMKM?',
        text: 'UMKM ini akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
      }).then((result) => {
        if (result.isConfirmed) {
          UmkmsDbSource.deleteUmkmById(id)
            .then(() => {
              window.location.reload();
            });
        }
      });
    });

    // CATEGORY UMKM
    renderCategories(id);

    // ADD CATEGORY
    const addCategoryBtn = document.querySelector('#addCategory');
    const addCategoryForm = document.querySelector('#form-addCategory');
    addCategoryBtn.addEventListener('click', () => {
      addCategoryForm.style.display = 'flex';
      addCategoryBtn.style.display = 'none';
    });
    addCategory();

    // DELETE CATEGORY
    const categoriesContainer = document.querySelector('#listCategory');
    categoriesContainer.addEventListener('click', (event) => {
      const target = event.target.closest('.delete-category');
      if (!target) return;

      const categoryId = target.parentElement.dataset.id;
      Swal.fire({
        title: 'Hapus Kategori?',
        text: 'Kategori ini akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
      }).then((result) => {
        if (result.isConfirmed) {
          CategoriesDbSource.deleteCategoryById(id, categoryId)
            .then(() => {
              renderCategories(id);
            });
        }
      });
    });
    // ADD IMAGE
    umkmImage();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <article id="detail-umkm" class="detail-umkm">
      <section id="imgSection" class="imgSection">
        <picture>
          <img 
          id="umkm-img" 
          src="${this.umkm.cover_url ? this.umkm.cover_url : './images/template-umkm-img.png'}" 
          alt="${this.umkm.name}"
          onerror="this.onerror=null;this.src='./images/template-umkm-img.png';"
          >
        </picture>
        <span><i class="fa-regular fa-star"></i> ${this.umkm.rating}</span>
        <form id="addImageForm">
          <label id="addImgLabel" for="addimage"><i class="fa-solid fa-download"></i></label>
          <input type="file" id="addimage" accept="image/*" name="addimage" placeholder="Maks. 2mb" required>
          <button id="resetImg" type="reset">Reset</button>
          <button id="submitImg" type="submit">Submit</button>
        </form>
      </section>
      <section class="infoSection">
        <div class="title-con">
          <h1 id="title-umkm">${this.umkm.name}</h1>
          <button id="edit-detail"><i class="fa-regular fa-pen-to-square"></i></button>
          <button id="delete-umkm" data-id="${this.umkm.id}"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="detail-con">
          <table>
          <tr>
            <td>Alamat</td>
            <td>:</td>
            <td id="alamat">${this.umkm.address}</td>
          </tr>
          <tr>
            <td>Kecamatan</td>
            <td>:</td>
            <td id="kecamatan">${this.umkm.subdistrict}</td>
          </tr>
          <tr>
            <td>Kontak</td>
            <td>:</td>
            <td id="kontak">${this.umkm.contact}</td>
          </tr>
          <tr>
            <td>Tahun</td>
            <td>:</td>
            <td id="tahun">${this.umkm.year}</td>
          </tr>
        </table>
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
          <div class="category" style="background-color: transparent">
            <p style="color: transparent">tes</p>
          </div>
          </div>
        </div>
        <div class="description-con">
          <div>
            <p>Deskripsi :</p>
            <p id="deskripsi">${this.umkm.description}</p>
          </div>
          <p></p>
        </div>
      </section>
     </article>
        `;
    this.crud();
  }
}

customElements.define('umkm-detail', UmkmDetail);
