const AboutUs = {
  async render() {
    return `
    <section id="aboutSection">
        <div class="about-us">
            <h1>About Us</h1>
        </div>

        <div class="our-mission">
            <div class="mission-content">
                <h2>Our Mission</h2>
                <p>Kami berkomitmen untuk memberikan layanan terbaik kepada pelanggan kami dengan inovasi dan kualitas.</p>
            </div>
        </div>

        <div class="our-vision">
            <div class="vision-content">
                <h2>Our Vision</h2>
                <p>Kami bercita-cita menjadi pemimpin dalam industri kami dengan menciptakan solusi yang berkelanjutan dan inovatif.</p>
            </div>
        </div>

        <div class="our-values">
            <div class="values-content">
                <h2>Our Values</h2>
                <ul>
                    <li>Integritas</li>
                    <li>Inovasi</li>
                    <li>Kualitas</li>
                    <li>Kerjasama</li>
                </ul>
            </div>
        </div>

       <div class="team-members">
            <h2>Our Team Member</h2>
            <div class="members">
                <div class="member">
                    <img src="member1.jpg" alt="Member 1">
                    <h3>Nama Anggota 1</h3>
                    <p>Deskripsi singkat tentang anggota 1.</p>
                </div>
                <div class="member">
                    <img src="member2.jpg" alt="Member 2">
                    <h3>Nama Anggota 2</h3>
                    <p>Deskripsi singkat tentang anggota 2.</p>
                </div>
                <div class="member">
                    <img src="member3.jpg" alt="Member 3">
                    <h3>Nama Anggota 3</h3>
                    <p>Deskripsi singkat tentang anggota 3.</p>
                </div>
                <div class="member">
                    <img src="member4.jpg" alt="Member 4">
                    <h3>Nama Anggota 4</h3>
                    <p>Deskripsi singkat tentang anggota 4.</p>
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
