import Swal from 'sweetalert2';
import { REVIEWS } from '../globals/api-endpoint';

class ReviewsDbSource {
  static async postProduct(umkmId, review) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: review.name,
          review: review.review,
          user_rating: review.user_rating,
        }),
      };
      const response = await fetch(REVIEWS.UMKM_BASE(umkmId), options);
      const responseJson = await response.json();

      Swal.fire({
        title: `${responseJson.message}`,
        icon: 'success',
        text: 'Berhasil menambahkan review!',
      });

      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan review!',
      });
      return console.log('Gagal menambahkan review!');
    }
  }

  static async getReviewsByUmkm(umkmId) {
    try {
      const response = await fetch(REVIEWS.UMKM_BASE(umkmId));
      const responseJson = await response.json();
      return responseJson.data.reviews;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menampilkan list review!',
      });
      return console.log('Gagal menampilkan list review!');
    }
  }

  static async getReviews() {
    try {
      const response = await fetch(REVIEWS.BASE);
      const responseJson = await response.json();
      return responseJson.data.reviews;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan list review!',
      });
      return console.log('Gagal mendapatkan list review!');
    }
  }

  static async getReviewById(id) {
    try {
      const response = await fetch(REVIEWS.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.data.review;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan review!',
      });
      return console.log('Gagal mendapatkan review!');
    }
  }

  static async deleteReviewById(umkmId, id) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(REVIEWS.UMKM_DETAIL_BASE(umkmId, id), options);
      const responseJson = await response.json();
      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus review!',
      });
      return console.log('Gagal menghapus review!');
    }
  }
}

export default ReviewsDbSource;
