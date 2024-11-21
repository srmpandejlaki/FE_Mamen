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
          <h1>TEMUKAN DAN JELAJAHI</h1>
          <h2>UMKM DI MANADO</h2>
          <button id="cat">
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-section', HeroSection);
