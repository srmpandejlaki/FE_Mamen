/* eslint-disable class-methods-use-this */
class editProductForm extends HTMLElement {
  constructor() {
    super();
    this.product = {
      id: null,
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
    <div id="popupFormProdEdit-${this.product.id}" class="popup-form">
        <div class="popup-content">
            <span id="closeFormButtonProdEdit-${this.product.id}" class="close-button">&times;</span>
            <h2>Tambah Product</h2>
            <form id="productFormEdit-${this.product.id}" class="product-form">
              <div class="nameProdCon">
                <label for="nameprodedit-${this.product.id}">Nama :</label>
                <input type="text" id="nameprodedit-${this.product.id}" name="nameprodedit-${this.product.id}" required>
              </div>
              <div class="typeCon">
                <label for="typeedit-${this.product.id}">Tipe Produk :</label>
                <input type="text" id="typeedit-${this.product.id}" name="typeedit-${this.product.id}" required>
              </div>
              <div class="priceCon">
                <label for="priceedit-${this.product.id}">Harga :</label>
                <input type="number" id="priceedit-${this.product.id}" name="priceedit-${this.product.id}" required>
              </div>
              <div class="descCon">
                <label for="descriptionprodedit-${this.product.id}">Deskripsi :</label>
                <textarea id="descriptionprodedit-${this.product.id}" name="descriptionprodedit-${this.product.id}" required></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
  }
}

customElements.define('editproduct-form', editProductForm);
