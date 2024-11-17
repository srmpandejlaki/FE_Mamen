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
               "Makanan adalah segalanya bagi kita. Ini merupakan perpanjangan dari perasaan nasionalis, perasaan etnis, sejarah pribadimu, provinsimu, daerahmu, sukumu, nenekmu. Itu tidak dapat dipisahkan sejak awal." - Anthony Bourdain
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
