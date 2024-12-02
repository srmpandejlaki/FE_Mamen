class DatalineSection extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
        <section id="datalineCon">
            <div class="green-filter"></div>
            <div class="dataline">
              <p>"Exceptional service isn’t just a perk—it’s your most powerful promotion."</p>
              <button><a href="#/products">List Produk</a></button>
            </div>
        </section>
    `;
  }
}

customElements.define('dataline-section', DatalineSection);
