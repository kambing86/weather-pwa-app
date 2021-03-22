import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useIsOffline } from "hooks/useIsOffline";
import React, { useCallback, useEffect, useState } from "react";
import { useReactPWAInstall } from "react-pwa-install";
import { useHasUpdate } from "store/selectors/update";
import Copyright from "./Copyright";
import TopSideBar from "./TopSideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  footer: {
    padding: theme.spacing(4),
  },
}));

interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const classes = useStyles();
  const hasUpdate = useHasUpdate();
  const isOffline = useIsOffline();
  const [seenOffline, setSeenOffline] = useState(false);
  useEffect(() => {
    if (!isOffline) {
      setSeenOffline(false);
    }
  }, [isOffline]);
  const handleClose = useCallback(() => {
    setSeenOffline(true);
  }, []);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const [closedInstall, setClosedInstall] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const handleClick = useCallback(() => {
    setClosedInstall(true);
    void pwaInstall({
      title: "Install",
      logo: `${process.env.PUBLIC_URL}/logo192.png`,
      features: (
        <ul>
          <li>Get weather for current location</li>
          <li>Save as favorite</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "Weather PWA App built using Create React App",
    }).then(() => {
      setShowThanks(true);
    });
  }, [pwaInstall]);
  const closeInstall = useCallback(() => {
    setClosedInstall(true);
  }, []);
  const closeThanks = useCallback(() => {
    setShowThanks(false);
  }, []);
  const showInstall = !closedInstall && supported() && !isInstalled;
  return (
    <div className={classes.root}>
      <TopSideBar />
      <main className={classes.content}>
        <div className={classes.contentWrapper}>
          <div className={classes.appBarSpacer} />
          {children}
        </div>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        <Snackbar open={showInstall}>
          <Alert
            severity="info"
            action={
              <>
                <Button color="inherit" size="small" onClick={handleClick}>
                  Yes
                </Button>
                <Button color="inherit" size="small" onClick={closeInstall}>
                  No
                </Button>
              </>
            }
          >
            Do you want to install this app?
          </Alert>
        </Snackbar>
        <Snackbar
          open={showThanks}
          autoHideDuration={5000}
          onClose={closeThanks}
        >
          <Alert severity="success">Thanks for installing the app</Alert>
        </Snackbar>
        <Snackbar open={!seenOffline && isOffline}>
          <Alert onClose={handleClose} variant="filled" severity="warning">
            You are offline, so data may not found or outdated.
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={seenOffline && isOffline}
        >
          <Alert variant="filled" severity="warning">
            Offline
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={hasUpdate}
        >
          <Alert
            variant="filled"
            severity="warning"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => window.location.reload()}
              >
                Restart
              </Button>
            }
          >
            New version detected, please refresh the page to update
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default MainLayout;
