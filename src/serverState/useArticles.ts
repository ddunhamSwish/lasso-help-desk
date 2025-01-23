import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Article = {
  author_id?: number;
  body?: string;
  comments_disabled?: boolean;
  content_tag_ids?: string[];
  created_at?: string;
  draft?: boolean;
  edited_at?: string;
  html_url?: string;
  id?: number;
  label_names?: string[];
  locale: string;
  outdated?: boolean;
  outdated_locales?: string[];
  permission_group_id: number;
  position?: number;
  promoted?: boolean;
  section_id?: number;
  source_locale?: string;
  title: string;
  updated_at?: string;
  url?: string;
  user_segment_id?: number;
  user_segment_ids?: number[];
  vote_count?: number;
  vote_sum?: number;
};

type Articles = {
  count: number;
  articles: Article[];
};

const useArticles = (token?: string) => {
  return useQuery<Articles>({
    queryKey: ["ARTICLES"],
    queryFn: async () => {
      const config = {
        method: "GET",
        url: "https://swishdata.zendesk.com/api/v2/help_center/articles",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return axios(config).then((res) => res.data as Articles);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 3,
    enabled: Boolean(token),
  });
};

export default useArticles;
