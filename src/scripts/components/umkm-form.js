/* eslint-disable class-methods-use-this */
class UmkmForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
    <div id="popupForm" class="popup-form">
        <div class="popup-content">
            <span id="closeFormButton" class="close-button">&times;</span>
            <h2>Tambah UMKM</h2>
            <form id="umkmForm">
                <label for="name">Nama:</label>
                <input type="text" id="name" name="name" required>

                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>

                <label for="subdistrict">Subdistrict:</label>
                <input type="text" id="subdistrict" name="subdistrict" required>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required>

                <label for="contact">Contact:</label>
                <input type="text" id="contact" name="contact" required>

                <label for="year">Year:</label>
                <input type="number" id="year" name="year" min="1900" max="2024" required>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
      `;
  }
}

customElements.define('umkm-form', UmkmForm);
