import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/crypto-tracker/:coinId">
          <Coin />
        </Route>
        <Route path="/crypto-tracker">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
