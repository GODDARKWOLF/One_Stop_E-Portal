import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TaxProvider } from "./SharedContext/TaxContext";
import { BlockchainProvider } from "./SharedContext/BlockchainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TaxProvider>
            <BlockchainProvider>
                <App />
            </BlockchainProvider>
        </TaxProvider>
    </React.StrictMode>
);
