import Swal from 'sweetalert2';
import { AUTHENTICATIONS } from '../globals/api-endpoint';

class AuthDbSource {
  static async postAuth(auth) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: auth.username,
          password: auth.password,
        }),
      };

      const response = await fetch(AUTHENTICATIONS.BASE, options);
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(`Login gagal : ${responseJson.message}`);
      }

      const { accessToken, refreshToken } = responseJson.data || {};

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        throw new Error('Token tidak valid!');
      }

      return responseJson.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Gagal melakukan otentikasi!',
      });
    }
  }

  static async putAuth() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token tidak ditemukan!');

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      };

      const response = await fetch(AUTHENTICATIONS.BASE, options);
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(`Gagal memperbarui token : ${responseJson.message}`);
      }

      const { accessToken } = responseJson.data || {};

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        throw new Error('Token baru tidak valid!');
      }

      return responseJson.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Gagal memperbarui otentikasi!',
      });
    }
  }

  static async deleteAuth() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token tidak ditemukan!');

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      };

      const response = await fetch(AUTHENTICATIONS.BASE, options);
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(`Gagal menghapus token : ${responseJson.message}`);
      }

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

      return responseJson;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Gagal menghapus otentikasi!',
      });
    }
  }
}

export default AuthDbSource;
