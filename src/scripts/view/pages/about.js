const AboutUs = {
  async render() {
    return `
  <section id="aboutSection">
        <picture>
          <source 
            type="image/jpeg" 
            srcset="./images/about-image.jpg">
          <source 
            type="image/webp"
            srcset="./images/about-image.webp">
          <source 
            type="image/jpeg"
            media="(max-width: 600px)" 
            srcset="./images/about-image-small.jpg">
          <img
            src='./images/about-image.jpg' 
            alt="About Image"
          >
        </picture>
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
          <div class="box vision">
            <h3>Our Vision</h3>
            <p>Kami bertekad untuk menjadi platform digital yang terpercaya dengan mendorong inovasi yang berkelanjutan dan kreatif.</p>
          </div>
          <div class="box mission">
            <h3>Our Mission</h3>
            <p>Kami berkomitmen untuk memberikan layanan terbaik kepada pelanggan kami dengan ramah dan jujur.</p>
          </div>
        </div>


      <div class="values">
        <div class="values-item">INTEGRITAS</div>
        <div class="values-item">INOVASI</div>
        <div class="values-item">KUALITAS</div>
        <div class="values-item">KERJASAMA</div>
      </div>
      

      <div class="team-member">
      <h2>Our Team Member</h2>
        <div class="card">
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
        <div class="card">
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
        <div class="card">
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
        <div class="card">
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
