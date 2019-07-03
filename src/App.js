import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import Alert from "react-s-alert";
import MainPage from "./components/MainPage";
import NewRecipeForm from "./components/NewRecipeForm";
import AllRecipes from "./components/AllRecipes";
import RecipePage from "./components/RecipePage";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/NewRecipeForm" component={NewRecipeForm} />
          <Route path="/AllRecipes" component={AllRecipes} />
          {/* <Route path="/RecipePage" component={RecipePage} /> */}
          <Route
            path="/RecipePage/:category/:recipeName"
            exact
            render={({ match }) => {
              return (
                <RecipePage
                  category={match.params.category}
                  recipeName={match.params.recipeName}
                />
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
