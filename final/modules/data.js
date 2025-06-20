// modules/data.js
export async function fetchServices() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const services = await response.json();
    return services;
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}
