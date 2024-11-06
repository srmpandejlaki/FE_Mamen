import Swal from 'sweetalert2';
import API_ENDPOINT from '../globals/api-endpoint';

class MamenDbSource {
  static async listUmkm() {
    try {
      // await Loading.restoList();
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.data.umkms;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menampilkan list restoran!',
      });
      return console.log('Gagal menampilkan list restoran!');
    }
  }

  static async getDetailUmkm(id) {
    try {
      // await Loading.restoDetail();
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.data.umkm;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan detail restoran!',
      });
      return console.log('Gagal mendapatkan detail restoran!');
    }
  }
}

export default MamenDbSource;
