import React, { createContext, useContext, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const NotifyContext = createContext(() => {});

export function useNotify() {
  return useContext(NotifyContext);
}

export default function NotifyProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sev, setSev] = useState("success");

  const notify = useMemo(
    () => (message, severity = "success") => {
      setMsg(message);
      setSev(severity);
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
        <MuiAlert elevation={6} variant="filled" severity={sev} onClose={() => setOpen(false)}>
          {msg}
        </MuiAlert>
      </Snackbar>
    </NotifyContext.Provider>
  );
}
