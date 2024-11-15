/* eslint-disable class-methods-use-this */
class ProductForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
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
  }
}

customElements.define('product-form', ProductForm);
