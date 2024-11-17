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
        <search-bar></search-bar>
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
    const allUmkmList = await UmkmsDbSource.getUmkms();
    const pageload = document.querySelector('.pageload');
    if (pageload) {
      pageload.remove();
    }
    allUmkmList.forEach((umkm) => {
      umkmContainer.innerHTML += createUmkmItemTemplate(umkm);
    });

    if (umkmContainer.innerHTML === '') {
      umkmContainer.innerHTML = 'Tidak ada umkm untuk ditampilkan.';
    }
    // --------------------------------------------
  },
};

export default ListUmkm;
