import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ShoppingState } from "./Context/shopping/shoppingState";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(


<ShoppingState>

<App />

</ShoppingState>

)
