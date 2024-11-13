import UmkmsDbSource from '../api/umkms-api';

/* eslint-disable class-methods-use-this */
class UmkmForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  form() {
    const closeFormButton = document.getElementById('closeFormButton');
    const popupForm = document.querySelector('.popup-form');
    const formContent = document.querySelector('.popup-content');

    // Close the form popup
    closeFormButton.addEventListener('click', () => {
      popupForm.style.display = 'none';
    });

    // Close the form when clicking outside the content area
    window.addEventListener('click', (event) => {
      if (event.target === popupForm || event.target === formContent) {
        popupForm.style.display = 'none';
      }
    });

    // Form submission handler
    document.getElementById('umkmForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const subdistrict = document.getElementById('subdistrict').value;
      const address = document.getElementById('address').value;
      const contact = document.getElementById('contact').value;
      const year = document.getElementById('year').value;
      const umkm = {
        name, description, subdistrict, address, contact, year,
      };
      await UmkmsDbSource.postUmkm(umkm);
      await UmkmsDbSource.getUmkmByUser();

      // Close popup after submission
      popupForm.style.display = 'none';
    });
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

    this.form();
  }
}

customElements.define('umkm-form', UmkmForm);
