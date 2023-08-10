import { useContext, useEffect } from "react";
import { finalizeAuthorizationCode } from "../../services/oauth2.service";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/auth.context";

export function Callback() {
  const { setOAuth2Tokens } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    finalizeAuthorizationCode()
      .then((token) => {
        setOAuth2Tokens(token);
        navigate("");
      })
      .catch((error) => console.error(error));
  });
  return <>Finalizing login...</>;
}
