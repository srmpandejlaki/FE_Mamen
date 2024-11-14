// import CONFIG from '../../globals/config';

const createUmkmSliderTemplate = (umkm) => `
            <div
              data-id="${umkm.id}" 
              class="slides"
              style="background-image: url(${umkm.cover_url ? umkm.cover_url : './images/template-umkm-img.png'})"
            >
              <div class="content">
                <h2>${umkm.name}</h2>
                <p>${umkm.subdistrict}</p>
                <p>${umkm.address}</p>
                <p>${umkm.contact}</p>
                <p>${umkm.year}</p>
                <p>${umkm.rating}</p>
                <p>${umkm.categories ? umkm.categories.map((category) => `<span>${category}</span>`).join(', ') : '-'}</p>
                <p>
                  ${umkm.description}
                </p>
              </div>
            </div>
`;

const createUmkmItemTemplate = (umkm) => `
            <article class="umkm-card">
              <div class="umkm-img">
                <img 
                class="lazyload" 
                data-src="${umkm.cover_url || './images/template-umkm-img.png'}" 
                alt="${umkm.name}" 
                onerror="this.onerror=null;this.src='./images/template-umkm-img.png';" 
              />
              </div>

              <div class="umkm-info">
                <span>${umkm.subdistrict}</span>
                <h3><a href="/#/umkms/${umkm.id}">${umkm.name}</a></h3>
                <p>
                ${umkm.description}
                </p>
                <p>
                ${umkm.address}
                </p>
              </div>
              <div class="umkm-rate">
                <i>&#9734;</i>
                <p>${umkm.rating}</p>
              </div>
            </article>
`;
const createProductItemTemplate = (product) => `
            <article class="umkm-card">
              <div class="umkm-img">
                <img class="lazyload" data-src="${product.cover_url ? product.cover_url : './images/template-product-img.png'}" alt="${product.name}" />
              </div>

              <div class="umkm-info">
                <span>Rp. ${product.price}</span>
                <h3><a href="/#/products/${product.id}">${product.name}</a></h3>
                <p>
                ${product.description}
                </p>
                <p>
                ${product.product_type}
                </p>
              </div>
            </article>
`;

const createReviewItemTemplate = (review) => `
          <div class="review-item">
            <div class="review-name">
              <h3>${review.user_rating}</h3>
            </div>
            <div class="review-des">
              <p>" ${review.review} "</p>
            </div>
            <div class="review-date">
              <p>${review.name}</p>
            </div>
          </div>
`;
export {
  createUmkmSliderTemplate,
  createUmkmItemTemplate,
  createProductItemTemplate,
  createReviewItemTemplate,
};
