import Swal from 'sweetalert2';
import { PRODUCTS } from '../globals/api-endpoint';

class ProductsDbSource {
  static async postProduct(umkmId, product) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: product.name,
          product_type: product.product_type,
          description: product.description,
          price: product.price,
        }),
      };
      const response = await fetch(PRODUCTS.UMKM_BASE(umkmId), options);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Gagal menambahkan produk!');
      }

      return responseJson.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getProductsByUmkm(umkmId) {
    try {
      const response = await fetch(PRODUCTS.UMKM_BASE(umkmId));
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan produk UMKM!');
      }

      return responseJson.data.products;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getProducts() {
    try {
      const response = await fetch(PRODUCTS.BASE);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan list produk!');
      }

      return responseJson.data.products;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await fetch(PRODUCTS.DETAIL(id));
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mendapatkan produk!');
      }

      return responseJson.data.product;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async putProductById(umkmId, id, product) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: product.name,
          product_type: product.product_type,
          description: product.description,
          price: product.price,
        }),
      };
      const response = await fetch(PRODUCTS.UMKM_DETAIL_BASE(umkmId, id), options);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Gagal mengupdate produk!');
      }

      return responseJson;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async deleteProductById(umkmId, id) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(PRODUCTS.UMKM_DETAIL_BASE(umkmId, id), options);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal menghapus produk!');
      }

      return responseJson;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  static async postProductCover(umkmId, id, coverUrl) {
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
      const response = await fetch(PRODUCTS.COVERS(umkmId, id), options);
      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error('Gagal menambahkan cover produk!');
      }

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

export default ProductsDbSource;
