import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useAppTheme } from "hooks/useAppTheme";
import MainLayout from "layout/MainLayout";
import Loading from "pages/Loading";
import { ErrorPage, preloadAll } from "preload";
import { Suspense, useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter as Router } from "react-router-dom";
import "./App.scss";

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
          <Router>
            <MainLayout />
          </Router>
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
