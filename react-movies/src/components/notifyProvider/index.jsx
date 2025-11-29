import React, { createContext, useContext, useState, useMemo } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NotifyContext = createContext(null);

export function useNotify() {
  return useContext(NotifyContext);
}

export default function NotifyProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const notify = useMemo(
    () => (msg, sev = "success") => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    },
    []
  );

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2200}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
}
