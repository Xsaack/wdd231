// modules/storage.js
export function savePreferredCategory(category) {
  localStorage.setItem('preferredCategory', category);
}

export function getPreferredCategory() {
  return localStorage.getItem('preferredCategory') || 'all';
}
