const Home = {
  async render() {
    return `
      <section id="home">
        <picture>
          <source 
            type="image/webp"
            fetchpriority="high" 
            srcset="./images/hero-image2.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            fetchpriority="high" 
            srcset="./images/hero-image2-small.jpg">
          <img
            fetchpriority="high" 
            src='./images/hero-image2-large.jpg' 
            alt="Hero Image"
          >
        </picture>
        <hero-section></hero-section>
      </section>
    `;
  },

  async afterRender() {
    // const cat = document.querySelector('#cat');
    // const explore = document.querySelector('#explore');

    // cat.addEventListener('click', () => {
    //   explore.scrollIntoView({ behavior: 'smooth' });
    // });
  },
};

export default Home;
