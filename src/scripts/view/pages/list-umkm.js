import UmkmsDbSource from '../../api/umkms-api';
import { createUmkmItemTemplate } from '../templates/template-creator';

const ListUmkm = {
  async render() {
    return `
      <section id="explore" class="exploreUmkm">
        <div class="explore-con">
          <div id="list-umkm"></div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // RENDER UMKM
    const umkmContainer = document.querySelector('#list-umkm');
    umkmContainer.innerHTML = '';
    const umkms = await UmkmsDbSource.getUmkms();

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
