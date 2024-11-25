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
        }),
      };

      const response = await fetch(UMKMS.BASE, options);

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message || 'Gagal menambahkan UMKM!');
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat menambahkan UMKM!',
      });

      throw error;
    }
  }

  static async getUmkms() {
    try {
      const response = await fetch(UMKMS.BASE);

      if (!response.ok) {
        throw new Error('Gagal mendapatkan list UMKM!');
      }

      const responseJson = await response.json();
      return responseJson.data.umkms;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat mengambil list UMKM!',
      });

      throw error;
    }
  }

  static async getUmkmById(id) {
    try {
      const response = await fetch(UMKMS.DETAIL(id));

      if (!response.ok) {
        throw new Error('Gagal mendapatkan detail UMKM!');
      }

      const responseJson = await response.json();
      return responseJson.data.umkm;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat mengambil detail UMKM!',
      });

      throw error;
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

      if (!response.ok) {
        throw new Error('Token tidak valid. Coba login kembali.');
      }

      const responseJson = await response.json();
      return responseJson.data.umkm;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Token Invalid',
        text: error.message || 'Coba untuk login kembali.',
      });

      window.location.hash = '#/login';
      throw error;
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
        }),
      };

      const response = await fetch(UMKMS.DETAIL(id), options);

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message || 'Gagal mengupdate UMKM!');
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat mengupdate UMKM!',
      });

      throw error;
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

      if (!response.ok) {
        throw new Error('Gagal menghapus UMKM!');
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat menghapus UMKM!',
      });

      throw error;
    }
  }

  static async postUmkmCover(umkmId, coverUrl) {
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

      if (!response.ok) {
        throw new Error('Gagal menambahkan cover UMKM!');
      }

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan saat menambahkan cover UMKM!',
      });

      throw error;
    }
  }
}

export default UmkmsDbSource;
