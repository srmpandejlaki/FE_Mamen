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
          cover_url: product.cover_url || null,
        }),
      };
      const response = await fetch(PRODUCTS.UMKM_BASE(umkmId), options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: 'success',
        text: 'Berhasil menambahkan product!',
      });

      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan product!',
      });
      return console.log('Gagal menambahkan product!');
    }
  }

  static async getProductsByUmkm(umkmId) {
    try {
      const response = await fetch(PRODUCTS.UMKM_BASE(umkmId));
      const responseJson = await response.json();
      return responseJson.data.products;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menampilkan list produk!',
      });
      return console.log('Gagal menampilkan list produk!');
    }
  }

  static async getProducts() {
    try {
      const response = await fetch(PRODUCTS.BASE);
      const responseJson = await response.json();
      return responseJson.data.products;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan list produk!',
      });
      return console.log('Gagal mendapatkan list produk!');
    }
  }

  static async getProductById(id) {
    try {
      const response = await fetch(PRODUCTS.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.data.product;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan produk!',
      });
      return console.log('Gagal mendapatkan produk!');
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
          cover_url: product.cover_url || null,
        }),
      };
      const response = await fetch(PRODUCTS.UMKM_DETAIL_BASE(umkmId, id), options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: 'success',
        text: 'Berhasil mengupdate produk!',
      });

      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengupdate produk!',
      });
      return console.log('Gagal mengupdate produk!');
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
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus produk!',
      });
      return console.log('Gagal menghapus produk!');
    }
  }

  static async postProductCover(umkmId, id, { coverUrl }) {
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
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan cover produk!',
      });
      return console.log('Gagal menambahkan cover produk!');
    }
  }
}

export default ProductsDbSource;
