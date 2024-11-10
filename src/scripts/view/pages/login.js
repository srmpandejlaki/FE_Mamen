import AuthDbSource from '../../api/auth-api';
import UsersDbSource from '../../api/users-api';

const Login = {
  async render() {
    return `
    <div class="login">
    <section class="login-section">
        <!-- Left side: Image -->
        <div class="login-image">
            <img src="./images/hero-image2.webp" alt="Login Image">
        </div>

        <!-- Right side: Form Container -->
        <div class="form-container">
            <div class="toggle-buttons">
                <button id="registerBtn">Daftar</button>
                <button id="loginBtn" class="act">Login</button>
            </div>

            <!-- Login Form -->
            <form id="loginForm" class="form act">
              <div>
                <h2>Login</h2>
                <div>
                  <label for="email">Email</label>
                  <input type="text" id="email" name="email" required>
                </div>
                <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
                </div>
              </div>
              <button type="submit">Login</button>
            </form>

            <!-- Register Form -->
            <form id="registerForm" class="form">
              <div>
                <h2>Daftar</h2>
                <div>
                  <label for="reg-email">Email</label>
                  <input type="text" id="reg-email" name="email" required>
                </div>
                <div>
                  <label for="reg-password">Password</label>
                  <input type="password" id="reg-password" name="password" required>
                </div>
                <div>
                  <label for="fullname">Fullname</label>
                  <input type="text" id="fullname" name="fullname" required>
                </div>
              </div>
              <button type="submit">Daftar</button>
            </form>
        </div>
    </section>
    </div>
    `;
  },

  async afterRender() {
    // hide header and footer while rendering the login page
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    header.style.display = 'none';
    footer.style.display = 'none';
    // --------------------------------------------

    // login and register button
    function showLogin() {
      document.getElementById('loginForm').classList.add('act');
      document.getElementById('registerForm').classList.remove('act');
      document.getElementById('loginBtn').classList.add('act');
      document.getElementById('registerBtn').classList.remove('act');
    }

    function showRegister() {
      document.getElementById('registerForm').classList.add('act');
      document.getElementById('loginForm').classList.remove('act');
      document.getElementById('registerBtn').classList.add('act');
      document.getElementById('loginBtn').classList.remove('act');
    }

    document.getElementById('loginBtn').addEventListener('click', showLogin);
    document.getElementById('registerBtn').addEventListener('click', showRegister);
    // --------------------------------------------

    // login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const auth = { username, password };

      try {
        const response = await AuthDbSource.postAuth(auth);
        window.localStorage.setItem('accessToken', response.accessToken);
        window.location.href = '/';
      } catch (error) {
        console.error(error);
      }
    });

    // register form
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const fullname = document.getElementById('fullname').value;

      const user = { username, password, fullname };

      try {
        await UsersDbSource.postUser(user);
        showLogin();
      } catch (error) {
        console.error(error);
      }
    });
  },
};

export default Login;
