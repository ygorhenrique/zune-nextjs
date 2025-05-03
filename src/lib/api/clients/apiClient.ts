// lib/api/clients/apiClient.ts
export const apiClient = {
    async get<T>(url: string): Promise<T> {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    },
  };