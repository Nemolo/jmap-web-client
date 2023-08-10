import { OAuth2Client, generateCodeVerifier } from "@badgateway/oauth2-client";

export const oauth2Client = new OAuth2Client({
  // The base URI of your OAuth2 server
  server: "https://mail.aech.it/",
  tokenEndpoint: '/auth/token',
  authorizationEndpoint: '/auth/code',
  // OAuth2 client id
  clientId: "test",
  // OAuth2 Metadata discovery endpoint.
  //
  // This document is used to determine various server features.
  // If not specified, we assume it's on /.well-known/oauth2-authorization-server
  discoveryEndpoint: "/.well-known/oauth-authorization-server",
});


export async function redirectToLogin() {
  const codeVerifier = await generateCodeVerifier();

  // In a browser this might work as follows:
  document.location = await oauth2Client.authorizationCode.getAuthorizeUri({
    // URL in the app that the user should get redirected to after authenticating
    redirectUri: 'https://' + window.location.host + "/callback",

    // Optional string that can be sent along to the auth server. This value will
    // be sent along with the redirect back to the app verbatim.
    state: "some-string-test",

    codeVerifier,

    scope: ["offline_access"],
  });
}

export async function finalizeAuthorizationCode() {
  const codeVerifier = await generateCodeVerifier();
  const token = oauth2Client.authorizationCode.getTokenFromCodeRedirect(document.location.toString(), {
    // URL in the app that the user should get redirected to after authenticating
    redirectUri: 'https://' + window.location.host + "/callback",

    // Optional string that can be sent along to the auth server. This value will
    // be sent along with the redirect back to the app verbatim.
    state: "some-string-test",

    codeVerifier,
  })
  return token;

}
export const refreshToken = oauth2Client.refreshToken