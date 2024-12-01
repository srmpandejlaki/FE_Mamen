const AboutUs = {
  async render() {
    return `
  <section id="aboutSection">
        <img
            src='./images/about-image.jpg' 
            alt="About Image" class="about-image" />
        <div class="about-us">
            <h1>About Us</h1>
        </div>

        <div class="introduction">
            <div class="introduction-content">
                <h2>Introduction To MAMEN</h2>
                <p>Mamen adalah platform yang mendigitalisasi promosi UMKM di Manado. Kami membantu pelaku usaha meningkatkan visibilitas dan penjualan melalui teknologi dan media sosial. </p>
            </div>
        </div>

  <div class="vision-mission">
    <div class="vimi-card">
      <div class="header red"></div>
      <div class="vimi-content">
        <h2>Our Vision</h2>
        <p>Kami bercita-cita menjadi pemimpin dalam industri kami dengan menciptakan solusi yang berkelanjutan dan inovatif.</p>
      </div>
    </div>
    <div class="vimi-card">
      <div class="header orange"></div>
      <div class="vimi-content">
        <h2>Our Mission</h2>
        <p>Kami berkomitmen untuk memberikan layanan terbaik kepada pelanggan kami dengan inovasi dan kualitas.</p>
      </div>
    </div>
  </div>

      <div class="values">
        <div class="values-point">
        <div class="values-item">INTEGRITAS</div>
        <div class="values-item">INOVASI</div>
        <div class="values-item">KUALITAS</div>
        <div class="values-item">KERJASAMA</div>
        </div>
      </div>

      <div class="services">
    <h1 class="services-title">Our Services</h1>
    <div class="services-container">
      <div class="services-item">
        <img src="aboutUs.jpg" alt="Service Image 1" class="service-image">
        <div class="service-overlay">
          <p class="service-text">Promosi</p>
        </div>
      </div>
      <div class="services-item">
        <div class="service-overlay">
          <p class="service-text">
            Kami bercita-cita menjadi pemimpin dalam industri kami dengan menciptakan solusi yang berkelanjutan dan inovatif.
          </p>
        </div>
      </div>
      <div class="services-item">
        <div class="service-overlay">
          <p class="service-text">
            Kami bercita-cita menjadi pemimpin dalam industri kami dengan menciptakan solusi yang berkelanjutan dan inovatif.
          </p>
        </div>
      </div>
      <div class="services-item">
        <img src="aboutUs.jpg" alt="Service Image 3" class="service-image">
        <div class="service-overlay">
          <p class="service-text">Promosi</p>
        </div>
      </div>
    </div>
  </div>

    <div class="team-member">
        <div class="our-tittle">
            <h1>Our Team Members</h1>
        </div>
        <div class="all-card">
        <div class="member-card">
          <div class="image">
            <img src="images/member1.jpg" alt="Member 1">
          </div>
          <h2>ALGY NGENGET</h2>
          <p class="position">isi apa</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="member-card">
          <div class="image">
            <img src="images/member2.jpg" alt="Member 2">
          </div>
          <h2>MONICA PANDEIROTH</h2>
          <p class="position">isi apa</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="member-card">
          <div class="image">
            <img src="images/member3.jpg" alt="Member 3">
          </div>
          <h2>SESILIA PANDEJLAKI</h2>
          <p class="position">isi apa</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="member-card">
          <div class="image">
            <img src="images/member4.jpg" alt="Member 4">
          </div>
          <h2>MELIA KUNTONO</h2>
          <p class="position">isi apa</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  <div>
        <div class="separator"></div>
    </div>
  </section>
    `;
  },

  async afterRender() {
    console.log('halaman about us');
  },
};

export default AboutUs;
