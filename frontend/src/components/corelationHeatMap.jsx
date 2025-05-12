import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { stockService } from "../services/stockService";

// Utility function to get correlation color
const getCorrelationColor = (correlation) => {
  if (correlation > 0.7) return "darkgreen";
  if (correlation > 0.3) return "lightgreen";
  if (correlation > -0.3) return "gray";
  if (correlation > -0.7) return "pink";
  return "red";
};

const CorrelationHeatmap = () => {
  const [minutes, setMinutes] = useState(50);
  const [correlationData, setCorrelationData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Predefined set of tickers
  const tickers = [
    "NVDA",
    "PYPL",
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
    "TSLA",
    "AMD",
    "BRKB",
  ];

  const minutesOptions = [10, 30, 50, 60, 120];

  useEffect(() => {
    const fetchCorrelations = async () => {
      setLoading(true);
      try {
        // Generate all possible ticker pairs
        const correlationPromises = [];
        for (let i = 0; i < tickers.length; i++) {
          for (let j = i + 1; j < tickers.length; j++) {
            correlationPromises.push(
              stockService.getStockCorrelation(
                [tickers[i], tickers[j]],
                minutes
              )
            );
          }
        }

        const results = await Promise.all(correlationPromises);
        setCorrelationData(results);
      } catch (error) {
        console.error("Error fetching correlations:", error);
      }
      setLoading(false);
    };

    fetchCorrelations();
  }, [minutes]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Stock Correlation Heatmap
      </Typography>

      <Box mb={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Time Frame (minutes)</InputLabel>
          <Select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            label="Time Frame (minutes)"
          >
            {minutesOptions.map((m) => (
              <MenuItem key={m} value={m}>
                {m} minutes
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : correlationData ? (
        <Grid container spacing={1}>
          {tickers.map((rowTicker, rowIndex) => (
            <Grid key={rowTicker} container item xs={12} spacing={1}>
              {tickers.map((colTicker, colIndex) => {
                // Find correlation for this pair
                let correlation = null;
                if (rowIndex < colIndex) {
                  const correlationEntry = correlationData.find(
                    (entry) =>
                      (entry.stocks[rowTicker] && entry.stocks[colTicker]) ||
                      (entry.stocks[colTicker] && entry.stocks[rowTicker])
                  );
                  correlation = correlationEntry
                    ? correlationEntry.correlation
                    : null;
                }

                return (
                  <Grid item xs key={colTicker}>
                    <Box
                      sx={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          rowIndex === colIndex
                            ? "lightgray"
                            : rowIndex > colIndex
                            ? getCorrelationColor(correlation)
                            : "white",
                        border: "1px solid #ddd",
                      }}
                    >
                      {rowIndex === colIndex
                        ? rowTicker
                        : rowIndex > colIndex
                        ? correlation?.toFixed(2)
                        : ""}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No correlation data available</Typography>
      )}
    </Container>
  );
};

export default CorrelationHeatmap;
