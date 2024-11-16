import Swal from 'sweetalert2';
import { CATEGORIES } from '../globals/api-endpoint';
import Loading from '../utility/loading';

class CategoriesDbSource {
  static async postCategory(umkmId, category) {
    try {
      const umkmContainer = document.querySelector('#umkms');
      await Loading.loadingPage(umkmContainer);

      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: category.name,
        }),
      };
      const response = await fetch(CATEGORIES.UMKM_BASE(umkmId), options);
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
        text: 'Gagal menambahkan kategori!',
      });
    }
  }

  static async getCategoriesByUmkm(umkmId) {
    try {
      const response = await fetch(CATEGORIES.UMKM_BASE(umkmId));
      const responseJson = await response.json();
      return responseJson.data.categories;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan kategori!',
      });
    }
  }

  static async getCategories() {
    try {
      const response = await fetch(CATEGORIES.BASE);
      const responseJson = await response.json();
      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan kategori!',
      });
    }
  }

  static async getCategoryById(id) {
    try {
      const response = await fetch(CATEGORIES.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan kategori!',
      });
    }
  }

  static async deleteCategoryById(umkmId, id) {
    try {
      const umkmContainer = document.querySelector('#umkms');
      await Loading.loadingPage(umkmContainer);

      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(CATEGORIES.DELETE(umkmId, id), options);
      const responseJson = await response.json();
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus kategori!',
      });
    }
  }
}

export default CategoriesDbSource;
