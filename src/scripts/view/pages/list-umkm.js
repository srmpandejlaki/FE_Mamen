import UmkmsDbSource from '../../api/umkms-api';
import Loading from '../../utility/loading';
import { createUmkmItemTemplate } from '../templates/template-creator';

const ListUmkm = {
  async render() {
    return `
      <section id="explore" class="exploreUmkm">
        <div>
          <div class="separator"></div>
        </div>
        <div class="explore-con">
          <div id="list-umkm"></div>
        </div>
        <div>
          <div class="separator"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // RENDER UMKM
    const umkmContainer = document.querySelector('#list-umkm');
    await Loading.loadingPage(umkmContainer);
    const umkms = await UmkmsDbSource.getUmkms();

    document.querySelector('.pageload').remove();
    umkms.forEach((umkm) => {
      umkmContainer.innerHTML += createUmkmItemTemplate(umkm);
    });

    if (umkmContainer.innerHTML === '') {
      umkmContainer.innerHTML = 'Tidak ada umkm untuk ditampilkan.';
    }
    // --------------------------------------------
  },
};

export default ListUmkm;
