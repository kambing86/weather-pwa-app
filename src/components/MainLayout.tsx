import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useIsOffline } from "hooks/useIsOffline";
import React, { useCallback, useEffect, useState } from "react";
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
        <Snackbar open={!seenOffline && isOffline}>
          <Alert
            onClose={handleClose}
            elevation={6}
            variant="filled"
            severity="warning"
          >
            You are offline, so data may not found or outdated.
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={seenOffline && isOffline}
        >
          <Alert elevation={6} variant="filled" severity="warning">
            Offline
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={hasUpdate}
        >
          <Alert elevation={6} variant="filled" severity="warning">
            New version detected, please refresh the page to update
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default MainLayout;
