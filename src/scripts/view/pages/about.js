import Loading from '../../utility/loading';

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
    const container = document.querySelector('#aboutSection');
    Loading.loadingPage(container);
    container.innerHTML = '';
  },
};

export default AboutUs;
