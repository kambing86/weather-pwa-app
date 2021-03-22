import { CssBaseline, ThemeProvider } from "@material-ui/core";
import MainLayout from "components/MainLayout";
import { useAppTheme } from "hooks/useAppTheme";
import Loading from "pages/Loading";
import React, { Suspense, useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactPWAInstallProvider from "react-pwa-install";
import { Route, HashRouter as Router, Switch } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyReactComponent = React.ComponentType<any>;
type ReactComponentLazyFactory = () => Promise<{ default: AnyReactComponent }>;
const lazyPreloadQueue: ReactComponentLazyFactory[] = [];

// check https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
function lazyWithPreload(
  factory: ReactComponentLazyFactory,
): React.LazyExoticComponent<AnyReactComponent> {
  const Component = React.lazy(factory);
  lazyPreloadQueue.push(factory);
  return Component;
}

function preloadAll() {
  for (const preload of lazyPreloadQueue) {
    void preload();
  }
}

const ErrorPage = lazyWithPreload(() => import("pages/ErrorFallback"));
const HomePage = lazyWithPreload(() => import("pages/Home"));
const FavoritePage = lazyWithPreload(() => import("pages/Favorite"));
const LocationPage = lazyWithPreload(() => import("pages/Location"));
const NotFoundPage = lazyWithPreload(() => import("pages/NotFound"));

function App() {
  const { theme } = useAppTheme();
  useEffect(() => {
    setTimeout(preloadAll, 2000);
  }, []);
  const onResetHandler = useCallback(() => {
    // reset the state of your app so the error doesn't happen again
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorPage} onReset={onResetHandler}>
          <ReactPWAInstallProvider>
            <Router>
              <MainLayout>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/favorite" component={FavoritePage} />
                  <Route
                    exact
                    path="/location/:location"
                    component={LocationPage}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </MainLayout>
            </Router>
          </ReactPWAInstallProvider>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
