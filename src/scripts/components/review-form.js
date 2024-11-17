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
            <div class="nama-review">
              <label for="name">Nama</label>
              <input type="text" name="Nama" id="namaReviewer" placeholder="Nama">
            </div>
            <div class="rating-review">
              <label for="rating">Rating</label>
              <input type="number" name="rating" id="userRating" min="1" max="5" placeholder="1 - 5">
            </div>
            <div class="body-reviews">
              <label for="reviews">Review</label>
              <textarea name="review" id="reviewBody" placeholder="Deskripsi"></textarea>
            </div>
          </div>
          
          <button class="btnFormReview" type="submit">Upload</button>
        </form>
      </section>
    `;
  }
}

customElements.define('form-review', reviewForm);
