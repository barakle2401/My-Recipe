import React, { Component } from "react";
import { database } from "firebase";
import firebase from "./fireBase";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Recipe from "./Recipe";
import "./AllRecipes.css";
import { array } from "prop-types";
class AllRecipes extends Component {
  constructor() {
    super();
    this.state = {
      allRecipes: []
    };
  }

  componentDidMount() {
    this.getRecipesData();
  }
  getRecipesData = () => {
    let holder = [];

    let ref = firebase
      .database()
      .ref("/recipes")
      .on("value", snapshot => {
        snapshot.forEach(child => {
          holder.push(child.val());
        });
        this.setState({ allRecipes: holder });
      });
  };
  render() {
    let style = {};
    let className = "elementsWeb";
    if (window.innerWidth < 500) {
      style.width = "90%";
      className = "elements";
    }
    const { allRecipes } = this.state;
    const array = allRecipes.map(recipe => {
      return (
        <div className={className}>
          <Recipe recipe={recipe} />
        </div>
      );
    });

    return (
      <div className="backGroundColor">
        <MDBContainer className="md-4">{array}</MDBContainer>
      </div>
    );
  }
}
export default AllRecipes;
{
  /* <MDBContainer className="mt-5">
<MDBRow className="mb-4">
  {this.state.allRecipes.map(recipe => {
    return <Recipe recipe={recipe} />;
  })}
</MDBRow>
</MDBContainer> */
}
