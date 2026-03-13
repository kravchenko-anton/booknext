import { deleteTokensStorage, getAccessToken, getNewTokens } from '@/store/auth/auth-helper'
import { errorCatch } from '@/utils/catch-error'
import { errorToast } from '@/utils/toast'
import axios, { type InternalAxiosRequestConfig } from 'axios'

export const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosRequestInstance = async (
  config: InternalAxiosRequestConfig<any>,
) => {
  const accessToken = await getAccessToken();
  console.log("config");
  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};
export const axiosResponseInstance = async (error: any) => {
  const originalRequest = error.config;
  console.log("error in intercept or", error, originalRequest);
  console.log(error.config._isRetry);
  if (error.response.status === 403) await deleteTokensStorage();
  if (
    (error.response.status === 401 ||
      errorCatch(error) === "jwt expired" ||
      errorCatch(error) === "jwt malformed" ||
      errorCatch(error) === "jwt must be provided") &&
    error.config &&
    !error.config._isRetry
  ) {
    originalRequest._isRetry = true;
    try {
      await getNewTokens();
      return await axios.request({
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });
    } catch (error) {
      if (
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided" ||
        errorCatch(error) === "jwt malformed"
      ) {
        return deleteTokensStorage();
      }
      errorToast("Something went not okay");
      return Promise.reject(error);
    }
  }
  console.log("error in intercept or", error);
  errorToast("Something not right");
  throw error;
};

instance.interceptors.request.use(axiosRequestInstance);
instance.interceptors.response.use(
  (response) => response,
  axiosResponseInstance,
);
