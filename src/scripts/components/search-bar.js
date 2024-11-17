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
        <form>
          <input type="text" id="searchInput" placeholder="Cari Sesuatu...">
          <button id="searchButton"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div>
          <button>Filter</button>
        </div>
      </div>
    `;
  }
}

customElements.define('search-bar', searchBar);
