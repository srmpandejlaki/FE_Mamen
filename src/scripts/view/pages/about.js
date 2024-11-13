const AboutUs = {
  async render() {
    return `
    <section id="aboutSection">
     
    </section>
    `;
  },

  async afterRender() {
    console.log('halaman about us');
  },
};

export default AboutUs;
