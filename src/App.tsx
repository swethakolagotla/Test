 /* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import routes from "./routes/route.jsx";
import { BrowserRouter, useRoutes } from "react-router-dom";

const App = () => useRoutes(routes);

const RouterWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RouterWrapper;

 