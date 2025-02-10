import { createFileRoute, useParams } from "@tanstack/react-router";
import useArticles from "../../serverState/useArticles";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Article as ArticleType } from "../../serverState/useArticles";

export const Route = createFileRoute("/articles/$title")({
  component: Article,
});

function Article() {
  const { title } = useParams({ strict: false });
  const { data } = useArticles();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    if (data) {
      setArticle(data.articles.filter((a) => a.title === title)[0]);
    }
  }, [data, title]);

  const bodyContent = DOMPurify.sanitize(article?.body || "");

  return (
    <div>
      <h1>{article?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }}></div>;
    </div>
  );
}
