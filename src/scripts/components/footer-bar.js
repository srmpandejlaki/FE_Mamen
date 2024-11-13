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
      <div class="footer-links">
        <div class="about">
          <h4>About</h4>
          <p>Learn more about our mission and values.</p>
        </div>
        <div class="social-media">
          <h4>Follow Us</h4>
            <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
             </ul>
        </div>
        <div class="contact">
          <h4>Contact</h4>
          <p>Email: contact@isshoo.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div class="footerbar">
        <p>
          Copyright &copy; 2024 Isshoo.
          - <em>Ma<span>men</span></em>
        </p>
      </div>
`;
  }
}

customElements.define('footer-bar', FooterBar);
