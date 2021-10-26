import { Switch, Route } from "react-router-dom";
import ChatRoom from "./screens/ChatRoom";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainScreen} />
      <Route path="/:room" component={ChatRoom} />
    </Switch>
  );
}

export default App;
