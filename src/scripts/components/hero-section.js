class HeroSection extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
       <div class="home-container">
          <div class="home-content">
            <h1>Halloo <span>Selamat</span> Datang!</h1>
            <p>
               "Bisnis kecil bukan berarti mimpi kecil. Kualitas adalah kunci untuk mendapatkan kepercayaan dan keberlanjutan dalam bisnis. Dapatkan "
            </p>
            <button id="cat">
              Jelajahi Sekarang <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
  }
}

customElements.define('hero-section', HeroSection);
