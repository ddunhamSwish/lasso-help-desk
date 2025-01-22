import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import swish_logo from "../assets/swish_logo.png";

export const Route = createRootRoute({
  component: Header,
});

function Header() {
  const navigate = useNavigate();

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
