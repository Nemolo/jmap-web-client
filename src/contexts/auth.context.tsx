import {
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { redirectToLogin, oauth2Client } from "../services/oauth2.service";
import { OAuth2Token } from "@badgateway/oauth2-client";

export type AuthContextType = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expire: number | undefined;
  setOAuth2Tokens: (tokens: OAuth2Token) => void;
  login: () => void;
  logout: () => void;
  isRefreshing: boolean;
};
export const authContext = createContext<AuthContextType>({
  accessToken: undefined,
  refreshToken: undefined,
  expire: undefined,
  setOAuth2Tokens: (tokens: OAuth2Token) => {},
  login: () => {},
  logout: () => {},
  isRefreshing: false,
});
export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const authData = localStorage.getItem("authData");
  let decoded: OAuth2Token | undefined;
  if (authData && authData.length > 0) {
    try {
      decoded = JSON.parse(authData);
    } catch (e) {
      console.warn("Stored auth data not a valid json");
      localStorage.removeItem("authData");
    }
  }
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(
    decoded?.accessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    decoded?.refreshToken!
  );
  const [expire, setExpire] = useState<number | undefined>(decoded?.expiresAt!);

  const logout = useCallback(() => {
    localStorage.removeItem("authData");
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setExpire(undefined);
  }, []);
  const setOAuth2Tokens = useCallback((tokens: OAuth2Token) => {
    localStorage.setItem("authData", JSON.stringify(tokens));
    setAccessToken(tokens.accessToken);
    if (tokens.refreshToken) {
      setRefreshToken(tokens.refreshToken!);
    }
    setExpire(tokens.expiresAt!);
  }, []);

  useEffect(() => {
    if (refreshToken && expire && expire < new Date().getTime()) {
      setIsRefreshing(true);
      oauth2Client
        .refreshToken({
          accessToken: accessToken as string,
          refreshToken,
          expiresAt: expire!,
        })
        .then(setOAuth2Tokens)
        .finally(() => setIsRefreshing(false));
    }
  }, [accessToken, refreshToken, expire, setOAuth2Tokens]);
  const contextData = useMemo(() => {
    return {
      accessToken,
      refreshToken,
      expire,
      setOAuth2Tokens,
      login: redirectToLogin,
      logout,
      isRefreshing,
    };
  }, [
    accessToken,
    expire,
    logout,
    refreshToken,
    setOAuth2Tokens,
    isRefreshing,
  ]);
  return (
    <authContext.Provider value={contextData}>{children}</authContext.Provider>
  );
}
