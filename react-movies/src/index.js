// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css"; // Assuming you have global styles


// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000, // Data stays fresh for 1 hour
      refetchInterval: 360000, // Refetch data every hour
      refetchOnWindowFocus: false, // Disable refetching on window focus
    },
  },
});

// Render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App /> {/* App is rendered inside QueryClientProvider */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);