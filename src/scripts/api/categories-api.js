import Swal from 'sweetalert2';
import { CATEGORIES } from '../globals/api-endpoint';
import UmkmsDbSource from './umkms-api';

class CategoriesDbSource {
  static async postCategory(umkmId, category) {
    try {
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

      if (!response.ok) {
        throw new Error(responseJson.message || 'Gagal menambahkan kategori!');
      }

      await UmkmsDbSource.getUmkmByUser();
      return responseJson.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getCategoriesByUmkm(umkmId) {
    try {
      const response = await fetch(CATEGORIES.UMKM_BASE(umkmId));
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan kategori!');
      }

      return responseJson.data.categories;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const response = await fetch(CATEGORIES.BASE);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan kategori!');
      }

      return responseJson.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const response = await fetch(CATEGORIES.DETAIL(id));
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan kategori!');
      }

      return responseJson.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async deleteCategoryById(umkmId, id) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(CATEGORIES.DELETE(umkmId, id), options);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal menghapus kategori!');
      }

      await UmkmsDbSource.getUmkmByUser();
      return responseJson;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Handle error and show SweetAlert
  static handleError(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message || 'Terjadi kesalahan!',
    });
  }
}

export default CategoriesDbSource;
