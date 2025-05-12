import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { stockService } from "../services/stockService";

const CorrelationWidget = () => {
  const [minutes, setMinutes] = useState(50);
  const [t1, setT1] = useState("NVDA");
  const [t2, setT2] = useState("AAPL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const fetchCorrelation = async () => {
    setLoading(true);
    try {
      const data = await stockService.getStockCorrelation([t1, t2], minutes);
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h5">Pairwise Correlation</Typography>
      <Box display="flex" gap={2} my={2}>
        <FormControl>
          <InputLabel>Stock 1</InputLabel>
          <Select
            value={t1}
            onChange={(e) => setT1(e.target.value)}
            label="Stock 1"
          >
            {tickers.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Stock 2</InputLabel>
          <Select
            value={t2}
            onChange={(e) => setT2(e.target.value)}
            label="Stock 2"
          >
            {tickers.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Window</InputLabel>
          <Select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            label="Window"
          >
            {minutesOptions.map((m) => (
              <MenuItem key={m} value={m}>
                {m} min
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={fetchCorrelation}
          disabled={loading}
        >
          {loading ? "…" : "Compute"}
        </Button>
      </Box>

      {result && (
        <Box mt={2}>
          <Typography>
            Correlation between {t1} and {t2} over {minutes} minutes:{" "}
            <strong>{result.correlation.toFixed(4)}</strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CorrelationWidget;
