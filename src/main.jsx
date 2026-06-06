import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 18px 40px rgb(15 23 42 / 0.12)",
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>,
);
