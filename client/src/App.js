import { Switch, Route } from "react-router-dom";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainScreen} />
    </Switch>
  );
}

export default App;
