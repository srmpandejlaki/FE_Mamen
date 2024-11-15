class reviewForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallBack() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
      <section class="ReviewForm">
        <div class="h2Review">
          <h2>Form Review</h2>
        </div>
        <form action="" class="Forms" id="Forms">
          <div class="desc">
            <div>
              <label for="name">Nama</label>
              <input type="text" name="Nama" id="nama">
            </div>
            <div>
              <label for="reviews">Review</label>
              <textarea name="review" id="review"></textarea>
            </div>
          </div>
          <div>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating">
          </div>
          <button type="submit">upload</button>
        </form>
      </section>
    `;
  }
}

customElements.define('form-review', reviewForm);
