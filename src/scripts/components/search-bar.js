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
        <form id="searchForm">
          <input type="text" id="searchInput" placeholder="Cari Sesuatu...">
          <button id="searchButton" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
    `;
  }
}

customElements.define('search-bar', searchBar);
