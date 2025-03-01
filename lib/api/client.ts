/**
 * API client for making HTTP requests
 */

// Define request methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Interface for request options
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

// Types for API responses
export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Handles API requests with unified error handling and response formatting
 */
export const apiClient = {
  /**
   * Make a request to the API
   */
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    // Default options
    const defaultOptions: RequestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Merge options
    const fetchOptions: RequestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Convert body to JSON string if it exists and is not already a string
    if (fetchOptions.body && typeof fetchOptions.body !== 'string') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    try {
      // Make the request
      const response = await fetch(endpoint, fetchOptions as RequestInit);
      
      // Parse the response
      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        // Response wasn't JSON
      }
      
      // Check if response is not ok
      if (!response.ok) {
        return {
          data: null,
          error: data?.message || `Error ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }
      
      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
      };
    }
  },
  
  /**
   * Convenience methods for common HTTP methods
   */
  get<T = any>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },
  
  post<T = any>(endpoint: string, body: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },
  
  put<T = any>(endpoint: string, body: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },
  
  patch<T = any>(endpoint: string, body: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },
  
  delete<T = any>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};

// Type definition for Next.js fetch config
interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}