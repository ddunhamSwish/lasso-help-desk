import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Header,
});

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div id="title" onClick={() => navigate({ to: "/" })} style={{}}>
        <img
          src="https://swishdata.zendesk.com/hc/theming_assets/01JBYJ39HYFD8G2P4GE9Z05PK1"
          height={50}
        />
        <h1 style={{ color: "white" }}>Lasso Demo Help Desk</h1>
      </div>
      <div id="body">
        <Outlet />
      </div>
    </>
  );
}
