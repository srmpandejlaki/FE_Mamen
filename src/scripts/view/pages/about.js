const AboutUs = {
  async render() {
    return `
    <section id="aboutSection">
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
        <div class="vision">
          <h3>Our Vision</h3>
          <p>Kami bertekad untuk menjadi platform digital yang terpercaya dengan mendorong inovasi yang berkelanjutan dan kreatif.</p>
        </div>
        <div class="mission">
          <h3>Our Mission</h3>
          <p>Kami berkomitmen untuk memberikan layanan terbaik kepada pelanggan kami dengan ramah dan jujur.</p>
        </div>
      </div>


    <div class="values">
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
