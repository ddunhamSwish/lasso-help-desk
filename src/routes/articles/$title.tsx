import { createFileRoute, useParams } from "@tanstack/react-router";
import useArticles from "../../serverState/useArticles";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Article as ArticleType } from "../../serverState/useArticles";
import useToken from "../../serverState/useToken";

export const Route = createFileRoute("/articles/$title")({
  component: Article,
});

function Article() {
  const { title } = useParams({ strict: false });
  const { data: token } = useToken(
    localStorage.getItem("ZENDESK_CODE") ?? undefined
  );
  const { data } = useArticles(token);
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    if (data) {
      setArticle(data.articles.filter((a) => a.title === title)[0]);
    }
  }, [data, title]);

  const bodyContent = DOMPurify.sanitize(article?.body || "");

  return <div dangerouslySetInnerHTML={{ __html: bodyContent }}></div>;
}
