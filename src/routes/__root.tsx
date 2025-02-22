import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import useQueryStore from "../store";
import { useState } from "react";
import swish_logo from "../assets/swish_logo_bw.png";

export const Route = createRootRoute({
  component: Header,
});

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const setSearch = useQueryStore((state) => state.setSearch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(query.toLowerCase());
  };

  return (
    <>
      <div id="header">
        <div id="header-contents">
          <div id="title" onClick={() => navigate({ to: "/" })} style={{}}>
            <img src={swish_logo} height={50} />
          </div>
          <h1>Welcome to Lasso Support</h1>
          <p>
            Search for answers to your questions by entering keywords below, or
            look through our knowledge base.
          </p>
          <form id="knowledge-search" onSubmit={handleSubmit}>
            <input
              placeholder="Search the helpcenter..."
              id="knowledge-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" id="knowledge-search-button">
              Search
            </button>
          </form>
        </div>
      </div>
      <div id="body">
        <Outlet />
      </div>
    </>
  );
}
