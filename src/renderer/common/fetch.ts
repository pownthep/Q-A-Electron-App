import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export async function fetch<T> (request: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<any> = await axios(request).catch((error: AxiosError) => { throw error; });
  return response.data;
}
