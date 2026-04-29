import { defineStore } from 'pinia';

export const usePopularToolsStore = defineStore('popular', () => {
  // Default popular tool paths - can be fetched from API later
  const defaultPopularToolPaths = [
    '/qrcode-generator',
    '/xml-formatter',
    '/url-encoder',
    '/token-generator',
    '/password-strength-analyser',
    '/uuid-generator',
    '/hash-text',
    '/image-generator',
  ];

  // API endpoint for fetching popular tools (to be implemented)
  async function fetchPopularToolsFromApi(): Promise<string[]> {
    // TODO: Replace with actual API call
    // return await fetch('/api/popular-tools').then(res => res.json());
    return defaultPopularToolPaths;
  }

  return {
    defaultPopularToolPaths,
    fetchPopularToolsFromApi,
  };
});
