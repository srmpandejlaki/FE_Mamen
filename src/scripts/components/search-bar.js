class searchBar extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
      <div class="searchContainer">
        <input type="text" id="searchInput" placeholder="Cari UMKM...">
        <button id="searchButton"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    `;
  }
}

customElements.define('search-bar', searchBar);
