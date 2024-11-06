import MamenDbSource from '../../datas/mamen-api';

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
      <section id="explore"></section>
    `;
  },

  async afterRender() {
    const cat = document.querySelector('#cat');
    const explore = document.querySelector('#explore');

    cat.addEventListener('click', () => {
      explore.scrollIntoView({ behavior: 'smooth' });
    });

    const ambilDataUmkm = async () => {
      const dataUmkm = await MamenDbSource.listUmkm();
      console.log(dataUmkm);
    };

    const ambilDetailUmkm = async (id) => {
      const dataUmkm = await MamenDbSource.getDetailUmkm(id);
      console.log(dataUmkm);
    };

    await ambilDataUmkm();
    ambilDetailUmkm('umkm-gf-bJ-nnnYsYk3Vu');
  },
};

export default Home;
