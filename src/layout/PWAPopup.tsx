import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useIsOffline } from "hooks/useIsOffline";
import React, { useCallback, useEffect, useState } from "react";
import usePWA from "react-pwa-install-prompt";
import { useHasUpdate } from "store/selectors/update";
import styles from "./PWAPopup.module.scss";
import TimeoutProgress from "./TimeoutProgress";

const showInstallTime = 10000; // 10 seconds;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return (
    <MuiAlert
      ref={ref}
      elevation={6}
      variant="filled"
      classes={{
        action: styles.alert_align_center,
        icon: styles.alert_align_center,
      }}
      {...props}
    />
  );
});

const PWAPopup = () => {
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
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();
  const [closedInstall, setClosedInstall] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const handleClick = useCallback(() => {
    void (async () => {
      setClosedInstall(true);
      const installed = await promptInstall();
      if (installed) {
        setShowThanks(true);
      }
    })();
  }, [promptInstall]);
  const closeInstall = useCallback(() => {
    setClosedInstall(true);
  }, []);
  const closeThanks = useCallback(() => {
    setShowThanks(false);
  }, []);
  const showInstall =
    !closedInstall && isInstallPromptSupported && !isStandalone;
  return (
    <>
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
          <TimeoutProgress timeout={showInstallTime} onDone={closeInstall} />
          Do you want to install this app?
        </Alert>
      </Snackbar>
      <Snackbar open={showThanks} autoHideDuration={5000} onClose={closeThanks}>
        <Alert severity="success">Thanks for installing the app</Alert>
      </Snackbar>
      <Snackbar open={!seenOffline && isOffline}>
        <Alert onClose={handleClose} severity="warning">
          You are offline, so data may not found or outdated.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={seenOffline && isOffline}
      >
        <Alert severity="warning">Offline</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={hasUpdate}
      >
        <Alert
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
    </>
  );
};

export default React.memo(PWAPopup);
