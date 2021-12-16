import Testowa from "./pages/Testowa";
import { Route, Switch, Redirect } from "react-router-dom";

export default function Zapas({}) {
  return (
    <div>
      <Switch>
        <Route path="/" render={() => <Testowa />} />

        <Route path="/admin">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
