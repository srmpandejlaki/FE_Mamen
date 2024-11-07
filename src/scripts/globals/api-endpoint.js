import CONFIG from './config';

const BASE = {
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
};

const USERS = {
  ADD: `${CONFIG.BASE_URL}/users`,
  GET: (id) => `${CONFIG.BASE_URL}/users/${id}`,
};

const AUTHENTICATIONS = {
  BASE: `${CONFIG.BASE_URL}/authentications`,
};

const UMKMS = {
  BASE: `${CONFIG.BASE_URL}/umkms`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/umkms/${id}`,
  COVERS: (umkmId) => `${CONFIG.BASE_URL}/umkms/${umkmId}/covers`,
};

const CATEGORIES = {
  BASE: `${CONFIG.BASE_URL}/categories`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/categories/${id}`,
  UMKM_BASE: (umkmId) => `${CONFIG.BASE_URL}/umkms/${umkmId}/categories`,
  DELETE: (umkmId, id) => `${CONFIG.BASE_URL}/umkms/${umkmId}/categories/${id}`,
};

const PRODUCTS = {
  BASE: `${CONFIG.BASE_URL}/products`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/products/${id}`,
  UMKM_BASE: (umkmId) => `${CONFIG.BASE_URL}/umkms/${umkmId}/products`,
  UMKM_DETAIL_BASE: (umkmId, id) => `${CONFIG.BASE_URL}/umkms/${umkmId}/products/${id}`,
  COVERS: (umkmId, id) => `${CONFIG.BASE_URL}/umkms/${umkmId}/products/${id}/covers`,
};

const REVIEWS = {
  BASE: `${CONFIG.BASE_URL}/reviews`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/reviews/${id}`,
  UMKM_BASE: (umkmId) => `${CONFIG.BASE_URL}/umkms/${umkmId}/reviews`,
  UMKM_DETAIL_BASE: (umkmId, id) => `${CONFIG.BASE_URL}/umkms/${umkmId}/reviews/${id}`,
};

export {
  BASE, USERS, AUTHENTICATIONS, UMKMS, CATEGORIES, PRODUCTS, REVIEWS,
};
