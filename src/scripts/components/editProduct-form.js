/* eslint-disable class-methods-use-this */
class editProductForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <div id="popupFormProdEdit" class="popup-formProdEdit">
        <div class="popup-contentProdEdit">
            <span id="closeFormButtonProdEdit" class="close-buttonProdEdit">&times;</span>
            <h2>Tambah Product</h2>
            <form id="productFormEdit">
                <label for="nameprodedit">Nama:</label>
                <input type="text" id="nameprodedit" name="nameprodedit" required>
                
                <label for="typeedit">Product Type:</label>
                <input type="text" id="typeedit" name="typeedit" required>

                <label for="descriptionprodedit">Description:</label>
                <textarea id="descriptionprodedit" name="descriptionprodedit" required></textarea>

                <label for="priceedit">Price:</label>
                <input type="number" id="priceedit" name="priceedit" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
  }
}

customElements.define('editproduct-form', editProductForm);
