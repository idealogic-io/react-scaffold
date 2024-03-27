import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useLoaderData,
  useMatch,
} from "react-router-dom";

import { RequireAuth, TokenHandler } from "./components";
import { MainOutlet, NotFoundPage, AuthOutlet, ErrorBoundaryFallback } from "components";
import { HomePage, LoginPage } from "pages";
import App from "App";

import { ROUTES, ROUTE_PARAMS } from "./routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.root} Component={App} ErrorBoundary={ErrorBoundaryFallback}>
      <Route index element={<Navigate to={ROUTES.login} />} />

      <Route
        path={ROUTES.login}
        element={
          <TokenHandler>
            <AuthOutlet />
          </TokenHandler>
        }
      >
        <Route index Component={LoginPage} />
      </Route>

      <Route
        path={ROUTES.home}
        element={
          <RequireAuth>
            <MainOutlet />
          </RequireAuth>
        }
      >
        <Route index Component={HomePage} />

        {/* Example of Nesting */}
        <Route path={ROUTES.app} element={<>App</>} />
        <Route path={ROUTES.wallet}>
          <Route index element={<>Wallet</>} />

          <Route path={`:${ROUTE_PARAMS.token}`}>
            <Route index element={<>Token</>} />

            <Route path={ROUTES.deposit} element={<>Deposit</>} />
          </Route>

          {/* Example of loading data before component is loaded */}
          <Route path={`:${ROUTE_PARAMS.network}`}>
            <Route
              index
              loader={async ({ params }) => {
                console.warn(params, "params");

                const data = await fetch(`/api/teams/${params[ROUTE_PARAMS.network]}`);

                console.warn(data, "data");

                return { user: "USER" };
              }}
              Component={() => {
                const data = useLoaderData();
                console.warn(data, "data from loader");

                const isMatch = useMatch("/home/wallet/12");
                console.warn(isMatch, "isMatch");

                return <>Network</>;
              }}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);
