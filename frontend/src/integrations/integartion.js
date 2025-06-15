// integration.js
import React from "react";
import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { startCase } from "lodash";

export const Integration = ({
  integrationType,
  user,
  org,
  integrationParams,
  setIntegrationParams,
}) => {
  const isConnected = integrationParams?.[integrationType]?.credentials
    ? true
    : false;
  const [isConnecting, setIsConnecting] = useState(false);

  // Function to open OAuth in a new window
  const handleConnectClick = async () => {
    try {
      setIsConnecting(true);
      const formData = new FormData();
      formData.append("user_id", user);
      formData.append("org_id", org);
      const response = await axios.post(
        `http://localhost:8000/integrations/${integrationType}/authorize`,
        formData
      );

      const authURL = response?.data;

      const newWindow = window.open(
        authURL,
        `${startCase(integrationType)} Authorization`,
        "width=600, height=600"
      );

      // Polling for the window to close
      const pollTimer = window.setInterval(() => {
        if (newWindow?.closed !== false) {
          window.clearInterval(pollTimer);
          handleWindowClosed();
        }
      }, 200);
    } catch (e) {
      setIsConnecting(false);
      alert(e?.response?.data?.detail);
    }
  };

  // Function to handle logic when the OAuth window closes
  const handleWindowClosed = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", user);
      formData.append("org_id", org);
      const response = await axios.post(
        `http://localhost:8000/integrations/${integrationType}/credentials`,
        formData
      );
      const credentials = response.data;
      if (credentials) {
        setIsConnecting(false);

        setIntegrationParams((prev) => ({
          ...prev,
          [integrationType]: {
            credentials: credentials,
            type: integrationType,
          },
        }));
      }
      setIsConnecting(false);
    } catch (e) {
      setIsConnecting(false);
      alert(e?.response?.data?.detail);
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        Parameters
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            onClick={isConnected ? () => {} : handleConnectClick}
            color={isConnected ? "success" : "primary"}
            disabled={isConnecting}
            style={{
              pointerEvents: isConnected ? "none" : "auto",
              cursor: isConnected ? "default" : "pointer",
              opacity: isConnected ? 1 : undefined,
            }}
          >
            {isConnected ? (
              `${startCase(integrationType)} Connected`
            ) : isConnecting ? (
              <CircularProgress size={20} />
            ) : (
              `Connect to ${startCase(integrationType)}`
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
};
