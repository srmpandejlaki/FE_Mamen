const Login = {
  async render() {
    return `
      <section>
      <a href="#/home">Login</a>
      </section>
    `;
  },

  async afterRender() {
    console.log('ini halaman login');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    header.style.display = 'none';
    footer.style.display = 'none';
  },
};

export default Login;
