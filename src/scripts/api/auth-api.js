import Swal from 'sweetalert2';
import { AUTHENTICATIONS } from '../globals/api-endpoint';
import Loading from '../utility/loading';

class AuthDbSource {
  static async postAuth(auth) {
    try {
      const kontainer = document.querySelector('.login');
      await Loading.loadingPage(kontainer);

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

      const { accessToken, refreshToken } = responseJson.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return responseJson.data;
    } catch {
      document.querySelector('.pageload').remove();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal melakukan otentikasi!',
      });
    }
  }

  static async putAuth() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
        }),
      };
      const response = await fetch(AUTHENTICATIONS.BASE, options);
      const responseJson = await response.json();

      const { accessToken } = responseJson.data;
      localStorage.setItem('accessToken', accessToken);
      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memperbarui otentikasi!',
      });
    }
  }

  static async deleteAuth() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
        }),
      };
      const response = await fetch(AUTHENTICATIONS.BASE, options);
      const responseJson = await response.json();

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

      return responseJson;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus otentikasi!',
      });
    }
  }
}

export default AuthDbSource;
