import UmkmsDbSource from '../../api/umkms-api';
import { createUmkmItemTemplate } from '../templates/template-creator';

const ListUmkm = {
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
    // RENDER UMKM
    const umkmContainer = document.querySelector('#umkm-list');
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
