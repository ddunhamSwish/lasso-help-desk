import { createFileRoute, Link } from "@tanstack/react-router";
import useArticles, { Article } from "../serverState/useArticles";
import {
  Collection,
  CollectionItem,
  CollectionHeading,
} from "@trussworks/react-uswds";
import useQueryStore from "../store";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = useArticles();
  const search = useQueryStore((state) => state.search);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (data) {
      if (search.length > 0) {
        setArticles(
          data.articles.filter((article) =>
            article.title.toLowerCase().includes(search)
          )
        );
      } else {
        setArticles(data.articles);
      }
    }
  }, [data, search]);

  return (
    <>
      <h2>Knowledge Articles</h2>
      <Collection>
        {articles.map((article, i) => (
          <CollectionItem key={`article-${i}`}>
            <CollectionHeading headingLevel="h3">
              <Link to="/articles/$title" params={{ title: article.title }}>
                {article.title}
              </Link>
            </CollectionHeading>
          </CollectionItem>
        ))}
      </Collection>
    </>
  );
}
