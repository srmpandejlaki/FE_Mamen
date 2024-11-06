import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/umkms`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/umkms/${id}`,
  // SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  // REVIEW: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
