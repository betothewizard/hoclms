import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("views/layout.tsx", [
    index("views/landing-page.tsx"),
    route("/practice", "views/practice.tsx"),
    route("*", "views/not-found.tsx"),
  ]),
] satisfies RouteConfig;
