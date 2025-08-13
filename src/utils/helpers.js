// utils/helpers.js

/**
 * Utility functions for the sustainability website
 */

/**
 * Filter centers by category or search term
 * @param {Array} centers - Array of center objects
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered centers
 */
export function filterCenters(centers, searchTerm = "") {
  if (!searchTerm.trim()) return centers;
  
  const term = searchTerm.toLowerCase();
  return centers.filter(center => 
    center.name.toLowerCase().includes(term) ||
    center.detail.toLowerCase().includes(term)
  );
}

/**
 * Sort centers by name alphabetically
 * @param {Array} centers - Array of center objects
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted centers
 */
export function sortCenters(centers, order = 'asc') {
  return [...centers].sort((a, b) => {
    if (order === 'asc') {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });
}

/**
 * Get centers by category (you can extend this based on categories you want to add)
 * @param {Array} centers - Array of center objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered centers
 */
export function getCentersByCategory(centers, category) {
  // You can extend this function based on how you want to categorize centers
  // For now, it's a placeholder that returns all centers
  switch (category.toLowerCase()) {
    case 'water':
      return centers.filter(center => 
        center.detail.toLowerCase().includes('water') ||
        center.name.toLowerCase().includes('water')
      );
    case 'energy':
      return centers.filter(center => 
        center.detail.toLowerCase().includes('energy') ||
        center.name.toLowerCase().includes('energy')
      );
    case 'healthcare':
      return centers.filter(center => 
        center.detail.toLowerCase().includes('healthcare') ||
        center.detail.toLowerCase().includes('health')
      );
    case 'manufacturing':
      return centers.filter(center => 
        center.detail.toLowerCase().includes('manufacturing') ||
        center.detail.toLowerCase().includes('material')
      );
    default:
      return centers;
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate a URL-friendly slug from center name
 * @param {string} name - Center name
 * @returns {string} URL slug
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Format research project data for display
 * @param {Array} projects - Array of project objects
 * @returns {Array} Formatted projects
 */
export function formatResearchProjects(projects) {
  return projects.map(project => ({
    ...project,
    slug: generateSlug(project.title),
    description: `View detailed information and data about our ${project.title.toLowerCase()} in a new tab.`
  }));
}

/**
 * Validate external URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Handle smooth scrolling to section
 * @param {string} sectionId - ID of the section to scroll to
 */
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Create analytics tracking event (placeholder)
 * @param {string} eventName - Name of the event
 * @param {Object} properties - Event properties
 */
export function trackEvent(eventName, properties = {}) {
  // Placeholder for analytics tracking
  // You can integrate with Google Analytics, Mixpanel, etc.
  console.log(`Track Event: ${eventName}`, properties);
}

/**
 * Handle external link clicks with analytics
 * @param {string} url - External URL
 * @param {string} linkName - Name/description of the link
 */
export function handleExternalLink(url, linkName) {
  trackEvent('external_link_click', {
    url,
    link_name: linkName
  });
  
  if (isValidUrl(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}