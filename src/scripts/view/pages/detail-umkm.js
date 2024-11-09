import UrlParser from '../../routes/url-parser';
import UmkmsDbSource from '../../api/umkms-api';

const DetailUmkm = {
  async render() {
    return `
      <section id="explore">
        <div class="explore-con">
          <div id="umkm-list"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    console.log(url.id);
    const umkmDetails = await UmkmsDbSource.getUmkmById(url.id);
    console.log(umkmDetails);
  },
};

export default DetailUmkm;
