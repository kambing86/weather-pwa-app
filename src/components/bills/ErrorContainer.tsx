import { Alert, Snackbar } from "@mui/material";
import { memo } from "react";

type Props = {
  error: string | null;
  clearError: () => void;
};

const ErrorContainer = ({ error, clearError }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={error != null}
      autoHideDuration={5000}
      onClose={clearError}
    >
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default memo(ErrorContainer);
