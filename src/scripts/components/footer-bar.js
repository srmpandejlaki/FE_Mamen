class FooterBar extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-info">
            <a href="#" class="footer-logo"><h3>Mamen</h3></a>

            <p class="footer-description">
              Travel with us and explore
              the world without limits.
            </p>
          </div>

          <div class="footer-data">
            <div>
              <h3 class="footer-title">About</h3>

              <ul class="footer-links">
                <li>
                  <a href="#" class="footer-link">About us</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Features</a>
                </li>

                <li>
                  <a href="#" class="footer-link">News & Blog</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="footer-title">Company</h3>

              <ul class="footer-links">
                <li>
                  <a href="#" class="footer-link">FAQs</a>
                </li>

                <li>
                  <a href="#" class="footer-link">History</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Testimonials</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="footer-title">Contact</h3>

              <ul class="footer-links">
                <li>
                  <a href="#" class="footer-link">Call Center</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Support Center</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Contact Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="footer-title">Support</h3>

              <ul class="footer-links">
                <li>
                  <a href="#" class="footer-link">Privacy Policy</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Terms & Services</a>
                </li>

                <li>
                  <a href="#" class="footer-link">Payments</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-group">
          
          <div class="footer-social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              class="footer-social-link"
            >
              <i class="ri-facebook-line"></i>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              class="footer-social-link"
            >
              <i class="ri-instagram-line"></i>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              class="footer-social-link"
            >
              <i class="ri-twitter-line"></i>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              class="footer-social-link"
            >
              <i class="ri-youtube-line"></i>
            </a>
          </div>

          <div class="footer-copy">
            <p>
              &#169; Copyright Bedicode. All rights reserved
            </p>
          </div>
        </div>
      </div>
`;
  }
}

customElements.define('footer-bar', FooterBar);
