const AboutUs = {
  async render() {
    return `
    <section id="aboutSection">
     <div>
          <div class="separator"></div>
        </div>
    </section>
    `;
  },

  async afterRender() {
    console.log('halaman about us');
  },
};

export default AboutUs;
