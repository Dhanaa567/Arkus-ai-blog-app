import React from "react";

import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ marginTop: 70 }}>
        <Layout />
      </div>
    </QueryClientProvider>
  );
}

export default App;
