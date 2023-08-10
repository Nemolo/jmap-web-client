import { useEffect } from "react";
import { redirectToLogin } from "../../services/oauth2.service";

export function Login() {
  useEffect(() => {
    redirectToLogin();
  });
  return <>Redirecting to Login</>;
}
