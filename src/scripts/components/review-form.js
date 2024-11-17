class reviewForm extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
      <section class="formReviewContainer">
        <div class="titleFormReview">
          <h2>Form Review</h2>
        </div>
        <form action="" class="formReview" id="formReview">
          <div class="formReviewDesc">
            <div>
              <label for="name">Nama</label>
              <input type="text" name="Nama" id="nama">
            </div>
            <div>
              <label for="rating">Rating</label>
              <input type="number" name="rating" id="rating">
            </div>
            <div>
              <label for="reviews">Review</label>
              <textarea name="review" id="review"></textarea>
            </div>
          </div>
          <button class="btnFormReview" type="submit">Upload</button>
        </form>
      </section>
    `;
  }
}

customElements.define('form-review', reviewForm);
