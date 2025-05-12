import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import StockPage from "./components/StockPage";
import CorrelationHeatmap from "./components/corelationHeatMap";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Stock Analysis Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="stock tabs">
            <Tab label="Stock Price" />
            <Tab label="Correlation Heatmap" />
          </Tabs>
        </Box>

        {value === 0 && <StockPage />}
        {value === 1 && <CorrelationHeatmap />}
      </Container>
    </div>
  );
}

export default App;
