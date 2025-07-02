import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export let PRODUCTION_URL = '';
export let STAGING_URL = '';

export const buildAcceptHeader = () => ({
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
});

export const buildJwtHeader = () => ({
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
});

export const buildTokenAcceptHeader = (token: string) => ({
  Authentication: token,
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
});

export const buildURL = (path = '', url = 1): string => {
  if (url == 1) {
    console.log('URL: =>>>> ' + STAGING_URL + path);
    return STAGING_URL + path;
  }
  return PRODUCTION_URL + path;
};

export const getRequest = async <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(path, config);
    return response.data;
  } catch (error) {
    // console.log('URL CONFIG:', path, config);

    if (axios.isAxiosError(error)) {
      console.error('❌ Axios Error:');

      // Log response details if available
      if (error.response) {
        console.error('🔹 Response Status:', error.response.status);
        console.error('🔹 Response Data:', error.response.data);
      } else {
        console.error('🔹 No Response Received');
      }

      // Throw error to propagate or handle further
      throw error;
    } else {
      console.error('Unexpected Error:', error);
      throw error;
    }
  }
};

export const postRequest = async <T>(
  path: string,
  payload: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(path, payload, config);
    return response.data;
  } catch (error) {
    console.error('Axios POST Error:', error);
    console.error('Failed Request:', { path, payload, config });

    return Promise.reject(error); // Proper error handling
  }
};

export const patchRequest = async <T>(
  path: string,
  payload: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.patch(path, payload, config);
    return response.data;
  } catch (error) {
    console.error('Axios PATCH Error:', error);
    console.error('Failed Request:', { path, payload, config });

    return Promise.reject(error);
  }
};

export const putRequest = async <T>(
  path: string,
  payload: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.put(path, payload, config);
    return response.data;
  } catch (error) {
    console.error('Axios PUT Error:', error);
    console.error('Failed Request:', { path, payload, config });

    return Promise.reject(error);
  }
};

export const fetchJwtToken = async <T = string>(
  path: string,
  payload?: unknown,
  config?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config?.headers || {}), // Merge additional headers if provided
      },
      body: payload ? JSON.stringify(payload) : undefined,
      ...config, // Spread any additional config options
    });

    // Check if the response is OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Dynamically parse the response based on the expected type
    const data: T = await response.json();

    console.log('✅ Response:', data);

    return data;
  } catch (error) {
    console.error('❌ Fetch JWT Fetch Error:', error);
    console.error('❌ Failed Request:', { path, payload, config });

    return Promise.reject(error);
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get(
      'https://stagingapi.smartcitycontrol.net/api/customers/profile/me',
      {
        headers: {
          authentication: token,
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate', // ✅ Prevents caching
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );

    console.log('✅ User Profile:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else {
      console.error('❌ Unexpected Error:', error);
    }
  }
};
