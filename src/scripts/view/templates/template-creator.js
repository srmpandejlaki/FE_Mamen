// import CONFIG from '../../globals/config';

const createUmkmItemTemplate = (umkm) => `
            <article class="umkm-card">
              <div class="umkm-img">
                <img class="lazyload" data-src="${umkm.cover_url}" alt="${umkm.name}" />
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
                <img class="lazyload" data-src="${product.cover_url}" alt="${product.name}" />
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

const createReviewItemTemplate = () => `
  
`;
export {
  createUmkmItemTemplate,
  createProductItemTemplate,
  createReviewItemTemplate,
};
