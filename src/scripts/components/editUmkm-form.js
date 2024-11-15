/* eslint-disable class-methods-use-this */
class editUmkmForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <div id="popupFormEdit" class="popup-form">
        <div id="popup-contentEdit" class="popup-content">
            <span id="closeFormButtonEdit" class="close-button">&times;</span>
            <h2>Edit UMKM</h2>
            <form id="umkmFormEdit">
                <label for="name">Nama:</label>
                <input type="text" id="nameEdit" name="name" required>

                <label for="description">Description:</label>
                <textarea id="descriptionEdit" name="description" required></textarea>

                <label for="subdistrict">Subdistrict:</label>
                <input type="text" id="subdistrictEdit" name="subdistrict" required>

                <label for="address">Address:</label>
                <input type="text" id="addressEdit" name="address" required>

                <label for="contact">Contact:</label>
                <input type="text" id="contactEdit" name="contact" required>

                <label for="year">Year:</label>
                <input type="number" id="yearEdit" name="year" min="1900" max="2024" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
  }
}

customElements.define('editumkm-form', editUmkmForm);
