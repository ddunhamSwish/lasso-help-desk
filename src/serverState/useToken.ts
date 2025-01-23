import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Token = string;

type Response = {
  access_token: Token;
  token_type: "bearer";
  scope: string;
};

const useToken = (code?: string) => {
  return useQuery<string>({
    queryKey: ["TOKEN"],
    queryFn: async () => {
      return axios
        .post(
          "https://swishdata.zendesk.com/oauth/tokens",
          {
            grant_type: "authorization_code",
            code,
            client_id: import.meta.env.VITE_OAUTH_CLIENT,
            client_secret: import.meta.env.VITE_OAUTH_SECRET,
            redirect_uri: import.meta.env.VITE_BASE_URL,
            scope: "read",
            code_verifier: localStorage.getItem("CODE_VERIFIER"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${window.btoa(
                `ddunham@swishdata.com/token:${import.meta.env.VITE_API_KEY}`
              )}`,
            },
          }
        )
        .then((res) => {
          const data = res.data as Response;
          return data.access_token;
        });
    },
    enabled: Boolean(code),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 3,
  });
};

export default useToken;
