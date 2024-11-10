import Swal from 'sweetalert2';
import { UMKMS } from '../globals/api-endpoint';

class UmkmsDbSource {
  static async postUmkm(umkm) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: umkm.name,
          description: umkm.description,
          subdistrict: umkm.subdistrict,
          address: umkm.address,
          contact: umkm.contact,
          year: umkm.year,
          cover_url: umkm.cover_url || null,
        }),
      };
      const response = await fetch(UMKMS.BASE, options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        text: `${responseJson.status}`,
      });

      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan umkm!',
      });
    }
  }

  static async getUmkms() {
    try {
      const response = await fetch(UMKMS.BASE);
      const responseJson = await response.json();
      return responseJson.data.umkms;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menampilkan list umkm!',
      });
    }
  }

  static async getUmkmById(id) {
    try {
      const response = await fetch(UMKMS.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.data.umkm;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan detail umkm!',
      });
    }
  }

  static async getUmkmByUser() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(UMKMS.USER_BASE, options);
      const responseJson = await response.json();
      return responseJson.data.umkm;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan umkm!',
      });
    }
  }

  static async putUmkmById(id, umkm) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: umkm.name,
          description: umkm.description,
          subdistrict: umkm.subdistrict,
          address: umkm.address,
          contact: umkm.contact,
          year: umkm.year,
          cover_url: umkm.cover_url || null,
        }),
      };
      const response = await fetch(UMKMS.DETAIL(id), options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        text: `${responseJson.status}`,
      });

      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengupdate umkm!',
      });
    }
  }

  static async deleteUmkmById(id) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(UMKMS.DETAIL(id), options);
      const responseJson = await response.json();
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus umkm!',
      });
    }
  }

  static async postUmkmCover(umkmId, { coverUrl }) {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const formData = new FormData();
      formData.append('cover_url', coverUrl);

      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(UMKMS.COVERS(umkmId), options);
      const responseJson = await response.json();
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan cover umkm!',
      });
    }
  }
}

export default UmkmsDbSource;
