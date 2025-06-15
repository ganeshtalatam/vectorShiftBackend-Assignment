import { useState } from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import { DataForm } from "./data-form";
import { Integration } from "./integrations/integartion";

const integrationOptions = [
  { label: "Notion", value: "notion" },
  { label: "Airtable", value: "airtable" },
  { label: "Hubspot", value: "hubspot" },
];

export const IntegrationForm = () => {
  const [integrationParams, setIntegrationParams] = useState({});
  const [user, setUser] = useState("TestUser");
  const [org, setOrg] = useState("TestOrg");
  const [currType, setCurrType] = useState(null);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ width: "100%" }}
    >
      <Box display="flex" flexDirection="column">
        <TextField
          label="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Organization"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Autocomplete
          id="integration-type"
          options={integrationOptions}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Integration Type" />
          )}
          onChange={(e, option) => setCurrType(option ? option.value : null)}
        />
      </Box>
      {currType && (
        <Box>
          <Integration
            integrationType={currType}
            user={user}
            org={org}
            integrationParams={integrationParams}
            setIntegrationParams={setIntegrationParams}
          />
        </Box>
      )}
      {integrationParams?.[currType]?.credentials && (
        <Box sx={{ mt: 2 }}>
          <DataForm
            integrationType={currType}
            credentials={integrationParams?.[currType]?.credentials}
          />
        </Box>
      )}
    </Box>
  );
};
