import AuthDbSource from '../api/auth-api';

/* eslint-disable class-methods-use-this */
class HeaderBar extends HTMLElement {
  emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  authorization() {
    // Fungsi untuk melakukan logout
    document.getElementById('logout').addEventListener('click', async () => {
      try {
        await AuthDbSource.deleteAuth();
      } catch (error) {
        console.error(error);
      }
    });

    function isLoggedIn() {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        return true;
      }
      return false;
    }

    // Mengubah tampilan berdasarkan status login
    if (isLoggedIn()) {
      document.getElementById('login').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
      document.getElementById('profile').style.display = 'block';
    } else {
      document.getElementById('login').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
      document.getElementById('profile').style.display = 'none';
    }
  }

  render() {
    this.emptyContent();
    this.innerHTML += `
        <div class="navbar-con">
        <div class="navbar">
          <div class="nav-title">
            <a href="" class="title">Ma<span>men</span> </a>
          </div>
          <nav>
            <ul class="nav-list" id="nav-list">
              <li class="nav-item"><a href="#/home" class="nav-link">Home</a></li>
              <li class="nav-item">
                <a href="#/umkms" class="nav-link">UMKM</a>
              </li>
              <li class="nav-item">
                <a href="#/products" class="nav-link">Products</a>
              </li>
            </ul>
          </nav>

          <div class="nav-extra">
            <div class="user-account" id="profile">
              <a href="#/profile">
                <figcaption>Profile</figcaption>
              </a>
            </div>
            <div class="user-account" id="login">
              <a href="#/login">
                <figcaption>Login</figcaption>
              </a>
            </div>
            <div class="user-account" id="logout">
              <a href="#/login">
                <figcaption>Logout</figcaption>
              </a>
            </div>
            <!-- toggle button -->
            <button class="nav-toggle" id="nav-toggle">
              <i>&#9776;</i>
            </button>
          </div>
        </div>
      </div>
      `;

    this.authorization();
  }
}

customElements.define('header-bar', HeaderBar);
