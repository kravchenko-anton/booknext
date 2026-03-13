import { errorCatch } from '@/utils/catch-error'

import * as SecureStore from 'expo-secure-store'
import { AuthApi } from '../../../api-client'

const serverUrl = process.env.SERVER_URL;
const auth = new AuthApi(
  {
    basePath: serverUrl,
    isJsonMime: () => true,
  },
  process.env.SERVER_URL,
  undefined,
);

export const getAccessToken = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  return accessToken || null;
};

export const getRefreshToken = async () => {
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  return refreshToken || null;
};

export const saveTokensStorage = async (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  await SecureStore.setItemAsync("accessToken", data.accessToken);
  await SecureStore.setItemAsync("refreshToken", data.refreshToken);
};

export const deleteTokensStorage = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};

export const getNewTokens = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");
  const { data: response } = await auth
    .refreshToken({ refreshToken })
    .catch((error: any) => {
      if (errorCatch(error) === "jwt expired") deleteTokensStorage();
      if (errorCatch(error) === "jwt malformed") deleteTokensStorage();
      throw error;
    });

  if (response.accessToken)
    await saveTokensStorage({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  if (!response.accessToken) throw new Error("No access token");

  return response;
};
