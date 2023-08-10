import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { JmapProvider } from "../contexts/jmap.context";
export function LoggedArea() {
  const { accessToken, expire, isRefreshing } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);
  if (!accessToken) {
    return <p>redirecting to login...</p>;
  }
  if (expire && expire < new Date().getTime() && !isRefreshing) {
    return <p>session expired, refresh the page</p>;
  }
  return (
    <JmapProvider
      accessToken={accessToken}
      sessionUrl="https://mail.aech.it/.well-known/jmap"
    >
      <Outlet />
    </JmapProvider>
  );
}
