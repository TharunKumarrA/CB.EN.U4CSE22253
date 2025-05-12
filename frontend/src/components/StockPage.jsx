import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { stockService } from "../services/stockService";

const StockPage = () => {
  const [ticker, setTicker] = useState("NVDA");
  const [minutes, setMinutes] = useState(50);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  // List of available tickers
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
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const data = await stockService.getStockPrice(ticker, minutes);
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
      setLoading(false);
    };

    fetchStockData();
  }, [ticker, minutes]);

  // Prepare chart data
  const chartData =
    stockData?.priceHistory.map((item, index) => ({
      name: `Point ${index + 1}`,
      price: item.price,
      time: new Date(item.lastUpdatedAt).toLocaleTimeString(),
    })) || [];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Stock Price Analysis
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Stock Ticker</InputLabel>
          <Select
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            label="Stock Ticker"
          >
            {tickers.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
      ) : stockData ? (
        <>
          <Typography variant="h6">
            Average Stock Price: ${stockData.averageStockPrice.toFixed(2)}
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Price ($)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div
                        style={{
                          background: "white",
                          padding: "10px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <p>Time: {data.time}</p>
                        <p>Price: ${data.price.toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Container>
  );
};

export default StockPage;
