import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";

export const DataForm = ({ integrationType, credentials }) => {
  const [loadedData, setLoadedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("credentials", JSON.stringify(credentials));
      const response = await axios.post(
        `http://localhost:8000/integrations/${integrationType}/load`,
        formData
      );
      const data = response.data;
      setLoadedData(data);
    } catch (e) {
      alert(e?.response?.data?.detail);
    }
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <Box sx={{ width: 600, maxWidth: "100%", mx: "auto" }}>
        {loadedData && (
          <Box
            sx={{
              background: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              fontFamily: "Fira Mono, Menlo, Monaco, Consolas, monospace",
              fontSize: "15px",
              color: "#222",
              width: "600px",
              maxHeight: "280px",
              overflow: "auto",
              margin: "0 auto",
            }}
          >
            <pre style={{ margin: 0 }}>
              {JSON.stringify(loadedData, null, 2)}
            </pre>
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <Button onClick={handleLoad} variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Load Data"
            )}
          </Button>
          <Button
            onClick={() => setLoadedData(null)}
            sx={{ ml: 2 }}
            variant="contained"
          >
            Clear Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
