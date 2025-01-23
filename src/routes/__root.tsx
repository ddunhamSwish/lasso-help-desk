import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import swish_logo from "../assets/swish_logo.png";
import { queryClient, router } from "../main";
import useToken from "../serverState/useToken";
import { useEffect } from "react";

function generateRandomString(length: number) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array as unknown as number[]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(base64String: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(base64String);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  let binary = "";
  const bytes = new Uint8Array(hash);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

type LoginSearch = {
  code?: string;
};

export const Route = createRootRoute({
  component: Header,
  beforeLoad: async () => {
    const currLocation = router.parseLocation();
    if (!queryClient.getQueryData(["TOKEN"]) && !currLocation.search.code) {
      const codeVerifier = generateRandomString(12);
      const codeChallenge = await sha256(codeVerifier);
      localStorage.setItem("CODE_VERIFIER", codeVerifier);
      window.location.href = `https://swishdata.zendesk.com/oauth/authorizations/new?response_type=code&redirect_uri=${import.meta.env.VITE_BASE_URL}&client_id=${import.meta.env.VITE_OAUTH_CLIENT}&scope=read&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    }
  },
  validateSearch: (search: Record<string, string>): LoginSearch => {
    return {
      code: search.code,
    };
  },
});

function Header() {
  const navigate = useNavigate();
  const { code } = Route.useSearch();
  const { data: token } = useToken(code);

  useEffect(() => {
    if (code) {
      localStorage.setItem("ZENDESK_CODE", code);
    }
    if (token) {
      console.log("TOKEN: ", token);
      navigate({ to: "/" });
    }
  }, [token, navigate, code]);

  return (
    <div id="container">
      <div id="header" onClick={() => navigate({ to: "/" })}>
        <img src={swish_logo} height={50} />
        <h1>Swish Demo Help Desk</h1>
      </div>
      <Outlet />
    </div>
  );
}
