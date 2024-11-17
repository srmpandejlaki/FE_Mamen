import Swal from 'sweetalert2';
import { USERS } from '../globals/api-endpoint';
import Loading from '../utility/loading';

class UsersDbSource {
  static async postUser(user) {
    try {
      const kontainer = document.querySelector('.login');
      await Loading.loadingPage(kontainer);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          fullname: user.fullname,
        }),
      };
      const response = await fetch(USERS.ADD, options);
      const responseJson = await response.json();

      document.querySelector('.pageload').remove();
      Swal.fire({
        title: `${responseJson.status}`,
        text: `${responseJson.message}`,
      });

      return responseJson.data;
    } catch {
      document.querySelector('.pageload').remove();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan user!',
      });
    }
  }

  static async getUserById(id) {
    try {
      const response = await fetch(USERS.GET(id));
      const responseJson = await response.json();
      return responseJson.data;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mendapatkan user!',
      });
    }
  }
}

export default UsersDbSource;
