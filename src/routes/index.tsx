import { createFileRoute, Link } from "@tanstack/react-router";
import useArticles from "../serverState/useArticles";
import {
  Collection,
  CollectionItem,
  CollectionHeading,
} from "@trussworks/react-uswds";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = useArticles();
  return (
    <>
      <h2>Knowledge Articles</h2>
      <Collection>
        {data?.articles.map((article, i) => (
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
