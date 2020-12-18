import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Menubar from "./components/Menubar";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { Provider } from "react-redux";
import reduxStore from "./store";

function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Menubar />
        <div className="ui container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            />
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
