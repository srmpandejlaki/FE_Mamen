const { default: Swal } = require('sweetalert2');
const { default: ProductsDbSource } = require('../api/products-api');
const { default: UmkmsDbSource } = require('../api/umkms-api');
const { renderProducts } = require('../view/pages/profile');

/* eslint-disable class-methods-use-this */
class ProductForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  async tambahProduk() {
    const umkmDetailByUser = await UmkmsDbSource.getUmkmByUser();
    const umkmId = umkmDetailByUser[0].id;
    const closeFormButton = document.getElementById('closeFormButtonProd');
    const popupForm = document.querySelector('product-form');

    // Form submission handler
    async function handleSubmit(event) {
      event.preventDefault();
      const name = document.getElementById('nameprod').value;
      const product_type = document.getElementById('type').value;
      const description = document.getElementById('descriptionprod').value;
      const price = document.getElementById('price').value;
      const product = {
        name, product_type, description, price,
      };

      try {
        popupForm.style.display = 'none';

        await ProductsDbSource.postProduct(umkmId, product);

        await renderProducts(umkmId);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Produk berhasil ditambahkan!',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: `Terjadi kesalahan: ${error.message}`,
        });
      }
    }

    const form = document.getElementById('productForm');

    // Close the form popup
    closeFormButton.addEventListener('click', () => {
      popupForm.style.display = 'none';
    });

    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleSubmit);
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <div id="popupFormProd" class="popup-formProd">
        <div class="popup-contentProd">
            <span id="closeFormButtonProd" class="close-buttonProd">&times;</span>
            <h2>Tambah Product</h2>
            <form id="productForm">
                <label for="nameprod">Nama:</label>
                <input type="text" id="nameprod" name="nameprod" required>
                
                <label for="type">Product Type:</label>
                <input type="text" id="type" name="type" required>

                <label for="descriptionprod">Description:</label>
                <textarea id="descriptionprod" name="descriptionprod" required></textarea>

                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
    this.tambahProduk();
  }
}

customElements.define('product-form', ProductForm);
